import "react-native-get-random-values"
import { v4 as uuid } from "uuid"
import {
  appleAuthAndroid,
  appleAuth
} from "@invertase/react-native-apple-authentication"
import { Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { SUCCESS } from "../constants/screens"
import { postRequest } from "../libs/fetchClient"
import { APPLE_LOGIN } from "../constants/keys"
import setToken from "../libs/setToken"

const CLIENT_ID = "com.crowdbotics.nameless-morning-2806"
const REDIRECT_URI =
  "https://dietcypher-28065.botics.co/accounts/apple/login/callback/"

let user = null

export default function useAppleLogin(setLoading) {
  const navigation = useNavigation()
  async function fetchAndUpdateCredentialState() {
    if (user === null) {
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(user)
      console.log(credentialState)
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // Authorized
      } else {
      }
    }
  }
  async function appleLoginIOS() {
    setLoading(true)
    try {
      const { authorizationCode, identityToken } =
        await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN
        })
      await fetchAndUpdateCredentialState()
      const { token } = await postRequest(APPLE_LOGIN, {
        id_token: identityToken
      })
      await setToken(token)
      console.log(token)
      navigation.navigate(SUCCESS)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  async function appleLoginAndroid() {
    setLoading(true)
    const nonce = uuid()
    const state = uuid()
    try {
      appleAuthAndroid.configure({
        clientId: CLIENT_ID,
        redirectUri: REDIRECT_URI,
        nonce,
        state
      })
      const response = await appleAuthAndroid.signIn()
      if (response) {
        const { code, id_token } = response
        const { token } = await postRequest(APPLE_LOGIN, { code, id_token })
        console.log(token)
        await setToken(token)
        navigation.navigate(SUCCESS)
      } else {
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return Platform.OS === "ios" ? appleLoginIOS : appleLoginAndroid
}
