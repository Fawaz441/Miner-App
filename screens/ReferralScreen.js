import React from 'react'
import { View,Text,StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import Nav from '../components/TopNav'
import { Container, SmallerText, SmallText } from '../styles/MainStyles'

function ReferralScreen(){
    const {referral_code, referrer} = useSelector(state => state.user_info)
    return(
        <Container>
            <Nav/>
            <View style={styles.main}>
                
                <View style={styles.adviser}>
                    <SmallerText text='Adviser code'/>
                    <View style={styles.divider}/>
                    <SmallText text={referrer ? referrer : 'No Adviser'}/>
                    <View style={styles.divider}/>
                </View>
                <View style={styles.code}>
                    <SmallerText text="Your code"/>
                    <View style={styles.divider}/>
                    <Text style={styles.codeText}>{referral_code}</Text>
                    <View style={styles.divider}/>
                </View>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    main:{
        marginTop:100,
        flex:1
    },
    adviser:{
        alignSelf:'flex-end',
        width:200,
        justifyContent:'flex-end',
        marginBottom:100
    },
    divider:{
        backgroundColor:'#333',
        height:1,
    },
    code:{
        width:250,
        alignSelf:'center',
    },
    codeText:{
        textAlign:'center',
        fontSize:30
    }
})

export default ReferralScreen

