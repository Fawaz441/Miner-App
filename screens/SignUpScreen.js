import React, { useState,useEffect } from 'react'
import { TextInput, View, Text, Keyboard, KeyboardAvoidingView, TouchableOpacity, Platform, TouchableWithoutFeedback, StyleSheet, ActivityIndicator, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../store/actions'
import { Container } from '../styles/MainStyles'
import { showMessage } from "react-native-flash-message";
import { ScrollView } from 'react-native-gesture-handler'
import AppLoading from 'expo-app-loading'
import { checkItem, getItem } from '../store/storage'
import { USER_INFO } from '../store/constants'
import { SET_USER_INFO } from '../store/actionTypes'


const SignupScreen = () => {

    const [oldUser,setOldUser] = useState(false)
    const dispatch = useDispatch()
    const {isSigningUp} = useSelector(state => state)
    const [first_name, setFirstName] = useState(null)
    const [last_name, setLastName] = useState(null)
    const [account_name, setAccountName] = useState(null)
    const [account_number, setAccountnumber] = useState(null)
    const [bank, setBank] = useState(null)
    const [referral_code, setRefCode] = useState(null)
    const [password,setPassword] = useState(null)
    const [email,setEmail] = useState(null)
    const [username,setUsername] = useState(null)



    

  
    const signUp = () => {
        if (isSigningUp) {
            return
        }

        if (first_name === '' || first_name === null) {
            showMessage({ message: 'First Name is required', type: 'danger' })
            return;
        }
        if (username === '' || username === null) {
            showMessage({ message: 'Username is required', type: 'danger' })
            return;
        }
        if (last_name === '' || last_name === null) {
            showMessage({ message: 'Last Name is required', type: 'danger' })
            return;
        }
        if (account_name === '' || account_name === null) {
            showMessage({ message: 'Account Name is required', type: 'danger' })
            return;
        }
        if (account_number === '' || account_number === null) {
            showMessage({ message: 'Account_number is required', type: 'danger' })
            return;
        }
        if (bank === '' || bank === null) {
            showMessage({ message: 'Bank is required', type: 'danger' })
            return;
        }
        if (email === '' || email === null) {
            showMessage({ message: 'Email is required', type: 'danger' })
            return;
        }
        if (password === '' || password === null) {
            showMessage({ message: 'Password is required', type: 'danger' })
            return;
        }



        const payload = {
            first_name,
            last_name,
            account_name,
            account_number,
            bank,
            referral_code,
            email,
            password,
            username
        }

        dispatch(signup(payload))
    }

    if(oldUser){
        return <AppLoading/>
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
                                <Text style={styles.loginText}>First Name</Text>
                                <TextInput style={styles.loginInput}
                                    value={first_name}
                                    onChangeText={value => setFirstName(value)}
                                />
                            </View>
                            <View style={styles.loginGroup}>
                                <Text style={styles.loginText}>Last Name</Text>
                                <TextInput style={styles.loginInput}
                                    value={last_name}
                                    onChangeText={value => setLastName(value)}
                                />
                            </View>
                            <View style={styles.loginGroup}>
                                <Text style={styles.loginText}>Username</Text>
                                <TextInput style={styles.loginInput}
                                    value={username}
                                    onChangeText={value => setUsername(value)}
                                />
                            </View>
                            <View style={styles.loginGroup}>
                                <Text style={styles.loginText}>Account Name</Text>
                                <TextInput style={styles.loginInput}
                                    value={account_name}
                                    onChangeText={value => setAccountName(value)}
                                />
                            </View>
                            <View style={styles.loginGroup}>
                                <Text style={styles.loginText}>Account number</Text>
                                <TextInput style={styles.loginInput}
                                    keyboardType='numeric'
                                    value={account_number}
                                    onChangeText={value => setAccountnumber(value)}
                                />
                            </View>
                            <View style={styles.loginGroup}>
                                <Text style={styles.loginText}>Bank</Text>
                                <TextInput style={styles.loginInput}
                                    value={bank}
                                    onChangeText={value => setBank(value)}
                                />
                            </View>
                            <View style={styles.loginGroup}>
                                <Text style={styles.loginText}>Email</Text>
                                <TextInput style={styles.loginInput}
                                    value={email}
                                    onChangeText={value => setEmail(value)}
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
                                <Text style={styles.loginText}>Referral Code (not required)</Text>
                                <TextInput style={styles.loginInput}
                                    value={referral_code}
                                    onChangeText={value => setRefCode(value)}
                                />
                            </View>
                            <View style={styles.loginGroup}/>
                            <View style={styles.loginGroup}>
                                <TouchableOpacity onPress={signUp}>
                                    <View style={styles.cta}>
                                        {isSigningUp ?
                                            <ActivityIndicator size="small" color="#fff" />
                                            :
                                            <Text style={styles.ctaText}>Sign up</Text>
                                        }
                                    </View>
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

export default SignupScreen