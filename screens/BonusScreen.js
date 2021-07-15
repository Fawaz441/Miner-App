import React from 'react'
import { View,Text, Image } from 'react-native'
import Nav from '../components/TopNav'
import { Card, Container, SmallerText,SmallText } from '../styles/MainStyles'

function BonusScreen(){
    return(
        <Container>
            <Nav page="Bonuses"/>
            <Card text="Get Bonus">
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <SmallerText text="Watch Video"/>
                <Image source={require('../assets/icons/video.png')}
                 style={{marginLeft:-16,height:25}} resizeMode="contain"/>
                </View>
                <View style={{alignItems:'flex-end'}}>
                    <SmallerText text="0/10"/>
                </View>
                
            </Card>
        </Container>
    )
}

export default BonusScreen

