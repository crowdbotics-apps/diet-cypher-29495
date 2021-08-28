import React, { useEffect } from "react"
import AuthContainer from "../components/AuthContainer"
import { Text, View } from "react-native"
import CircularLogo from "../assets/circular-logo.svg"
import useTailwind from "../hooks/useTailwind"
import { OTPInput, PasswordInput } from "../components/Input"
import { useForm } from "react-hook-form"
import { TextButton, YellowButton } from "../components/Button"
import { useNavigation, useRoute } from "@react-navigation/native"
import { postRequest } from "../libs/fetchClient"
import { FORGOT_PASSWORD, NEW_PASSWORD } from "../constants/keys"
import { yupResolver } from "@hookform/resolvers/yup"
import newPasswordSchema from "../schema/newPassword"
import { LOGIN } from "../constants/screens"

export default function NewPasswordScreen() {
  const tailwind = useTailwind()
  const navigation = useNavigation()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setFocus,
    setValue
  } = useForm({
    resolver: yupResolver(newPasswordSchema)
  })

  const {
    params: { email }
  } = useRoute()
  useEffect(() => {
    setFocus("0")
  }, [setFocus])

  const resetPassword = handleSubmit(async function ({
    password,
    password2,
    ...codes
  }) {
    const token = Object.keys(codes).reduce(
      (accumulator, key) => accumulator + codes[key],
      ""
    )
    try {
      const res = await postRequest(NEW_PASSWORD, {
        email,
        password,
        password2,
        token: Number(token)
      })
      console.log(res)
      navigation.navigate(LOGIN, {
        email,
        password
      })
    } catch (e) {
      console.log(e)
    }
  })

  async function resendToken() {
    try {
      await postRequest(FORGOT_PASSWORD, { email })
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <AuthContainer title={"Set Your New DietCypher\nPassword"}>
      <View>
        <CircularLogo style={tailwind("self-center -mb-10")} />
        <View style={tailwind("flex-row justify-between")}>
          {[...Array(4).keys()].map(index => (
            <OTPInput
              key={index}
              control={control}
              index={index}
              setFocus={setFocus}
              setValue={setValue}
              totalLength={4}
            />
          ))}
        </View>
        <PasswordInput
          control={control}
          name={"password"}
          placeholder={"Password"}
          containerStyle={tailwind("mt-6")}
        />
        <PasswordInput
          control={control}
          name={"password2"}
          placeholder={"Confirm Password"}
          containerStyle={tailwind("mt-5")}
        />
        <YellowButton
          title={"Save Password"}
          containerStyle={tailwind("mt-5")}
          loading={isSubmitting}
          onPress={resetPassword}
        />
        <YellowButton title={"Cancel"} containerStyle={tailwind("mt-2.5")} />
        <Text style={tailwind("text-base text-black font-barlow-medium mt-5")}>
          Didn’t receive the password reset security token sent to
          user@email.com?
          <TextButton
            onPress={resendToken}
            title={" Send again"}
            style={tailwind("translate-y-1")}
          />
        </Text>
      </View>
    </AuthContainer>
  )
}
