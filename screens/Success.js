import React from "react"
import { Text, View } from "react-native"
import useTailwind from "../hooks/useTailwind"

export default function Success() {
  const tailwind = useTailwind()
  return (
    <View style={tailwind("flex-1 justify-center items-center")}>
      <Text style={tailwind("text-4xl font-barlow-medium")}>Success</Text>
    </View>
  )
}
