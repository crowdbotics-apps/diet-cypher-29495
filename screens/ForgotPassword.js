import React from "react"
import AuthContainer from "../components/AuthContainer"
import { View } from "react-native"
import CircularLogo from "../assets/circular-logo.svg"
import useTailwind from "../hooks/useTailwind"
import { PlainInput } from "../components/Input"
import { useForm } from "react-hook-form"
import { TextButton, YellowButton } from "../components/Button"
import { useNavigation } from "@react-navigation/native"
import { LOGIN, NEW_PASSWORD, SIGN_UP } from "../constants/screens"
import { yupResolver } from "@hookform/resolvers/yup"
import { object, string } from "yup"
import { postRequest } from "../libs/fetchClient"
import { FORGOT_PASSWORD } from "../constants/keys"

export default function ForgotPasswordScreen() {
  const tailwind = useTailwind()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    resolver: yupResolver(
      object({
        email: string().required("Email is required.").email("Invalid email.")
      })
    )
  })
  const navigation = useNavigation()
  const sendToken = handleSubmit(async function (data) {
    try {
      const res = await postRequest(FORGOT_PASSWORD, data)
      console.log(res)
      navigation.navigate(NEW_PASSWORD, data)
    } catch (e) {
      console.log("Error", e)
    }
  })
  return (
    <AuthContainer title={"Forgot Your\nPassword?"}>
      <View>
        <CircularLogo style={tailwind("self-center")} />
        <PlainInput control={control} name={"email"} placeholder={"Email"} />
        <YellowButton
          title={"Reset My Password"}
          containerStyle={tailwind("mt-5")}
          onPress={sendToken}
          loading={isSubmitting}
        />
        <TextButton
          style={tailwind("self-center mt-4")}
          title={"I already have an account, Sign In"}
          onPress={() => navigation.navigate(LOGIN)}
        />
        <TextButton
          style={tailwind("self-center mt-4")}
          title={"I don’t have an account, Sign Up"}
          onPress={() => navigation.navigate(SIGN_UP)}
        />
      </View>
    </AuthContainer>
  )
}
