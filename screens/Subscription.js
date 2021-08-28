import React from "react"
import { Text, View } from "react-native"
import useTailwind from "../hooks/useTailwind"
import { YellowButton } from "../components/Button"
import Cypher from "../assets/cypher.svg"
import SettingContainer from "../components/SettingContainer"
import SubscriptionInfo from "../components/SubscriptionInfo"
import { UPDATE_SUBSCRIPTION } from "../constants/screens"
import { useNavigation } from "@react-navigation/native"

export default function SubscriptionScreen() {
  const tailwind = useTailwind()
  const navigation = useNavigation()
  return (
    <SettingContainer title={"DietCypher Subscription"}>
      <View
        style={tailwind(
          "self-center items-center bg-gray mt-7 mb-5 py-14 px-10 rounded-full"
        )}
      >
        <Cypher />
        <Text style={tailwind("pt-7 text-3xl text-green font-barlow-medium")}>
          DietCypher{" "}
          <Text style={tailwind("text-yellow-dark font-barlow-bold")}>Pro</Text>
        </Text>
        <Text
          style={tailwind(
            "text-base text-green text-center font-barlow-medium pt-5"
          )}
        >
          Subscription model:{"\n"}Monthly
        </Text>
      </View>
      <SubscriptionInfo />
      <YellowButton
        containerStyle={tailwind("mt-5")}
        title={"Update Subscription"}
        onPress={() => navigation.navigate(UPDATE_SUBSCRIPTION)}
      />
    </SettingContainer>
  )
}
