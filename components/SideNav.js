import React from 'react'
import { StyleSheet, View, Text, Dimensions, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { withNavigation } from 'react-navigation'
import { useDispatch,useSelector } from 'react-redux'
import axios from '../api/axios'
import { USER_INFO,BALANCE } from '../store/constants'
import { removeItem } from '../store/storage'

const device = Dimensions.get('window')


const SideNav = ({ closeAction, navigation }) => {
    const routeName = navigation.state.routeName
    const dispatch = useDispatch()
    const {balance,user_info:{id},miningForce} = useSelector(state => state)

    const goTo = page => {
        navigation.push(page)
        dispatch({type:'CLOSE'})
    }

    const logOut = () => {
        const url = `/logout?id=${id}&balance=${balance}&speed=${miningForce}`
        console.log(url)
        axios.get(url)
        .then(res => {
            console.log(res.data)
            if(res.data.success){
                removeItem(USER_INFO) 
                dispatch({type:'LOG_OUT'})
                removeItem(BALANCE)
                showMessage({
                    description:'Log out successful!',
                    type:'success',
                    message:'Success'
                })
            }
            else{
                showMessage({
                    description:'Error Logging Out. Please check your internet connection',
                    type:'danger',
                    message:'Error'
                })
            }
        })
        .catch(e => {
            showMessage({
                description:'Error Logging Out. Please check your internet connection',
                type:'danger',
                message:'Error'
            })
        })
    }

    return (
        <View style={styles.SideNav}>
            <View style={styles.hider}></View>
            <TouchableWithoutFeedback onPress={closeAction}>
                <View style={styles.drop}></View>
            </TouchableWithoutFeedback>
            <View style={styles.actionsWrapper}>
                <View style={styles.actions}>
                    {routeName !== 'Settings' &&
                        <TouchableOpacity onPress={() => goTo('Settings')}>
                            <Text style={styles.action}>Settings</Text>
                        </TouchableOpacity>
                    }
                    {routeName !== 'Wallet' &&
                        <TouchableOpacity onPress={() => goTo('Wallet')}>
                            <Text style={styles.action}>Wallet</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={logOut}>
                        <Text style={styles.action}>
                            Log out
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    SideNav: {
        height: device.height,
        width: device.width,
        flexDirection: 'row',
        position: 'absolute',
        elevation: 5,
        zIndex: 10,
        top: 0,
        left: 0,
        flex: 1
    },
    drop: {
        width: (0.6 * device.width),
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: device.height,
        flex: 1,
    },
    actionsWrapper: {
        width: (0.4 * device.width),
        backgroundColor: '#fff',
    },
    actions: {
        marginTop: 150,
        paddingHorizontal: 20,
    },
    action: {
        fontSize: 20,
        marginBottom: 27,
        color: '#222',
        fontFamily: 'Poppins_400Regular',
    }
})

export default withNavigation(SideNav)