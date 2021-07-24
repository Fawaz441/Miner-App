import React from 'react'
import { Image } from 'react-native'
import { Container } from '../styles/MainStyles'

const LoadingScreen = () => {
    return (
        <Container isFlex={true}>
            <Image source={require('../assets/icon.png')}
            style={{height:100,width:100}}/>
        </Container>
    )
}

export default LoadingScreen