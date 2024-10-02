import { ColorSchemeName, StyleProp, StyleSheet, Text, TextStyle, useColorScheme, View } from 'react-native'
import React, { ReactNode } from 'react'
import { DarkTheme } from '@react-navigation/native'

interface text {
  className?: string
  children?: ReactNode
  style?: StyleProp<TextStyle>
}

const ThemeText = ({className, children, style}: text) => {
  const colorScheme = useColorScheme()
  return (
    <Text style={style} className={`${colorScheme === 'dark' ? "text-white" : "text-gray-700"} ${className}`}>{children}</Text>
  )
}

export default ThemeText

const styles = StyleSheet.create({})