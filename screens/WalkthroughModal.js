import React, { useRef, useState } from "react"
import { Text, View } from "react-native"
import useTailwind from "../hooks/useTailwind"
import { Overlay, useTheme } from "react-native-elements"
import { CrossButton, GreenButton, RedButton } from "../components/Button"
import PagerView from "react-native-pager-view"
import DietCodeGroupIllustrations from "../components/DietCodeGroupIllustrations"

const dietCodes = [
  {
    title: "High Fat",
    description:
      "Those assigned to the High-Fat DietCode have genetic variations that suggest they may benefit from the most weight loss when following a diet high in fat. The High-Fat DietCode is a diet rich in healthy and essential fats. This DietCode emphasizes eating foods containing ample amounts of these fats such as salmon, avocados, almonds, walnuts, flaxseeds and olive oil."
  },
  {
    title: "Low Fat",
    description: `Those assigned to the Low-Fat DietCode have genetic variations that suggest they may benefit from the most weight loss when following a diet low in fat. The Low-Fat DietCode is a diet full of nutritious, low-fat foods. This DietCode means eating healthful foods naturally low in fat such as berries, vegetables, most beans, white fish, chicken breast and the lower-fat versions of nutritious foods such as low-fat yogurt.`
  },
  {
    title: "High Protein",
    description: `Those assigned to the High-Protein DietCode have genetic variations that suggest they may benefit from the most weight loss when following a diet high in protein. The High-Protein DietCode is a diet full of nutrient-rich, protein-packed foods. A high-protein diet consists of eating ample amounts of protein-packed foods such as fish, poultry, yogurt and legumes.`
  },
  {
    title: "Moderate Protein",
    description: `Those assigned to the Moderate-Protein DietCode have genetic variations that suggest they may benefit from the most weight loss when following a moderate, not high, protein diet. The Moderate-Protein DietCode emphasizes following what is commonly referred to as a “plant- based” diet. Choosing plant-based proteins (e.g. legumes, nuts, seeds and certain whole grains) in place of red meats or poultry can help keep your protein intake in check. Consume animal-based proteins sparingly, and when doing so, fish or seafood are great options.`
  },
  {
    title: "High Carb",
    description: `Those assigned to the High-Carb DietCode have genetic variations that suggest they may benefit from the most weight loss when following a diet high in fibrous carbohydrates. The High-Carb DietCode is a diet mainly full of wholesome, fiber-rich carbohydrate foods, and it emphasizes eating minimally-processed or unprocessed whole grains such as oats, couscous, wild rice, quinoa, fruits, beans and select vegetables.`
  },
  {
    title: "Balanced",
    description: `Those assigned to the Balanced DietCode have genetic variations that suggest none of the diet types, i.e. high-fat, low-fat, high-protein, moderate-protein, and high-carb, would provide benefit for the most weight loss; thus, a healthful, balanced diet is recommended. The Balanced DietCode emphasizes following a well-balanced diet which is moderate in protein, fat and carbohydrates. Most nutrient-rich, healthy foods fall into this category including fruits, vegetables, whole grains, lean dairy and protein.`
  }
]

export default function WalkthroughModal({ isVisible, setIsVisible }) {
  const tailwind = useTailwind()
  const pagerRef = useRef(null)
  const [activePage, setActivePage] = useState(0)

  function changePage(index) {
    if (!pagerRef) return
    pagerRef.current?.setPage(index)
  }

  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={tailwind(
        "w-full bg-white h-full rounded-t-2xl mt-32 shadow py-0 px-5"
      )}
      backdropStyle={tailwind("bg-transparent")}
      animationType={"slide"}
    >
      <View style={tailwind("items-center py-6")}>
        <Pagination size={6} activePage={activePage} />
      </View>
      <CrossButton
        onPress={() => setIsVisible(false)}
        iconStyle={tailwind("text-green-dark")}
      />
      <PagerView
        ref={pagerRef}
        orientation={"horizontal"}
        style={tailwind("h-1/2 flex-1")}
        initialPage={0}
        onPageSelected={({ nativeEvent }) =>
          setActivePage(nativeEvent.position)
        }
      >
        {dietCodes.map(dietCode => (
          <View key={dietCode.title} style={tailwind("flex-1 justify-around")}>
            <DietCodeGroupIllustrations activePage={activePage} />
            <Text
              style={tailwind(
                "text-xl text-black text-center font-grotesk-medium"
              )}
            >
              {dietCode.title}
            </Text>
            <Text style={tailwind("text-base text-black font-barlow-medium")}>
              {dietCode.description}
            </Text>
          </View>
        ))}
      </PagerView>
      <View style={tailwind("py-5 mb-16")}>
        <GreenButton
          containerStyle={tailwind("mb-2.5")}
          title={"Discover my Best DietCode"}
        />
        <RedButton onPress={() => setIsVisible(false)} title={"Skip for now"} />
      </View>
    </Overlay>
  )
}

function Pagination({ size, activePage }) {
  const { theme } = useTheme()

  const tailwind = useTailwind()
  return (
    <View style={tailwind("flex-row")}>
      {[...Array(size).keys()].map(index => (
        <View
          key={index}
          height={size}
          width={size}
          style={
            index === activePage
              ? tailwind("h-2 w-2 mx-1 bg-yellow rounded-full")
              : tailwind("h-2 w-2 mx-1 bg-black rounded-full")
          }
        />
      ))}
    </View>
  )
}
