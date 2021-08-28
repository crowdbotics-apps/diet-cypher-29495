import { ScrollView, View } from "react-native"
import SettingBackground from "../assets/setting-background.svg"
import MainHeader from "./MainHeader"
import { BackButton } from "./Button"
import React from "react"
import useTailwind from "../hooks/useTailwind"

export default function SettingContainer({ title, children }) {
  const tailwind = useTailwind()
  return (
    <View style={tailwind("flex-1 px-5 bg-white")}>
      <SettingBackground style={tailwind("absolute top-0 left-0")} />
      <MainHeader title={title} />
      <BackButton />
      <ScrollView
        style={tailwind("flex-1")}
        contentContainerStyle={tailwind("flex-grow pb-5")}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  )
}
