import { SafeAreaView, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useRef } from 'react'
import Button from '@/components/Reuseables/Button'
import { router } from 'expo-router'
import LottieView from 'lottie-react-native'
import Animated, { FadeInDown, FadeInLeft, FadeInRight } from 'react-native-reanimated'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import ThemeText from '@/components/Reuseables/ThemeText'

const WelcomePage = () => {
  const animation = useRef<LottieView>(null);
  const colorScheme = useColorScheme()
  return (
    <SafeAreaView className=' h-screen'>
       <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View className='w-11/12 mx-auto items-center justify-center h-[90vh]'>
          <Animated.View entering={FadeInDown.duration(10000).springify()} style={{width: "90%"}}>
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: "100%",
                height: 350,
              }}
              resizeMode="cover"
              source={require('../assets/animation/welcome.json')}
            />
          </Animated.View>
          <Animated.View entering={FadeInLeft.duration(600).delay(200).springify()} style={{marginBottom: 30}}>
            <ThemeText className='font-barlow-bold text-5xl text-center leading-[50px] mb-3' colorScheme={colorScheme}>
              Discover And Improve Your Skills
            </ThemeText>
           
            <ThemeText colorScheme={colorScheme} className=' font-barlow-medium text-xl text-center'> Learn from the best courses and tutorials  🚀 </ThemeText>
          </Animated.View>
          <Animated.View entering={FadeInRight.duration(600).delay(400).springify()} style={{width: "100%"}}>
            <Button btnText='Get start' action={()=> router.push('/(tabs)')}></Button>
          </Animated.View>
        </View>
        </ThemeProvider>
    </SafeAreaView>
  )
}

export default WelcomePage
