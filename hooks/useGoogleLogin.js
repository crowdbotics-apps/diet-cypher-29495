import { useEffect } from "react"
import { Platform } from "react-native"
import * as GoogleSignIn from "expo-google-sign-in"
import { GOOGLE_LOGIN, TOKEN } from "../constants/keys"
import { postRequest } from "../libs/fetchClient"
import { useNavigation } from "@react-navigation/native"
import { SUCCESS } from "../constants/screens"
import AsyncStorage from "@react-native-async-storage/async-storage"
import setToken from "../libs/setToken"

const GOOGLE_CLIENT_ID =
  "882408038553-o17n0te38n4vstddedqvdng6q5gjktvk.apps.googleusercontent.com"

export default function useGoogleLogin(setLoading) {
  const navigation = useNavigation()
  useEffect(() => {
    ;(async function () {
      await GoogleSignIn.initAsync({
        clientId: Platform.OS === "android" ? GOOGLE_CLIENT_ID : undefined
      })
    })()
  }, [])

  return async function googleLogin() {
    try {
      setLoading(true)
      await GoogleSignIn.askForPlayServicesAsync()
      const { type } = await GoogleSignIn.signInAsync()
      if (type === "success") {
        const {
          auth: { accessToken }
        } = await GoogleSignIn.signInSilentlyAsync()
        const { token } = await postRequest(GOOGLE_LOGIN, {
          access_token: accessToken
        })
        await setToken(token)
        navigation.navigate(SUCCESS)
      } else {
        setLoading(false)
      }
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }
}
