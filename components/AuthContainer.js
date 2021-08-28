import AuthBackground from "../assets/auth-background.svg"
import AuthHeader from "./AuthHeader"
import { Text, View } from "react-native"
import React from "react"
import useTailwind from "../hooks/useTailwind"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default function AuthContainer({ children, title }) {
  const tailwind = useTailwind()
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={tailwind("flex-grow pb-inset")}
      style={tailwind("flex-1 bg-white")}
      keyboardShouldPersistTaps={"handled"}
      showsVerticalScrollIndicator={false}
    >
      <AuthBackground style={tailwind("absolute top-0")} />
      <View style={tailwind("flex-1 px-6")}>
        <AuthHeader />
        <Text
          style={tailwind(
            "text-center text-white font-grotesk-medium text-xl pb-8"
          )}
        >
          {title}
        </Text>
        <View style={tailwind("flex-1 justify-between pb-5")}>{children}</View>
      </View>
    </KeyboardAwareScrollView>
  )
}
