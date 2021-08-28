import useTailwind from "../hooks/useTailwind"
import { Text, View } from "react-native"
import WalkthroughBackground from "../assets/walkthrough-background.svg"
import { Button, Image } from "react-native-elements"
import Arrow from "../assets/arrow.svg"
import NavLogo from "../assets/nav-logo.svg"
import { GreenButton, YellowButton } from "../components/Button"
import React, { useState } from "react"
import AuthHeader from "../components/AuthHeader"
import WalkthroughModal from "@screens/WalkthroughModal"
import { SIGN_UP } from "../constants/screens"
import { useNavigation } from "@react-navigation/native"

export default function WalkthroughScreen() {
  const tailwind = useTailwind()
  const [isVisible, setIsVisible] = useState(false)
  const navigation = useNavigation()
  return (
    <View style={tailwind("flex-1 bg-white")}>
      <WalkthroughModal isVisible={isVisible} setIsVisible={setIsVisible} />
      <WalkthroughBackground />
      <View style={tailwind("absolute top-0 w-full h-full px-6 pb-inset")}>
        <AuthHeader />
        <Image
          containerStyle={tailwind("flex-1")}
          style={{ aspectRatio: 361 / 297 }}
          resizeMode={"contain"}
          source={require("../assets/walkthrough.png")}
        />
        <View style={tailwind("flex-1 justify-around")}>
          <Text
            style={tailwind(
              "text-center text-2xl font-barlow-regular text-black"
            )}
          >
            Finally, Weight Loss Driven by{"\n"}Science.
          </Text>
          <Text style={tailwind("text-base font-barlow-medium text-black")}>
            Choose smart before you start. DietCypher uses your DNA to discover
            your most effective weight loss diet, called your{" "}
            <Text style={tailwind("text-blue")}>DietCode</Text>
            {"\n\n"}
            Still want a science-backed, personalized diet, but not ready to
            wait? We got you. At DietCypher, you have options. Ready?
          </Text>
        </View>
        <View style={tailwind("py-5")}>
          <GreenButton
            containerStyle={tailwind("mb-2.5")}
            title={"What Are the DietCodes?"}
            onPress={() => setIsVisible(true)}
          />
          <YellowButton
            onPress={() => navigation.navigate(SIGN_UP)}
            title={"Continue to Sign Up"}
          />
        </View>
      </View>
    </View>
  )
}
