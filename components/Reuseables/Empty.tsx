import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'
import LottieView from 'lottie-react-native'

const Empty = () => {
  const animation = useRef(null)
  return (
    <Animated.View entering={FadeInDown.duration(10000).springify()}>
      <LottieView
      autoPlay
      ref={animation}
      style={{
          width: "80%",
          marginHorizontal: "auto",
          height: 150,
          marginBottom: 10
      }}
      resizeMode="cover"
      source={require('../../assets/animation/not_found.json')}
      />
    </Animated.View>
  )
}

export default Empty

const styles = StyleSheet.create({})