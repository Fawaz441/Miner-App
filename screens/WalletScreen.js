import React from 'react'
import { StyleSheet, Text, View,Image, TextInput, Keyboard,Pressable, TouchableWithoutFeedback } from 'react-native'
import { Card, Container } from '../styles/MainStyles'
import Nav from '../components/TopNav'
import { useSelector } from 'react-redux'

const WalletScreen = () => {

    const balance = useSelector(state => state.balance)
    console.log(balance)

    const hideKeyboard = () => {
        Keyboard.dismiss()
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
                                    style={[styles.fonted, {margin:0,overflow:'hidden'}]}
                                />
                            </View>
                        <Text style={styles.fonted}>BTC</Text>
                    </View>
                    <Text style={[styles.fonted,{fontSize:9}]}>Minimum 0.05 BTC</Text>
                </View>
                <View style={styles.withdraw}>
                    <Pressable style={styles.cta}>
                        <Image style={styles.icon} source={require('../assets/icons/withdraw.png')}/>
                        <Text style={[styles.fonted,{color:'#fff',fontSize:12}]}>Withdraw</Text>
                    </Pressable>
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
        justifyContent:'center',
    },
    fonted: {
        fontFamily: 'Poppins_400Regular',
    },
    withdraw:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    cta:{
        paddingVertical:10,
        paddingHorizontal:15,
        backgroundColor:'#d35400',
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center'
    },
    icon:{
        height:20,
        width:20,
        marginRight:10,
        marginTop:-3
    }
})

export default WalletScreen