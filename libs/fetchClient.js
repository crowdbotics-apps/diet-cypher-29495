import AsyncStorage from "@react-native-async-storage/async-storage"
import { TOKEN } from "../constants/keys"

const API_URI = "https://dietcypher-28065.botics.co"

let token

export async function fetchClient(key, options) {
  // MARK: Dont do this if the token will be refreshed
  if (!token) {
    token = await AsyncStorage.getItem(TOKEN)
  }
  return fetch(API_URI + key, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? token : ""
    }
  })
}

export function getRequest(key) {
  return fetchClient(key)
}

export async function postRequest(key, data) {
  try {
    const res = await fetchClient(key, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    return await res.json()
  } catch (e) {
    throw e
  }
}
