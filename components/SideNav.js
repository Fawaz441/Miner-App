import React from 'react'
import { StyleSheet, View, Text, Dimensions, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { useDispatch } from 'react-redux'

const device = Dimensions.get('window')


const SideNav = ({ closeAction, navigation }) => {
    const routeName = navigation.state.routeName
    const dispatch = useDispatch()

    const goTo = page => {
        navigation.push(page)
        dispatch({type:'CLOSE'})
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