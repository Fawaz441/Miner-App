import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignUpScreen";


const Navigator = createStackNavigator({
    Login:LoginScreen,
    Signup:SignupScreen
},
{
    headerMode: 'none',
    mode: "modal",
})

export default createAppContainer(Navigator)