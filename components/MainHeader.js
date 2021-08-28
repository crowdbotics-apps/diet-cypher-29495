import React from "react"
import { Text, View } from "react-native"
import useTailwind from "../hooks/useTailwind"
import { Button, Image } from "react-native-elements"
import Menu from "../assets/menu.svg"

export default function MainHeader({ title }) {
  const tailwind = useTailwind()
  return (
    <View style={tailwind("flex-row py-8 justify-between items-center")}>
      <Button
        buttonStyle={tailwind("h-12 w-12 bg-green rounded-full")}
        title={<Menu />}
      />
      <Text style={tailwind("text-xl text-green font-barlow-medium")}>
        {title}
      </Text>
      <Image
        source={require("../assets/avatar.png")}
        containerStyle={tailwind("h-12 w-12")}
      />
    </View>
  )
}
