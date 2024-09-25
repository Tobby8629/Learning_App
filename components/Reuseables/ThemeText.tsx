import { ColorSchemeName, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { ReactNode } from 'react'
import { DarkTheme } from '@react-navigation/native'

interface text {
  className?: string
  children?: ReactNode
}

const ThemeText = ({className, children}: text) => {
  const colorScheme = useColorScheme()
  return (
    <Text className={`${colorScheme === 'dark' ? "text-white" : "text-gray-700"} ${className}`}>{children}</Text>
  )
}

export default ThemeText

const styles = StyleSheet.create({})