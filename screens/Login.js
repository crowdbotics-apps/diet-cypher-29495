import React, { useCallback, useState } from "react"
import AuthContainer from "../components/AuthContainer"
import { PasswordInput, PlainInput } from "../components/Input"
import { useForm } from "react-hook-form"
import { Text, View } from "react-native"
import useTailwind from "../hooks/useTailwind"
import { SocialButton, TextButton, YellowButton } from "../components/Button"
import Google from "../assets/google.svg"
import Apple from "../assets/apple.svg"
import FacebookIcon from "../assets/facebook.svg"
import { yupResolver } from "@hookform/resolvers/yup"
import loginSchema from "../schema/login"
import { postRequest } from "../libs/fetchClient"
import { LOGIN, TOKEN } from "../constants/keys"
import useGoogleLogin from "../hooks/useGoogleLogin"
import useFacebookLogin from "../hooks/useFacebookLogin"
import useAppleLogin from "../hooks/useAppleLogin"
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from "@react-navigation/native"
import { FORGOT_PASSWORD, SUCCESS } from "../constants/screens"
import AsyncStorage from "@react-native-async-storage/async-storage"
import setToken from "../libs/setToken"

export default function LoginScreen() {
  const {
    control,
    formState: { isSubmitting, errors },
    handleSubmit,
    setValue
  } = useForm({
    resolver: yupResolver(loginSchema)
  })
  const navigation = useNavigation()
  const tailwind = useTailwind()
  const { params } = useRoute()
  const [loading, setLoading] = useState(false)
  const googleLogin = useGoogleLogin(setLoading)
  const facebookLogin = useFacebookLogin(setLoading)
  const appleLogin = useAppleLogin(setLoading)
  useFocusEffect(
    useCallback(() => {
      if (params?.email) {
        setValue("email", params.email)
      }
      if (params?.password) {
        setValue("password", params.password)
      }
    }, [params, setValue])
  )
  const handleLogin = handleSubmit(async function (data) {
    try {
      const { token } = await postRequest(LOGIN, data)
      await setToken(token)
      navigation.navigate(SUCCESS)
    } catch (e) {
      console.log(e)
    }
  })

  return (
    <AuthContainer title={"Sign In to Your Existing\nDietCypher Account"}>
      <View>
        <PlainInput control={control} name={"email"} placeholder={"Email"} />
        <PasswordInput
          control={control}
          name={"password"}
          placeholder={"Password"}
          containerStyle={tailwind("mt-6")}
        />
        <TextButton
          style={tailwind("self-end my-4")}
          title={"Forgot My Password"}
          onPress={() => navigation.navigate(FORGOT_PASSWORD)}
        />
        <YellowButton
          onPress={handleLogin}
          title={"Sign in"}
          loading={isSubmitting}
        />
      </View>
      <Text
        style={tailwind(
          "text-black text-base text-center font-barlow-medium py-5"
        )}
      >
        Or Sign In Using
      </Text>
      <View>
        <SocialButton
          title={"Sign in using Google"}
          containerStyle={tailwind("mb-2.5")}
          Icon={Google}
          onPress={googleLogin}
          loading={loading}
        />
        <SocialButton
          title={"Sign in using Apple"}
          containerStyle={tailwind("mb-2.5")}
          Icon={Apple}
          onPress={appleLogin}
          loading={loading}
        />
        <SocialButton
          title={"Sign in using Facebook"}
          Icon={FacebookIcon}
          onPress={facebookLogin}
          loading={loading}
        />
      </View>
    </AuthContainer>
  )
}
