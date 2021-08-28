import React, { useContext } from "react"
import { Provider } from "react-redux"
import "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import {
  configureStore,
  createReducer,
  combineReducers
} from "@reduxjs/toolkit"
import AppLoading from "expo-app-loading"

import { screens } from "@screens"
import { hooks, slices, navigators, initialRoute } from "@modules"
import { connectors } from "@store"

import { GlobalOptionsContext, OptionsContext, getOptions } from "@options"
import { useFonts } from "expo-font"
import {
  Barlow_300Light,
  Barlow_400Regular,
  Barlow_500Medium,
  Barlow_600SemiBold,
  Barlow_700Bold
} from "@expo-google-fonts/barlow"
import {
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold
} from "@expo-google-fonts/space-grotesk"

const Stack = createStackNavigator()

const getNavigation = (modules, screens, initialRoute) => {
  const Navigation = () => {
    const routes = modules.concat(screens).map(([name, Navigator]) => {
      const Component = () => {
        return (
          <OptionsContext.Provider value={getOptions(Navigator)}>
            <Navigator />
          </OptionsContext.Provider>
        )
      }
      return <Stack.Screen key={name} name={name} component={Component} />
    })
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          {routes}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  return Navigation
}

const getStore = (slices, globalState) => {
  const reducers = Object.fromEntries(
    slices.map(([name, slice]) => [name, slice.reducer])
  )

  const appReducer = createReducer(globalState, _ => {
    return globalState
  })

  const reducer = combineReducers({
    app: appReducer,
    ...reducers
  })

  return configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
  })
}

const App = () => {
  const global = useContext(GlobalOptionsContext)
  const Navigation = getNavigation(navigators, screens, initialRoute)
  const store = getStore([...slices, ...connectors], global)
  const [fontsLoaded] = useFonts({
    Barlow_300Light,
    Barlow_400Regular,
    Barlow_500Medium,
    Barlow_600SemiBold,
    Barlow_700Bold,
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    FontAwesome: require("react-native-vector-icons/Fonts/FontAwesome.ttf")
  })
  let effects = {}
  hooks.map(([_, hook]) => {
    effects[hook.name] = hook()
  })
  if (!fontsLoaded) return <AppLoading />
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

export default App
