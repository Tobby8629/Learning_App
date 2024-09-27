import { Alert, Image, Pressable, SafeAreaView, ScrollView, Share, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { components, courseMenu, instantFetch, newData, shareLink, template } from '@/components/utils/data'
import SolidRoundSpinner from '@/components/Reuseables/SolidSpinner'
import ThemeText from '@/components/Reuseables/ThemeText'
import Tab from '@/components/course/Tab'
import TabHeader from '@/components/course/TabHeader'

const Course = () => { 
  const { course } = useLocalSearchParams()
  const [update, setupdate] = useState<fetchData>(template);
  const [tab, settab] = useState<keyof typeof components>("About")
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fetchCourse", course],
    queryFn: () => instantFetch(`/courses`) 
  });
  const colorScheme = useColorScheme()

  useEffect(() => {
    if (data && data.results) {
      const update = newData(data.results).find((e: any) => e.id == course) as fetchData;
      setupdate(update);
    }
  }, [data]);

  return (
    <SafeAreaView className='h-full'>
      <View className='flex-row justify-between px-6 py-3'>
        <Pressable onPress={() => router.back()}>
          <FontAwesome5 name="arrow-left" size={20} color={colorScheme === "dark" ? "#86efac" : "#374151"}/>
        </Pressable>
        <TouchableOpacity onPress={() => shareLink(update, course)}>
          <FontAwesome5 name="share" size={20} color={colorScheme === "dark" ? "#86efac" : "#374151"}/>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View className='flex-1 items-center justify-center'>
          <SolidRoundSpinner className='border-green-400'/>
        </View>
      ) : (
        <ScrollView className='px-6 my-5 flex-1'> 
          <View>
            {
              update.url !== "" && 
              <Image 
              source={{ uri: update?.img3 }}
              className='w-full h-64 rounded-lg'  
            />
            }
            
            <ThemeText className='text-2xl font-monserrat-semiBold my-4'>
              {update?.title.replace(/!/g, "")}
            </ThemeText>
          </View>
          <TabHeader tab={tab} settab={settab}/>
          <Tab data={update} id={tab} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default Course;

