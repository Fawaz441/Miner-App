import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
// screens
import HomeScreen from '../screens/HomeScreen'
import ShopScreen from '../screens/ShopScreen'
import ReferralScreen from '../screens/ReferralScreen'
import BonusScreen from '../screens/BonusScreen'
import { Text, View } from 'react-native'
import Settings from '../screens/Settings'
import WalletScreen from '../screens/WalletScreen'


const activeColor = "#273c75"
const inactiveColor = "rgba(0,0,0,0.4)"

const hideNav = (navigation) => {
    var tabBarVisible = true;
    const routeName = navigation.state.routes[navigation.state.index].routeName
    if (routeName == "Settings" || routeName == "Wallet") {
        tabBarVisible = false
    }
    return tabBarVisible
}

const HomeStack = createStackNavigator({
    Dashboard: HomeScreen,
    Settings: Settings,
    Wallet: WalletScreen
}, {
    headerMode: 'none',
    mode: "modal",
})


HomeStack.navigationOptions = ({ navigation }) => {
    var tabBarVisible = hideNav(navigation)
    return ({
        tabBarVisible,
        tabBarLabel: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 10, margin: 'auto', color: focused ? activeColor : inactiveColor }}>Home</Text>
            </View>
        ),
        tabBarOptions: {
            activeTintColor: activeColor,
            inactiveTintColor: inactiveColor,
            style: {
                borderTopColor: "#ffffff00",
            }
        },
        tabBarIcon: ({ focused }) => (<Ionicons name='home' size={26} color={focused ? activeColor : inactiveColor} />),
    })
}


const ShopStack = createStackNavigator({
    Shop: ShopScreen,
    Settings: Settings,
    Wallet: WalletScreen
}, {
    headerMode: 'none',
    mode: "modal",
})

ShopStack.navigationOptions = ({ navigation }) => {
    var tabBarVisible = hideNav(navigation)
    return ({
        tabBarVisible,
        tabBarLabel: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 10, margin: 'auto', color: focused ? activeColor : inactiveColor }}>Shop</Text>
            </View>
        ),
        tabBarOptions: {
            activeTintColor: activeColor,
            inactiveTintColor: inactiveColor,
            style: {
                borderTopColor: "#ffffff00",
            }
        },
        tabBarIcon: ({ focused }) => (<Ionicons name='cart' size={26} color={focused ? activeColor : inactiveColor} />)
    })
}


const ReferralStack = createStackNavigator({
    Referrals: ReferralScreen,
    Settings: Settings,
    Wallet: WalletScreen

}, {
    mode: "modal",
    headerMode: 'none'
})

ReferralStack.navigationOptions = ({ navigation }) => {
    var tabBarVisible = hideNav(navigation)
    return ({
        tabBarVisible,
        tabBarLabel: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 10, margin: 'auto', color: focused ? activeColor : inactiveColor }}>Referrals</Text>
            </View>
        ),
        tabBarOptions: {
            activeTintColor: activeColor,
            inactiveTintColor: inactiveColor,
            style: {
                borderTopColor: "#ffffff00",
            }
        },
        tabBarIcon: ({ focused }) => (<Ionicons name='albums' size={26} color={focused ? activeColor : inactiveColor} />)
    })
}

// BonusScreen

const BonusStack = createStackNavigator({
    Bonus: BonusScreen,
    Settings: Settings,
    Wallet: WalletScreen,

}, {
    mode: "modal",
    headerMode: 'none'
})

BonusStack.navigationOptions = ({ navigation }) => {
    var tabBarVisible = hideNav(navigation)
    return ({
        tabBarVisible,
        tabBarLabel: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 10, margin: 'auto', color: focused ? activeColor : inactiveColor }}>
                    Bonuses
                </Text>
            </View>
        ),
        tabBarOptions: {
            activeTintColor: activeColor,
            inactiveTintColor: inactiveColor,
            style: {
                borderTopColor: "#ffffff00",
            }
        },
        tabBarIcon: ({ focused }) => (<Ionicons name='folder' size={26} color={focused ? activeColor : inactiveColor} />)
    })
}



const TabNavigator = createBottomTabNavigator({
    HomeStack, ShopStack, ReferralStack, BonusStack
},
)


export default createAppContainer(TabNavigator)