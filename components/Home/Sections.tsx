import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { Card } from '../Reuseables/Card';
import ThemeText from '../Reuseables/ThemeText';

interface SectionProps {
    data: fetchData[];
    headerText: string;
    route?: string
}

const Sections = ({data, headerText, route}: SectionProps) => {
  return (
    <View className='my-5'>
      <View className=' flex-row justify-between my-4 items-center'> 
        <ThemeText className=' capitalize font-monserrat-bold text-gray-800 text-xl'>{headerText}</ThemeText>
        <TouchableOpacity onPress={()=>router.push(`/course/${route}`)}>
            <ThemeText className=' text-base font-monserrat-semiBold text-green-400'>See More</ThemeText>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} className='w-full' showsHorizontalScrollIndicator={false}>
        {data.map((e)=>(
          <Card data={e} key={e.id}/>
        ))}
      </ScrollView>
    </View>
  )
}

export default Sections

const styles = StyleSheet.create({})