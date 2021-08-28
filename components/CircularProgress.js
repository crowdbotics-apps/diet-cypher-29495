import { Circle } from "react-native-svg"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import React from "react"
import { useWindowDimensions } from "react-native"

export default function CircularProgress({ children, ...props }) {
  return (
    <AnimatedCircularProgress
      width={12}
      arcSweepAngle={250}
      rotation={235}
      lineCap={"round"}
      backgroundColor="#EEF5F7"
      renderCap={({ center }) => (
        <Circle cx={center.x} cy={center.y} r="5" fill="white" />
      )}
      {...props}
    >
      {() => children}
    </AnimatedCircularProgress>
  )
}
