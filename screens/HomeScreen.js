import React from 'react';
import { Pressable, View } from 'react-native';
import Nav from '../components/TopNav';
import { Card, Container, Player, SmallerText } from "../styles/MainStyles";
import {loadMiningForce, setBalance,loadBalance} from '../store/actions'
import { connect } from 'react-redux';
import { BALANCE } from '../store/constants';
import { storeItem } from '../store/storage';

class HomeScreen extends React.Component {

    state = {
        play: false,
    }

    componentDidMount() {
        this.intervalId = React.createRef(null)
        this.props.loadMiningForce()
        this.props.loadBalance()
    }



    handlePlayFlow = () => {
        const { intervalId } = this;
        const { play } = this.state;
        
        if (play) {
            const {balance} = this.props;
            clearInterval(intervalId.current)
            storeItem(BALANCE,balance)
        }
        else {
            intervalId.current = setInterval(() => {
                const { balance,miningForce } = this.props;
                if (balance) {
                    console.log('previous balance -> ', balance)
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
        const {balance,miningForce} = this.props;
        const {play} = this.state;
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
    balance:state.balance,
    isNewUser:state.isNewUser,
    miningForce:state.miningForce
})

const mapDispatchToProps = dispatch =>({
    setBalance:amount=>dispatch(setBalance(amount)),
    loadMiningForce:() => dispatch(loadMiningForce()),
    loadBalance:() => dispatch(loadBalance())
})


export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)


