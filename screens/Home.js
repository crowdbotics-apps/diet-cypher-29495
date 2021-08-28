import React from "react"
import { SafeAreaView, useWindowDimensions, View } from "react-native"
import useTailwind from "../hooks/useTailwind"
import CircularProgress from "../components/CircularProgress"

export default function HomeScreen() {
  const tailwind = useTailwind()
  const { width } = useWindowDimensions()
  return (
    <SafeAreaView style={tailwind("bg-white flex-1")}>
      <View style={tailwind("p-3 self-center")}>
        <CircularProgress tintColor={"#1C6859"} fill={60} size={width * 0.7}>
          <CircularProgress tintColor={"#9EDBDD"} fill={70} size={width * 0.6}>
            <CircularProgress
              tintColor={"#F6902A"}
              fill={80}
              size={width * 0.5}
            />
          </CircularProgress>
        </CircularProgress>
      </View>
    </SafeAreaView>
  )
}
