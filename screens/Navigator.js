import { createStackNavigator } from "@react-navigation/stack"
import {
  FORGOT_PASSWORD,
  HOME,
  LEGAL,
  LOGIN,
  NEW_PASSWORD,
  SETTING,
  SIGN_UP,
  SUBSCRIPTION,
  SUCCESS,
  UPDATE_SUBSCRIPTION,
  WALKTHROUGH,
  WELCOME
} from "../constants/screens"
import React from "react"
import WelcomeScreen from "@screens/Welcome"
import WalkthroughScreen from "@screens/Walkthrough"
import LoginScreen from "@screens/Login"
import SignupScreen from "@screens/Signup"
import ForgotPasswordScreen from "@screens/ForgotPassword"
import NewPasswordScreen from "@screens/NewPassword"
import Success from "@screens/Success"
import UpdateSubscriptionScreen from "@screens/UpdateSubscription"
import SubscriptionScreen from "@screens/Subscription"
import LegalScreen from "@screens/Legal"
import HomeScreen from "@screens/Home"

const Stack = createStackNavigator()

export default function Navigator() {
  return (
    <Stack.Navigator headerMode={false} initialRouteName={HOME}>
      <Stack.Screen name={LEGAL} component={LegalScreen} />
      <Stack.Screen name={SUBSCRIPTION} component={SubscriptionScreen} />
      <Stack.Screen
        name={UPDATE_SUBSCRIPTION}
        component={UpdateSubscriptionScreen}
      />
      <Stack.Screen name={HOME} component={HomeScreen} />
      <Stack.Screen name={WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={WALKTHROUGH} component={WalkthroughScreen} />
      <Stack.Screen name={LOGIN} component={LoginScreen} />
      <Stack.Screen name={SIGN_UP} component={SignupScreen} />
      <Stack.Screen name={FORGOT_PASSWORD} component={ForgotPasswordScreen} />
      <Stack.Screen name={NEW_PASSWORD} component={NewPasswordScreen} />
      <Stack.Screen name={SUCCESS} component={Success} />
    </Stack.Navigator>
  )
}
