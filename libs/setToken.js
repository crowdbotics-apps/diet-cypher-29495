import AsyncStorage from "@react-native-async-storage/async-storage"
import { TOKEN } from "../constants/keys"

export default async function setToken(token) {
  await AsyncStorage.setItem(TOKEN, token)
}
