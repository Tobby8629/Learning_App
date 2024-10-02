import { Alert, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, Share, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { components, courseMenu, instantFetch, newData, shareLink, template } from '@/components/utils/data';
import UseFetch from '@/components/utils/Hooks/UseFetch';
import TabHeader from '@/components/course/TabHeader';
import Tab from '@/components/course/Tab';
import SolidRoundSpinner from '@/components/Reuseables/SolidSpinner';
import ThemeText from '@/components/Reuseables/ThemeText';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import search from '../(tabs)/search';

const Course = () => { 
  const { course, cate } = useLocalSearchParams();
  const category = cate?.toString();
  const [update, setupdate] = useState<fetchData | null>(null);
  const [Loading, setLoading] = useState(false);
  const [tab, settab] = useState<keyof typeof components>("About");
  const { data, isLoading, error, refetch } = UseFetch({ params:{search: category}, query: `${cate}${course}Course` });
  const colorScheme = useColorScheme();

  const fetch = useCallback(() => {
    if (data) {
      setLoading(true);
      const updat = data.find((e: any) => e.id == course) as fetchData;
      if (updat) {
        setupdate(updat);
      }
      setLoading(false);
    }
  }, [data, course]);

  useEffect(() => {
    fetch();
  }, [fetch]);



  return (
    <View className='flex-1'>
      <StatusBar hidden={true} />
      {update?.img3 && (
        <ImageBackground
          source={{ uri: update.img3 }}
          resizeMode='cover'
          className='absolute top-0 left-0 right-0 flex-row justify-between h-[260px] px-6 pt-16'
          style={{ zIndex: -1 }} 
        />
      )}
      {isLoading || Loading ? (
        <View className='flex-1 items-center justify-center'>
          <SolidRoundSpinner className='border-green-400' />
        </View>
      ) : (
        update && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className='px-6 py-3 mt-[270px] min-h-[75vh] flex-1 w-full rounded-t-[30px] -translate-y-10' style={colorScheme === "dark" ? { backgroundColor: "black" } : { backgroundColor: "white" }}>
            <Animated.View entering={FadeInUp.duration(5000).springify()}>
              <ThemeText className='text-2xl font-monserrat-semiBold my-4'>
                {update?.title?.replace(/!/g, "")}
              </ThemeText>
              
              {update?.instructor?.[0] && (
                <View className='w-full'>
                  <Link href={`https://udemy.com/${update.instructor[0].url}`}>
                    <View className='flex-row items-center w-full'>
                      <Image
                        source={{ uri: update.instructor[0]?.image_100x100 }}
                        alt={update.instructor[0]?.name}
                        className='w-12 h-12 rounded-full mr-2'
                        resizeMode='contain'
                      />
                      <View className='w-11/12'>
                        <ThemeText className=' text-lg font-monserrat-semiBold'>{update.instructor[0]?.display_name}</ThemeText>
                        <ThemeText className=' text-sm font-monserrat-light'>{update.instructor[0]?.job_title}</ThemeText>
                      </View> 
                    </View>
                  </Link>
                  <View className='flex-row items-center justify-between my-[10px]'>
                    <ThemeText className=' text-3xl font-monserrat-semiBold my-3 ml-2'>{update.price}</ThemeText>
                    <View className=' flex-row'>
                      <View className='items-center mr-3'>
                        <FontAwesome name="heart" size={20} color= "gray" className='mr-2 mb-2'/>
                        <ThemeText className=' font-monserrat-medium text-xs capitalize'>Add to wishlist </ThemeText>
                      </View>
                      <Pressable onPress={()=> shareLink(update, update.id)} className='items-center'>
                        <FontAwesome name="share" size={20} color={"#3b82f6"} className='mr-2 mb-2 text-blue-500'/>
                        <ThemeText className=' font-monserrat-medium text-xs capitalize'> Share course </ThemeText>
                      </Pressable>
                    </View>
                  </View>
                  
                </View>
              )}
            </Animated.View>

              <TabHeader tab={tab} settab={settab} />
              <Tab data={update} id={tab} />
            </View>
          </ScrollView>
        )
      )}
    </View>
  );
};

export default React.memo(Course);
