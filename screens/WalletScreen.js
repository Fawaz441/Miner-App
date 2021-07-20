import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Keyboard, Pressable, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { Card, Container } from '../styles/MainStyles'
import Nav from '../components/TopNav'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../api/axios'
import { showMessage } from "react-native-flash-message";
import { carryOutPurchase } from '../store/actions'





const WalletScreen = () => {
    const [amount, setAmount] = useState(null)
    const [loading, setLoading] = useState(false)
    const balance = useSelector(state => state.balance)
    const { id } = useSelector(state => state.user_info)
    const dispatch = useDispatch()

    const hideKeyboard = () => {
        Keyboard.dismiss()
    }

    const tryWithdraw = () => {
        setLoading(true)
        if (amount > balance) {
            showMessage({
                message: "Error",
                description: `You do not have up to that amount in your wallet`,
                type: "danger",
            });
            setLoading(false)
            return;
        }
        if (loading || (amount === '' || amount === null)) {
            setLoading(false)
            return;
        }
        axios.post('/withdraw/', {
            amount: amount,
            id: id
        })
            .then(res => {
                const { status, errors } = res.data
                if (errors) {
                    showMessage({
                        message: 'Error',
                        description: errors,
                        type: 'danger'
                    })
                    setLoading(false)

                    return;
                }
                if (status === 1) {
                    dispatch(carryOutPurchase(amount))
                    showMessage({
                        message: 'Success',
                        description: 'Withdrawal request successfully made!',
                        type: 'success'
                    })
                    setLoading(false)

                }
                if (status === 3) {
                    showMessage({
                        message: 'Error',
                        description: 'You are unable to withdraw at this time. Please get more referrals!',
                        type: 'danger'
                    })
                    setLoading(false)

                }

                if(status === 2){
                    showMessage({
                        message: 'Error',
                        description: 'Minimum amount is 0.05 BTC',
                        type: 'danger'
                    })
                    setLoading(false)
                }

            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    return (
        <Container>
            <Nav hideHam={true} />
            <Card text="Balance" value={balance}>
                <View style={styles.withdrawal}>
                    <Text style={[styles.fonted, { fontSize: 12 }]}>Withdrawal Amount</Text>
                    <View style={styles.amountWrapper}>
                        <View style={styles.amountInput}>
                            <TextInput
                                onBlur={hideKeyboard}
                                keyboardType='numeric'
                                numberOfLines={1}
                                value={amount}
                                onChangeText={value => setAmount(value)}
                                style={[styles.fonted, { margin: 0, overflow: 'hidden' }]}
                            />
                        </View>
                        <Text style={styles.fonted}>BTC</Text>
                    </View>
                    <Text style={[styles.fonted, { fontSize: 9 }]}>Minimum 0.05 BTC</Text>
                </View>
                <View style={styles.withdraw}>
                    {/* {amount >= 0.05 && */}
                    <Pressable style={styles.cta} onPress={tryWithdraw}>
                        <Image style={styles.icon} source={require('../assets/icons/withdraw.png')} />
                        {
                            loading ?
                                <ActivityIndicator size="small" color="#fff" />
                                :
                                <Text style={[styles.fonted, { color: '#fff', fontSize: 12 }]}>Withdraw</Text>
                        }
                    </Pressable>
                    {/* } */}
                </View>
            </Card>
        </Container>
    )
}

const styles = StyleSheet.create({
    withdrawal: {
        marginTop: 10
    },
    amountWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amountInput: {
        borderRadius: 4,
        borderColor: '#222',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 5,
        width: '50%',
        justifyContent: 'center',
    },
    fonted: {
        fontFamily: 'Poppins_400Regular',
    },
    withdraw: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    cta: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#d35400',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        height: 20,
        width: 20,
        marginRight: 10,
        marginTop: -3
    }
})

export default WalletScreen