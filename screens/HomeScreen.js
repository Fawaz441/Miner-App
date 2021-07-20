import React from 'react';
import { Pressable, View } from 'react-native';
import Nav from '../components/TopNav';
import { Card, Container, Player, SmallerText } from "../styles/MainStyles";
import { loadMiningForce, setBalance, loadBalance, addPayment } from '../store/actions'
import { connect } from 'react-redux';
import { BALANCE } from '../store/constants';
import { storeItem } from '../store/storage';
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from '../api/axios';


class HomeScreen extends React.Component {

    state = {
        play: false,
    }

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
        if(!this.props.id){
            this.props.navigation.push('Signup')
            return;
        }
        this.intervalId = React.createRef(null)
        this.props.loadMiningForce()
        this.props.loadBalance()
        this.getPayments()
    }



    handlePlayFlow = () => {
        const { intervalId } = this;
        const { play } = this.state;

        if (play) {
            const { balance } = this.props;
            clearInterval(intervalId.current)
            storeItem(BALANCE, balance)
            
        }
        else {
            intervalId.current = setInterval(() => {
                const { balance, miningForce } = this.props;
                if (balance) {
                    var sum = parseFloat((Number(miningForce / 1000) + Number(balance)).toFixed(8))
                    if (sum > Number(balance)) {
                        this.props.setBalance(sum)
                    }
                }
            }, 1000)
        }
        this.setState({ play: !play })
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


