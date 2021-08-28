import { Controller } from "react-hook-form"
import { Platform, TextInput } from "react-native"
import { Shadow } from "react-native-neomorph-shadows"
import React, { forwardRef, useEffect, useRef, useState } from "react"
import useTailwind from "../hooks/useTailwind"
import Visibility from "../assets/visibility.svg"
import { Button } from "react-native-elements"
import VisibilityFilled from "../assets/visibility-filled.svg"

const Input = forwardRef((props, ref) => {
  const tailwind = useTailwind()
  // const inputRef = useRef()
  // useEffect(() => {
  //   inputRef.current.setNativeProps({
  //     style: tailwind("font-barlow-medium")
  //   })
  // }, [tailwind])
  return (
    <TextInput
      style={tailwind("px-7 text-base font-barlow-medium leading-5")}
      placeholderTextColor={"#2B2B2B"}
      ref={ref}
      {...props}
    />
  )
})

export function InputContainer({ style, children }) {
  const tailwind = useTailwind()
  return (
    <Shadow
      inner={Platform.OS === "android"}
      style={{
        ...tailwind(
          "relative w-input h-14 rounded-input border-gray border bg-white shadow-input justify-center"
        ),
        ...style
      }}
    >
      {children}
    </Shadow>
  )
}

export function PlainInput({ control, containerStyle, name, ...props }) {
  return (
    <InputContainer style={containerStyle}>
      <Controller
        control={control}
        name={name}
        render={({ field: { ref, onChange, value } }) => (
          <Input ref={ref} onChangeText={onChange} value={value} {...props} />
        )}
      />
    </InputContainer>
  )
}

export function PasswordInput({ control, containerStyle, name, ...props }) {
  const tailwind = useTailwind()
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, onChange, value } }) => (
        <InputContainer style={containerStyle}>
          <Input
            secureTextEntry={secureTextEntry}
            ref={ref}
            value={value}
            onChangeText={onChange}
            {...props}
          />
          <Button
            containerStyle={tailwind("absolute right-2")}
            buttonStyle={tailwind("bg-transparent")}
            title={secureTextEntry ? <Visibility /> : <VisibilityFilled />}
            onPress={() => setSecureTextEntry(prevState => !prevState)}
          />
        </InputContainer>
      )}
    />
  )
}

export function OTPInput({ control, index, setFocus, setValue, totalLength }) {
  function prevInput() {
    if (index !== 0) {
      setFocus(String(index - 1))
    }
  }
  function nextInput() {
    if (index < totalLength - 1) {
      setFocus(String(index + 1))
    }
  }
  const tailwind = useTailwind()
  const [focused, setFocused] = useState(false)
  return (
    <Controller
      control={control}
      name={String(index)}
      render={({ field: { onChange, ref, value } }) => (
        <TextInput
          style={[
            tailwind("w-1/5 text-center border-b-4 text-4xl"),
            tailwind(focused ? "border-green" : "border-gray-light"),
            { lineHeight: 48 }
          ]}
          onChangeText={val => {
            if (val.length === 1 && val.match(/[0-9]/)) {
              onChange(val)
              nextInput()
            } else if (
              val.length === totalLength + (value?.length || 0) &&
              val.match(/\d{4}/)
            ) {
              setTimeout(() => {
                val
                  .slice(value?.length || 0)
                  .split("")
                  .map((num, i) => {
                    setValue(String(i), num)
                  })
              }, 100)
              setFocus("password")
            } else {
              onChange("")
            }
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace") {
              if (value) {
                onChange("")
              } else {
                prevInput()
              }
            }
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          ref={ref}
          value={value}
        />
      )}
    />
  )
}

12345
