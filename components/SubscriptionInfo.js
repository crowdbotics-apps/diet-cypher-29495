import Divider from "./Divider"
import { Text, View } from "react-native"
import React, { Fragment } from "react"
import useTailwind from "../hooks/useTailwind"
import { TextButton } from "./Button"

const INFO = [
  { label: "Costs", value: "$90 / Semi-Yearly" },
  { label: "Expires", value: "11.05.2021" }
]

export default function SubscriptionInfo() {
  return (
    <Fragment>
      {INFO.map(({ label, value }) => (
        <ListItem key={value} value={value} label={label} />
      ))}
      <PaymentMethod value={"Visa **** 5587"} />
      <Divider />
    </Fragment>
  )
}

export function PaymentMethod({ value }) {
  const tailwind = useTailwind()
  return (
    <ListItem label={"Payment Method"} value={value}>
      <TextButton style={tailwind("ml-5")} title={"Change"} />
    </ListItem>
  )
}

function ListItem({ label, value, children }) {
  const tailwind = useTailwind()
  return (
    <Fragment>
      <Divider />
      <View style={tailwind("flex-row justify-between py-4")}>
        <Text style={tailwind("text-base text-black font-barlow-medium")}>
          {label}
        </Text>
        <View style={tailwind("flex-row")}>
          <Text style={tailwind("text-base text-black font-barlow-medium")}>
            {value}
          </Text>
          {children}
        </View>
      </View>
    </Fragment>
  )
}
