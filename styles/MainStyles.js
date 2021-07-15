import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'

const playIcon = require('../assets/icons/play.png')
const pauseIcon = require('../assets/icons/pause.png')


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
        height: 90
    },
    navText: {
        fontSize: 24,
        fontWeight: "600",
        fontFamily: 'Poppins_400Regular',
        color: '#000'
    },
    smallText:{
        fontFamily:'Poppins_400Regular',
        fontSize:20,
        color:'#353b48'
    }, 
    smallerText:{
        fontFamily:'Poppins_400Regular',
        fontSize:16,
        color:'#273c75'
    },
    card:{
        marginTop:30,
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius:22,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
        paddingHorizontal:20,
        paddingVertical:25
    },
    player:{
        marginTop:50,
        marginLeft:'auto',
        marginRight:'auto',
        height:180,
        width:180,
        borderRadius:90,
        borderColor:'#000',
        borderWidth:3,
        justifyContent:'center',
        alignItems:'center'
    },
    playerImage:{
        height:100,
        width:100
    }
})

export const Container = (props)  => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    )
}

export const TopNav = (props) => <View style={styles.nav}>{props.children}</View>


export const NavText = ({ text }) => (<Text style={styles.navText}>{text}</Text>)
export const SmallText = ({text}) => <Text style={styles.smallText}>{text}</Text>
export const SmallerText = ({text}) => <Text style={styles.smallerText}>{text}</Text>

export const Card = ({text,value,children}) => (
    <View style={styles.card}>
        <SmallText text={text}/>
        {value && <SmallerText text = {`${value} BTC`} />}
        {children}
    </View>
)


export const Player = ({play}) => {
    return(
        <View style={styles.player}>
            <Image style={styles.playerImage} source={play ? pauseIcon: playIcon}/>
        </View>
    )
}
