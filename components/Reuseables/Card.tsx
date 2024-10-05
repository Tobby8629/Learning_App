import React from 'react'
import Sections from '@/components/Home/Sections';
import { Image, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import ThemeText from './ThemeText';
import { Octicons } from '@expo/vector-icons';
import { random } from '../utils/data';
import { Link, router } from 'expo-router';

 const Card = ({data, cate, wrapperStyle, page, pagesize}: index) => {
  const colorscheme = useColorScheme()
  const instructor = data.instructor[0]
  const goToDetails = (id:string) => {
    router.push({
      pathname: "/course/[course]",
      params: { course: id,  cate: cate, page: page, pagesize: pagesize },
    });
  };
  return (
    <TouchableOpacity onPress={()=> goToDetails(data.id)} key={data.id} className={`mr-4 w-[280px] p-3 rounded-md ${colorscheme === 'light' ? "bg-gray-50":"bg-gray-700"} ${wrapperStyle}`}>
      <Image 
        source={{uri: data.img3}}
        alt={data.title}
        className="h-48 rounded-lg"             
      />
      <ThemeText className='mt-3 font-monserrat-semiBold text-base leading-6 h-16'>{data.title}</ThemeText>
      <View className='flex-row justify-between'>
        <View className='flex-row items-center'>
          <ThemeText className=' font-monserrat-semiBold'>{data.price}</ThemeText>
          <Octicons name="heart-fill" color="red" size={20} style={{marginHorizontal: 5}}/>
        </View>
        <Link href={`https://www.udemy.com${instructor?.url}`}>
          <View className='flex-row items-center'>
            <Image 
                source={{uri:instructor?.image_100x100}}
                className='w-9 h-9 rounded-full mx-[6px]'
            />
            <ThemeText className=' text-sm font-monserrat-semiBold font-bold'>{instructor?.name}</ThemeText>
          </View>
        </Link>
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(Card)
