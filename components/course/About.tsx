import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemeText from '../Reuseables/ThemeText'

const About = ({data}: {data:fetchData}) => {
  return (
    <View>
      <ThemeText className=' font-monserrat-semiBold text-2xl mb-2 '>Descriptions</ThemeText>
      <ThemeText className=' font-monserrat-medium leading-7'>{data.headline.replace(/!/g, "")}.</ThemeText>
    </View>
  )
}

export default React.memo(About)

const styles = StyleSheet.create({})