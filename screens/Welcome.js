import { Text, View } from "react-native"
import WelcomeBackground from "../assets/welcome-background.svg"
import Logo from "../assets/logo.svg"
import React from "react"
import useTailwind from "../hooks/useTailwind"
import { YellowButton } from "../components/Button"
import { Image } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import { LOGIN, WALKTHROUGH } from "../constants/screens"

export default function WelcomeScreen() {
  const tailwind = useTailwind()
  const navigation = useNavigation()
  return (
    <View style={tailwind("flex-1 bg-white")}>
      <WelcomeBackground style={tailwind("flex-1")} />
      <View
        style={[tailwind("absolute top-0 w-full h-full pt-inset pb-inset")]}
      >
        <View style={tailwind("flex-1 justify-evenly items-center")}>
          <Logo />
          <Image
            containerStyle={tailwind("translate-x-4 h-1/2 w-full")}
            style={{ aspectRatio: 340 / 332 }}
            source={require("../assets/welcome.png")}
            resizeMode={"contain"}
          />
          <View>
            <Title>We Crack the Code,</Title>
            <Title>You Lose the Weight</Title>
          </View>
        </View>
        <View style={tailwind("px-5 pb-5")}>
          <YellowButton
            containerStyle={tailwind("mb-2.5")}
            title={"Sign In Here With Your DietCypher Account"}
            onPress={() => navigation.navigate(LOGIN)}
          />
          <YellowButton
            onPress={() => navigation.navigate(WALKTHROUGH)}
            title={"Get Started"}
          />
        </View>
      </View>
    </View>
  )
}

function Title({ children, style, ...props }) {
  const tailwind = useTailwind()
  return (
    <Text
      style={[
        tailwind("text-center text-3xl text-green font-grotesk-light"),
        style
      ]}
      {...props}
    >
      {children}
    </Text>
  )
}
