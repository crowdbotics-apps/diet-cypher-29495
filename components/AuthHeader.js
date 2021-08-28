import { Button } from "react-native-elements"
import Arrow from "../assets/arrow.svg"
import NavLogo from "../assets/nav-logo.svg"
import { View } from "react-native"
import React from "react"
import useTailwind from "../hooks/useTailwind"
import { useNavigation } from "@react-navigation/native"

export default function AuthHeader() {
  const tailwind = useTailwind()
  const navigation = useNavigation()
  return (
    <View style={tailwind("flex py-8 items-center mt-inset")}>
      <Button
        containerStyle={tailwind("absolute top-4 left-0 rounded-full")}
        buttonStyle={tailwind(
          "bg-white flex items-center justify-center h-12 w-12"
        )}
        title={<Arrow style={tailwind("text-green")} />}
        onPress={() => navigation.goBack()}
      />
      <NavLogo />
    </View>
  )
}
