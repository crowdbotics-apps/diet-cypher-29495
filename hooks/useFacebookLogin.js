import { useEffect } from "react"
import * as Facebook from "expo-facebook"
import { useNavigation } from "@react-navigation/native"
import { SUCCESS } from "../constants/screens"
import { postRequest } from "../libs/fetchClient"
import { FACEBOOK_LOGIN } from "../constants/keys"
import setToken from "../libs/setToken"

const FACEBOOK_APP_ID = "2989899184671539"

export default function useFacebookLogin(setLoading) {
  const navigaiton = useNavigation()
  useEffect(() => {
    ;(async function () {
      await Facebook.initializeAsync({
        appId: FACEBOOK_APP_ID
      })
    })()
  }, [])

  return async function facebookLogin() {
    try {
      setLoading(true)
      const { type, token: _token } =
        await Facebook.logInWithReadPermissionsAsync()
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${_token}`
        )
        const data = await response.json()
        console.log(data)
        const { token } = await postRequest(FACEBOOK_LOGIN, {})
        await setToken(token)
        navigaiton.navigate(SUCCESS)
      } else {
        setLoading(false)
      }
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }
}
