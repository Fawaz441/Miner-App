import React, { useState,useEffect } from 'react'
import { TextInput, View, Text, Keyboard, KeyboardAvoidingView, TouchableOpacity, Platform, TouchableWithoutFeedback, StyleSheet, ActivityIndicator, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/actions'
import { Container } from '../styles/MainStyles'
import { showMessage } from "react-native-flash-message";
import { ScrollView } from 'react-native-gesture-handler'
import { checkItem, getItem } from '../store/storage'
import { USER_INFO } from '../store/constants'
import { SET_USER_INFO } from '../store/actionTypes'
import LoadingScreen from './LoadingScreen'


const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const [oldUser,setOldUser] = useState(true)
    const { isLoggingIn } = useSelector(state => state)
    const [password, setPassword] = useState(null)
    const [username, setUsername] = useState(null)

        useEffect(() => {
        getItem(USER_INFO)
        .then(res => {
            if(checkItem(res)){
                dispatch({
                    type:SET_USER_INFO,
                    info:res
                })
                navigation.push('Dashboard')
            }
            else{
                setOldUser(false)
            }
        })
        .catch(e => {
            console.log(e)
        })
    },[])

    const loginStart = () => {
        if (isLoggingIn) {
            return
        }

        if (username === '' || username === null) {
            showMessage({ message: 'First Name is required', type: 'danger' })
            return;
        }
        if (password === '' || password === null) {
            showMessage({ message: 'Password is required', type: 'danger' })
            return;
        }



        const payload = {
            password,
            username
        }

        dispatch(login(payload))
    }

    if(oldUser){
        return <LoadingScreen/>
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container isForm={true}>
                    <View style={styles.loginContainer}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.logoContainer}>
                                <Image style={styles.logo} source={require('../assets/icon.png')} />
                            </View>
                            <View style={styles.loginGroup}>
                                <Text style={styles.loginText}>Username</Text>
                                <TextInput style={styles.loginInput}
                                    value={username}
                                    onChangeText={value => setUsername(value)}
                                />
                            </View>
                            <View style={styles.loginGroup}>
                                <Text style={styles.loginText}>Password</Text>
                                <TextInput style={styles.loginInput}
                                    value={password}
                                    secureTextEntry={true}
                                    onChangeText={value => setPassword(value)}
                                />
                            </View>
                            <View style={styles.loginGroup}>
                                <TouchableOpacity onPress={loginStart}>
                                    <View style={styles.cta}>
                                        {isLoggingIn ?
                                            <ActivityIndicator size="small" color="#fff" />
                                            :
                                            <Text style={styles.ctaText}>Log in</Text>
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.loginGroup}>
                                <TouchableOpacity onPress={() => navigation.push('Signup')}>
                                    <Text style={styles.loginText}>
                                        Don't have an account ? Sign up here
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        height: 100,
        width: 100
    },
    loginContainer: {
        paddingHorizontal: 10
    },
    loginGroup: {
        paddingVertical: 3,
        marginBottom: 5
    },
    loginText: {
        color: '#7f8c8d',
        fontFamily: 'Poppins_400Regular',
        fontSize: 12
    },
    loginInput: {
        backgroundColor: '#f3f3f3',
        height: 40,
        paddingLeft: 5,
        borderRadius: 5,
        fontFamily: 'Poppins_400Regular',
        textAlignVertical: 'center',
        fontSize: 14,
    },
    cta: {
        width: 100,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#d35400',
        paddingHorizontal: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ctaText: {
        color: '#fff',
        fontFamily: 'Poppins_400Regular',
        fontSize: 13
    }
})

export default LoginScreen