import React, { Fragment } from "react"
import SettingContainer from "../components/SettingContainer"
import { useRoute } from "@react-navigation/native"
import { Text } from "react-native"
import useTailwind from "../hooks/useTailwind"

const SCREENS = {
  terms: {
    title: "Terms and Conditions",
    content: (
      <Fragment>
        <Title>Lorem ipsum dolor sit amet</Title>
        <Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          lobortis dolor vel purus dictum, sed sagittis erat rhoncus. Curabitur
          non lobortis lorem, sed aliquam purus. Donec nec libero ultricies,
          cursus ante sed, bibendum erat. Morbi at commodo ligula. Ut molestie
          ante felis, ac lacinia quam rhoncus et. Aenean non ultricies orci.
          Aenean aliquam fermentum vehicula. Cras non nunc enim. Nunc finibus
          dui ac consequat cursus. Phasellus fringilla elementum laoreet. Sed
          nec porttitor ipsum, eu facilisis orci. Proin ut urna semper, placerat
          sapien vel, dapibus odio. Mauris lobortis urna sit amet feugiat
          maximus. Donec porttitor porta elit, quis viverra lacus ullamcorper
          ac. Suspendisse semper ex pretium, finibus nisl quis, gravida dui.
          Nunc ornare pharetra ante, in sodales purus interdum at.
        </Content>
      </Fragment>
    )
  },
  privacy: {
    title: "Privacy Policy"
  }
}

export default function LegalScreen() {
  const { params } = useRoute()
  const { title, content } = SCREENS["terms"]
  return <SettingContainer title={title}>{content}</SettingContainer>
}

function Title({ children }) {
  const tailwind = useTailwind()
  return (
    <Text style={tailwind("text-xl text-black font-barlow-medium py-5")}>
      {children}
    </Text>
  )
}

function Content({ children }) {
  const tailwind = useTailwind()
  return (
    <Text style={tailwind("text-base text-black font-barlow-medium px-5")}>
      {children}
    </Text>
  )
}
