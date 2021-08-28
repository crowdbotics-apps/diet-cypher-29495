import React from "react"
import { Overlay } from "react-native-elements"
import useTailwind from "../hooks/useTailwind"
import { Text } from "react-native"
import { CrossButton, RedButton, YellowButton } from "./Button"

export default function SubscriptionBottomSheet({
  title,
  description,
  expiry,
  onClose,
  onConfirm,
  isVisible
}) {
  const tailwind = useTailwind()
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={tailwind(
        "absolute w-full bottom-0 rounded-t-2xl p-5 shadow-4.5"
      )}
      animationType={"slide"}
      // backdropStyle={tailwind("bg-transparent")}
    >
      <Text style={tailwind("text-xl text-green font-grotesk-medium")}>
        {title}
      </Text>
      <CrossButton onPress={onClose} iconStyle={tailwind("text-black")} />
      <Text style={tailwind("text-base text-black font-barlow-medium")}>
        Expires {expiry}
      </Text>
      <Text
        style={tailwind(
          "py-7 text-xl text-black text-center font-barlow-medium"
        )}
      >
        {description}
      </Text>
      <YellowButton onConfirm={onConfirm} title={"Confirm"} />
      <RedButton
        onPress={onClose}
        title={"Cancel"}
        containerStyle={tailwind("mt-2.5")}
      />
    </Overlay>
  )
}
