import { Alert, FlatList, Keyboard, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Input from '@/components/Reuseables/Input'
import Button from '@/components/Reuseables/Button'
import ThemeText from '@/components/Reuseables/ThemeText'
import LottieView from 'lottie-react-native'
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInUp } from 'react-native-reanimated'
import UseFetch from '@/components/utils/Hooks/UseFetch'
import { newData } from '@/components/utils/data'
import Card from '@/components/Reuseables/Card'
import SolidRoundSpinner from '@/components/Reuseables/SolidSpinner'
import Empty from '@/components/Reuseables/Empty'

interface searchInterface {
  total: string | undefined
  courses: fetchData[] | undefined
}

const search = () => {
  const [value, setvalue] = useState("")
  const animation = useRef<LottieView>(null);
  const [isLoading, setisLoading] = useState(false)
  const [Istying, setIstying] = useState(false)
  const [courses, setcourses] = useState<searchInterface>()
  const handleChange = (val: string) => {
    setvalue(val)
    if(value.length < 1){
      setIstying(true)
    }
  }

  const {data: searchData, error, refetch} = UseFetch({
    query: "searchCourses",
    params:{search: value}
  })

  const Search = async () => {
    setIstying(false)
    Keyboard.dismiss()
    if (value === "") {
      Alert.alert("Wrong Input", "Can't search with an empty input")
      return
    }
    setisLoading(true)
    await refetch()
  }

  useEffect(()=>{
    if(searchData && searchData.results){
      setcourses({total: searchData?.total, courses: searchData?.results})
      setisLoading(false)
    }
  },[searchData])

  const renderItem = useCallback(({ item, index }: any) => {
    return (
      <Animated.View entering={FadeInDown.delay(index * 200).duration(3000).springify()}>
        <Card data={item} cate='courses' wrapperStyle='w-[95%] mx-auto my-3' />
      </Animated.View>
    
  )
  }, [courses])
  

  return (
   <SafeAreaView>
    <View className='flex-1 p-5 min-h-screen pb-32'>
      <View className='w-full border-[1.5px] border-gray-600 h-16 rounded-2xl flex-row'>
        <View className='w-9/12 pl-3'>
          <Input 
            val={value}
            placeholder='Search for a course'
            id="input"
            handlechange={(val)=>handleChange(val)}
          />
        </View>
        
        <View className='w-3/12'>
          <Button
            btnText='Search'
            textStyle='text-base'
            btnStyle=' w-full h-full h-16 rounded-r-2xl'
            action={() => Search()}
          />
        </View>

      </View>

      {
        value === "" || Istying ?
          <Animated.View entering={FadeInDown.duration(10000).springify()} className='justify-center items-center h-4/6'>
            <LottieView
            autoPlay
            ref={animation}
            style={{
              width: "70%",
              marginHorizontal: "auto",
              height: 150,
              marginBottom: 10
            }}
            resizeMode="contain"
            source={require('../../assets/animation/search.json')}
          />
          <ThemeText className='text-xl my-1 font-monserrat-semiBold'>Looking for a course to start your learning?</ThemeText>
          <ThemeText className='text-lg font-monserrat-medium'>Search above to find it!</ThemeText>
         </Animated.View>:
        <Animated.View entering={FadeInLeft.duration(2000).springify()} className='w-full items-center py-5 flex-1'>
          {isLoading ? 
            <View className='flex-1 items-center justify-center'>
              <SolidRoundSpinner className='border-green-400' />
            </View> :
            <FlatList
              data={courses?.courses}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem} 
              showsVerticalScrollIndicator={false}
              initialNumToRender={10} 
              windowSize={5}
              ListEmptyComponent={()=>(
                <View className='flex-1 h-[60vh] justify-center'>
                  <Empty />
                  <ThemeText className='text-center font-monserrat-semiBold text-xl'>Couldn't find course or tutor <ThemeText className='font-monserrat-bold text-2xl'>{value}</ThemeText></ThemeText>
                  <ThemeText className='text-center my-2 font-monserrat-medium text-lg'>Try searching another course or tutor</ThemeText>
                </View>
                
              )}
            />
            }
        </Animated.View>
 
        }
    </View>
      
   </SafeAreaView>
  )
}

export default search
