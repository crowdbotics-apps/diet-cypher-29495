import useTailwind from "../hooks/useTailwind"
import { Button } from "react-native-elements"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import Arrow from "../assets/arrow.svg"
import Cross from "../assets/cross.svg"
import { useNavigation } from "@react-navigation/native"

export function YellowButton({ ...props }) {
  const tailwind = useTailwind()
  return (
    <StyledButton
      buttonStyle={tailwind("bg-yellow")}
      titleStyle={tailwind("text-black")}
      disabledStyle={tailwind("bg-yellow-opaque")}
      {...props}
    />
  )
}

export function GreenButton({ ...props }) {
  const tailwind = useTailwind()
  return (
    <StyledButton
      buttonStyle={tailwind("bg-green-light")}
      titleStyle={tailwind("text-green")}
      {...props}
    />
  )
}

export function RedButton({ ...props }) {
  const tailwind = useTailwind()
  return (
    <StyledButton
      buttonStyle={tailwind("bg-red")}
      titleStyle={tailwind("text-white")}
      {...props}
    />
  )
}

export function StyledButton({
  buttonStyle,
  titleStyle,
  containerStyle,
  ...props
}) {
  const tailwind = useTailwind()
  return (
    <Button
      titleStyle={[tailwind("font-barlow-medium text-base"), titleStyle]}
      buttonStyle={[tailwind("py-3"), buttonStyle]}
      containerStyle={[tailwind("rounded-full"), containerStyle]}
      loadingStyle={{
        height: 22
      }}
      {...props}
    />
  )
}

export function SocialButton({ Icon, ...props }) {
  const tailwind = useTailwind()
  return (
    <StyledButton
      buttonStyle={tailwind("bg-gray-light")}
      titleStyle={tailwind("text-black")}
      icon={<Icon style={tailwind("absolute left-5")} />}
      loadingProps={{ color: "#2B2B2B" }}
      {...props}
    />
  )
}

export function TextButton({ title, ...props }) {
  const tailwind = useTailwind()
  return (
    <TouchableOpacity {...props}>
      <Text style={tailwind("text-blue text-base font-barlow-medium")}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export function BackButton() {
  const tailwind = useTailwind()
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={tailwind("flex-row items-center")}
    >
      <View
        style={tailwind(
          "h-6 w-6 bg-green rounded-full items-center justify-center"
        )}
      >
        <Arrow style={tailwind("text-white")} height={12} width={12} />
      </View>
      <Text
        style={tailwind("text-xl leading-5 text-black font-barlow-medium pl-5")}
      >
        Back
      </Text>
    </TouchableOpacity>
  )
}

export function CrossButton({ iconStyle, ...props }) {
  const tailwind = useTailwind()
  return (
    <Button
      containerStyle={tailwind("self-end absolute top-1 right-1")}
      buttonStyle={tailwind("bg-transparent")}
      title={<Cross style={iconStyle} />}
      {...props}
    />
  )
}

export function SubscriptionPlan({
  isSelected,
  isCurrent,
  containerStyle,
  ...props
}) {
  const tailwind = useTailwind()
  return (
    <Button
      containerStyle={[tailwind("rounded-full"), { width: "32.5%" }]}
      buttonStyle={[
        tailwind("py-2"),
        tailwind(
          isCurrent ? "bg-green" : isSelected ? "bg-yellow-dark" : "bg-yellow"
        )
      ]}
      titleStyle={[
        tailwind("text-base font-barlow-medium"),
        tailwind(isCurrent || isSelected ? "text-white" : "text-black")
      ]}
      {...props}
    />
  )
}
