import { create } from "tailwind-rn"
import styles from "../styles.json"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useMemo } from "react"
import { useWindowDimensions } from "react-native"

const fonts = {
  "font-grotesk-light": {
    fontFamily: "SpaceGrotesk_300Light"
  },
  "font-grotesk-medium": {
    fontFamily: "SpaceGrotesk_500Medium"
  },
  "font-barlow-medium": {
    fontFamily: "Barlow_500Medium"
  },
  "font-barlow-regular": {
    fontFamily: "Barlow_400Regular"
  },
  "font-barlow-bold": {
    fontFamily: "Barlow_700Bold"
  }
}

const translate = {
  "translate-x-4": {
    transform: [{ translateX: 16 }]
  },
  "-translate-x-2": {
    transform: [{ translateX: 8 }]
  },
  "translate-y-0.5": {
    transform: [{ translateY: 2 }]
  },
  "translate-y-1": {
    transform: [{ translateY: 5 }]
  },
  "translate-y-4": {
    transform: [{ translateY: 16 }]
  }
}

const rounded = {
  "rounded-input": {
    borderRadius: 50
  }
}

const shadow = {
  "shadow-input": {
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.1,
    shadowColor: "#000000",
    shadowRadius: 10
  },
  shadow: {
    elevation: 2
  },
  "shadow-4.5": {
    elevation: 30
  }
}

export default function useTailwind() {
  const insets = useSafeAreaInsets()
  const dimensions = useWindowDimensions()

  const { tailwind } = useMemo(() => {
    const customStyle = {
      "pt-inset": {
        paddingTop: insets.top
      },
      "pb-inset": {
        paddingBottom: insets.bottom
      },
      "mt-inset": {
        marginTop: insets.top
      },
      "w-screen": {
        width: dimensions.width
      },
      "h-screen": {
        height: dimensions.height
      },
      "w-input": {
        width: dimensions.width - 48
      }
    }
    return create({
      ...styles,
      ...fonts,
      ...customStyle,
      ...translate,
      ...rounded,
      ...shadow
    })
  }, [insets, dimensions])
  return tailwind
}
