import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Header from '@/components/Home/Header';
import { StatusBar } from 'expo-status-bar';
import { StatusBarBackground } from '@/components/utils/StatusBarBackground';
import Categories from '@/components/Home/Categories';
import { useEffect, useState } from 'react';
import { instantFetch, newData } from '@/components/utils/data';
import { useQuery } from '@tanstack/react-query';
import Sections from '@/components/Home/Sections';
import SolidRoundSpinner from '@/components/Reuseables/SolidSpinner';

export default function TabOneScreen() {
  const [updatedData, setupdatedData] = useState<fetchData[]>([])
  const [secondData, setsecondData] = useState<fetchData[]>([])

  const {data, isLoading, error, refetch} = useQuery({
    queryKey: ["searchCourse"],
    queryFn: () => instantFetch("/courses"),
    enabled: true
  })

  useEffect(()=>{
    if(data){
      setupdatedData(newData(data.results).slice(0, 6))
      setsecondData(newData(data.results).slice(6,12))
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
              <Sections data={updatedData} headerText='recommended for you' route="recommend"/>
              <Sections data={secondData} headerText='Popular courses' route="popular"/>
            </ScrollView>   
          } 
        </View>
      </SafeAreaView>
    </StatusBarBackground>
  
  );
}




{/* <FlatList
  data={updatedData}
  keyExtractor={(e)=>e.id}
  renderItem={(e) => <Index data={e.item}/>}
  ListHeaderComponent={()=>(
    <View className='px-8 w-full border-[1px]'>
      <Categories />
    </View>
  )}
  horizontal
  showsHorizontalScrollIndicator={false}
/>     */}
 
