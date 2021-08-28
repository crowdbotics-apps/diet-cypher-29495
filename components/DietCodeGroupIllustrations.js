import useTailwind from "../hooks/useTailwind"
import React from "react"
import { View } from "react-native"
import DietCodeIllustration from "./DietCodeIllustration"
import HighFat from "../assets/diet-code-01-high-fat.svg"
import LowFat from "../assets/dietcode-02-low-fat.svg"
import HighProtein from "../assets/dietcode-03-high-protein.svg"
import ModerateProtein from "../assets/dietcode-04-moderate-protein.svg"
import HighCarb from "../assets/dietcode-05-high-carb.svg"
import Balanced from "../assets/dietcode-06-balanced.svg"

const dietCodeIllustrations = [
  <HighFat height="100%" width="100%" />,
  <LowFat height="100%" width="100%" />,
  <HighProtein height="100%" width="100%" />,
  <ModerateProtein height="100%" width="100%" />,
  <HighCarb height="100%" width="100%" />,
  <Balanced height="100%" width="100%" />
]

const DietCodeGroupIllustrations = ({ activePage }) => {
  const tailwind = useTailwind()
  return (
    <View style={tailwind("flex-row flex-wrap items-center justify-between")}>
      {dietCodeIllustrations.map((illustration, index) => (
        <DietCodeIllustration
          activePage={activePage}
          illustration={illustration}
          index={index}
        />
      ))}
    </View>
  )
}

export default DietCodeGroupIllustrations
