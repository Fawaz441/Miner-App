import React from 'react';
import { Pressable, View } from 'react-native';
import Nav from '../components/TopNav';
import { Card, Container, Player, SmallerText } from "../styles/MainStyles";
import { loadMiningForce, setBalance, loadBalance, addPayment } from '../store/actions'
import { connect } from 'react-redux';
import { BALANCE, FOCUSED, MINING_FORCE } from '../store/constants';
import { checkItem, getItem, storeItem } from '../store/storage';
import { showMessage } from "react-native-flash-message";
import axios from '../api/axios';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

const BACKGROUND_FETCH_TASK = 'miner';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    var speed = await getItem(MINING_FORCE)
    var balance = await getItem(BALANCE)
    var result = 0;
    storeItem(FOCUSED,false)
    if(checkItem(balance)){
        if (checkItem(speed)){
            result = parseFloat((Number((speed / 1000) * 60) + Number(balance)).toFixed(8))
            storeItem(BALANCE,result)
        }
    }
    console.log(`New Result , ${result}`);
    console.log(speed)
    console.log(balance)
    // Be sure to return the successful result type!
    return BackgroundFetch.Result.NewData;
  });

  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 1, // 1 second
      stopOnTerminate: true, // android only,
      startOnBoot: false, // android only
    });
  }

  async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  }

  


class HomeScreen extends React.Component {

    state = {
        play: false,
        status:'',
        isRegistered:false
    }


    checkStatusAsync = async () => {
        const status = await BackgroundFetch.getStatusAsync();
        const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
        this.setState({status:status,isRegistered:isRegistered})
        console.log('is Registered',isRegistered)
      };

    startFetchTask = async (start) => {
        if (!start) {
          await unregisterBackgroundFetchAsync();
        } else {
          await registerBackgroundFetchAsync();
        }
    
        this.checkStatusAsync();
      };

    getPayments = () => {
        const {id} = this.props;
        axios.get(`/pending-payments?id=${id}`)
        .then(res => {
            if(res.data.amount > 0){
                this.props.addPayment(res.data.amount)
                showMessage({
                    message: "Referral bonus",
                    description: `${res.data.amount} has been added to your balance.`,
                    type: "success",
                });
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        storeItem(FOCUSED,true)
        if(!this.props.id){
            this.props.navigation.push('Signup')
            return;
        }
        this.intervalId = React.createRef(null)
        this.props.loadMiningForce()
        // this.props.loadBalance()
        this.getPayments()
        this.checkStatusAsync()

    }



    handlePlayFlow = async () => {
        const {intervalId} = this;
        const { play } = this.state;
        if (play) {
            const { balance } = this.props;
            clearInterval(intervalId.current)
            storeItem(BALANCE, balance)
            this.setState({ play: false })
            await this.startFetchTask(false)
            
        }
        else {
            intervalId.current = setInterval(() => {
                const { balance, miningForce } = this.props;
                if (balance) {
                    var sum = parseFloat((Number(miningForce / 1000) + Number(balance)).toFixed(8))
                    if (sum > Number(balance)) {
                        this.props.setBalance(sum)
                        storeItem(BALANCE, sum)
                    }
                }
            }, 1000)
            this.setState({ play: true })
            await this.startFetchTask(true)

        }
    }

    render() {
        const { balance, miningForce } = this.props;
        const { play } = this.state;
        return (
            <Container>
                <Nav />
                <Card text="Balance" value={balance} />
                <Pressable onPress={() => this.handlePlayFlow()}>
                    <Player play={play} />
                </Pressable>
                <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <SmallerText text={`${miningForce}mBTC/s`} />
                </View>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    balance: state.balance,
    isNewUser: state.isNewUser,
    miningForce: state.miningForce,
    id:state.user_info.id
})

const mapDispatchToProps = dispatch => ({
    setBalance: amount => dispatch(setBalance(amount)),
    loadMiningForce: () => dispatch(loadMiningForce()),
    loadBalance: () => dispatch(loadBalance()),
    addPayment:amount => dispatch(addPayment(amount))
})


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)


