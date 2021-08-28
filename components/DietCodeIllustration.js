import useTailwind from "../hooks/useTailwind"
import React from "react"
import { View } from "react-native"

const DietCodeIllustration = ({ illustration, index, activePage }) => {
    const tailwind = useTailwind();
  return (
    <View
      style={tailwind("w-3/10")}
      resizeMode={"contain"}
      style={{
        aspectRatio: 1,
        height: 100,
        opacity: index === activePage ? 1 : 0.2
      }}
    >
      {illustration}
    </View>
  )
}

export default DietCodeIllustration
