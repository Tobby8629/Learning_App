import { SafeAreaView, ScrollView } from 'react-native';
import { View } from '@/components/Themed';
import Header from '@/components/Home/Header';
import { StatusBar } from 'expo-status-bar';
import { StatusBarBackground } from '@/components/utils/StatusBarBackground';
import Categories from '@/components/Home/Categories';
import { useContext, useEffect, useState } from 'react';
import Sections from '@/components/Home/Sections';
import SolidRoundSpinner from '@/components/Reuseables/SolidSpinner';
import { CourseContext } from '@/components/course/Context';

export default function TabOneScreen() {
  const [updatedData, setupdatedData] = useState<fetchData[]>([])
  const [secondData, setsecondData] = useState<fetchData[]>([])
  const {data, isLoading, error} = useContext(CourseContext)


  useEffect(()=>{
    if(data){
      setupdatedData(data.results.slice(0, 6))
      setsecondData(data.results.slice(6,12))
    }
  },[data])
  
  return (
    <StatusBarBackground>
      <StatusBar backgroundColor='#86efac' style='dark'/>
      <SafeAreaView className='h-full'>
        <View className= 'w-full min-h-[90vh] mx-auto'>
          <Header />
          {
            isLoading ? 
            <View className=' flex-1 items-center justify-center'>
              <SolidRoundSpinner className='border-green-400' /> 
            </View>:
            <ScrollView className='px-8 mb-52' showsVerticalScrollIndicator={false}>
              <Categories />
              <Sections data={updatedData} headerText='recommended for you' route="recommend" cate=''/>
              <Sections data={secondData} headerText='Popular courses' route="popular" cate=''/>
            </ScrollView>   
          } 
        </View>
      </SafeAreaView>
      {/* {loading ? <Logout /> : null} */}
    </StatusBarBackground>
  
  );
}

