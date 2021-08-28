import React from "react"
import useTailwind from "../hooks/useTailwind"
import { Text, View } from "react-native"

export default function Divider() {
  const tailwind = useTailwind()
  return (
    <View style={tailwind("w-full h-px bg-gray")}>
      <Text>Hello</Text>
    </View>
  )
}
