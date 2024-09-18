import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

const Greeting = () => {
  const getdate = new Date()
  const [gethour, setgethour] = useState(getdate.getHours())

  const getGreeting = useCallback(() => {
    if (gethour >= 0 && gethour < 12) {
      return { greeting: "Good Morning", emoji: "☁️"};
    } else if (gethour >= 12 && gethour < 18) {
      return { greeting: "Good Afternoon", emoji: "🌤️"};
    } else {
      return { greeting: "Good Evening", emoji: "🌕"};
    }
    
  }, [gethour]);

  useEffect(()=>{
    const interval = setInterval(() => {
      const newHours = new Date().getHours();
      if (newHours !== gethour) {
        setgethour(newHours);
      }
    }, 1000);
    return () => clearInterval(interval)
  },[gethour])

  return (
    <View className=' flex-row items-center'>
      <Text className=' font-barlow-light text-xl text-gray-700 mr-1'>{getGreeting().greeting}</Text>
      <Text className=' text-[25px]'>{getGreeting().emoji}</Text>
    </View>
  )
}

export default React.memo(Greeting)



