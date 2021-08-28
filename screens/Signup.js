import React from "react"
import { Platform, Text, View } from "react-native"
import useTailwind from "../hooks/useTailwind"
import { useForm, Controller } from "react-hook-form"
import { PasswordInput, PlainInput } from "../components/Input"
import AndroidCheckBox from "@react-native-community/checkbox"
import { CheckBox as IOSCheckBox } from "react-native-elements"
import { TextButton, YellowButton } from "../components/Button"
import AuthContainer from "../components/AuthContainer"
import { postRequest } from "../libs/fetchClient"
import { REGISTER } from "../constants/keys"
import { yupResolver } from "@hookform/resolvers/yup"
import signupSchema from "../schema/signup"
import { useNavigation } from "@react-navigation/native"
import { SUCCESS } from "../constants/screens"

export default function SignupScreen() {
  const tailwind = useTailwind()
  const navigation = useNavigation()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    resolver: yupResolver(signupSchema)
  })
  const handleSignup = handleSubmit(async function (data) {
    try {
      const { Token, email_address } = await postRequest(REGISTER, data)
      navigation.navigate(SUCCESS)
    } catch (e) {
      console.log(e)
    }
  })
  return (
    <AuthContainer title={"Sign Up for a New\nDietCypher Account"}>
      <View>
        <PlainInput placeholder={"Name"} control={control} name={"name"} />
        <PlainInput
          placeholder={"Email"}
          control={control}
          containerStyle={tailwind("mt-6")}
          name={"email"}
        />
        <PasswordInput
          placeholder={"Password"}
          control={control}
          containerStyle={tailwind("mt-6")}
          name={"password"}
        />
        <PasswordInput
          placeholder={"Confirm Password"}
          control={control}
          containerStyle={tailwind("mt-6")}
          name={"password2"}
        />
      </View>
      <View style={tailwind("pt-6")}>
        <View style={tailwind("flex-row")}>
          <Controller
            control={control}
            name={"agreement"}
            render={({ field: { onChange, value } }) =>
              Platform.OS === "android" ? (
                <AndroidCheckBox
                  value={value}
                  onValueChange={onChange}
                  tintColors={{ false: "#C6C6C6" }}
                />
              ) : (
                <IOSCheckBox
                  checked={value}
                  onPress={() => onChange(!value)}
                  containerStyle={tailwind("p-0 mx-0")}
                  checkedColor={"#1C6859"}
                />
              )
            }
          />
          <View style={tailwind("flex-row flex-wrap")}>
            <Text
              style={tailwind("text-base font-barlow-medium translate-y-0.5")}
            >
              By Signing Up I understand the
            </Text>
            <TextButton
              style={tailwind("translate-y-0.5")}
              title={"Terms & Conditions "}
            />
            <Text
              style={tailwind("text-base font-barlow-medium translate-y-0.5")}
            >
              and
            </Text>
            <TextButton
              style={tailwind("translate-y-0.5")}
              title={" Privacy Policy"}
            />
          </View>
        </View>
        <YellowButton
          onPress={handleSignup}
          title={"Sign Up"}
          containerStyle={tailwind("mt-5")}
          loading={isSubmitting}
        />
      </View>
    </AuthContainer>
  )
}
