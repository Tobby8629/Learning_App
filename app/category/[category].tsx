import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const category = () => {
  const {category} = useLocalSearchParams()
  return (
    <View>
      <Text>category</Text>
    </View>
  )
}

export default category

const styles = StyleSheet.create({})