import React, { Fragment, useState } from "react"
import SettingContainer from "../components/SettingContainer"
import SubscriptionInfo from "../components/SubscriptionInfo"
import useTailwind from "../hooks/useTailwind"
import { Text, View } from "react-native"
import { SubscriptionPlan, YellowButton } from "../components/Button"
import SubscriptionBottomSheet from "../components/SubscriptionBottomSheet"

const BOTTOM_SHEETS = [
  {
    title: "Cancel Subscription",
    expiry: "05.05.2021",
    description: "Are your sure you want to cancel your subscription?"
  },
  {
    title: "Update Subscription",
    expiry: "05.05.2021",
    description: ""
  }
]

const SUBSCRIPTION_PLANS = [
  {
    title: "Monthly"
  },
  {
    title: "Semi-Yearly"
  },
  {
    title: "Yearly"
  }
]

export default function UpdateSubscriptionScreen() {
  const tailwind = useTailwind()
  const [bottomSheet, setBottomSheet] = useState("")
  const [currentPlan, setCurrentPlan] = useState("Semi-Yearly")
  const [selectedPlan, setSelectedPlan] = useState("")
  return (
    <SettingContainer title={"Update Subscription"}>
      <SubscriptionBottomSheet
        onClose={() => setBottomSheet("")}
        isVisible={bottomSheet === "cancelSubscription"}
        title={"Cancel Subscription"}
        expiry={"05.05.2021"}
        description={"Are your sure you want to cancel your subscription?"}
      />
      <SubscriptionBottomSheet
        onClose={() => setBottomSheet("")}
        isVisible={bottomSheet === "updateSubscription"}
        title={"Update Subscription"}
        expiry={"05.05.2021"}
        description={
          <Fragment>
            Your new subscription type,{" "}
            <Text style={tailwind("font-barlow-bold")}>{selectedPlan}</Text>{" "}
            will be activated on 05.05.2021
          </Fragment>
        }
      />
      <View
        style={tailwind(
          "self-center items-center rounded-full mt-7 mb-5 p-10 bg-green"
        )}
      >
        <Text style={tailwind("text-3xl text-white font-barlow-medium pb-2")}>
          Pro
        </Text>
        <Text style={tailwind("text-base text-white text-center w-24")}>
          $90{"\n"}
          {selectedPlan || currentPlan}
        </Text>
      </View>
      <Text style={tailwind("text-base text-black font-barlow-medium")}>
        Type
      </Text>
      <View style={tailwind("py-5 flex-row justify-between")}>
        {SUBSCRIPTION_PLANS.map(({ title }) => (
          <SubscriptionPlan
            onPress={() => {
              setSelectedPlan(title)
            }}
            title={title}
            isSelected={selectedPlan === title}
            isCurrent={currentPlan === title}
          />
        ))}
      </View>
      <SubscriptionInfo />
      <YellowButton
        disabled={!selectedPlan || selectedPlan === currentPlan}
        title={"Confirm"}
        containerStyle={tailwind("mt-5")}
        onPress={() => setBottomSheet("updateSubscription")}
      />
      <YellowButton
        title={"Cancel Subscription"}
        containerStyle={tailwind("mt-2.5")}
        onPress={() => setBottomSheet("cancelSubscription")}
      />
    </SettingContainer>
  )
}
