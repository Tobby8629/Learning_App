import { Image, ImageBackground, Pressable, useColorScheme, View } from 'react-native';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import { CheckList, components, globally, shareLink, updateCheckList } from '@/components/utils/data';
import UseFetch from '@/components/utils/Hooks/UseFetch';
import TabHeader from '@/components/course/TabHeader';
import Tab from '@/components/course/Tab';
import SolidRoundSpinner from '@/components/Reuseables/SolidSpinner';
import ThemeText from '@/components/Reuseables/ThemeText';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInUp, useAnimatedRef } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/Reuseables/ParallaxScrollView';
import { transform } from '@babel/core';
import UseFetchLesson from '@/components/utils/Hooks/UseFetchLesson';
import { globalContext } from '@/context/Globalcontext';

const Course = () => { 
  const { course, cate, page, pagesize } = useLocalSearchParams();
  // const category = cate?.toString();
  const [update, setUpdate] = useState<fetchData | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<keyof typeof components>("Lesson")
  const {user, check, loading: isLoad} = useContext(globalContext) as globally

  const {data, refetch, isLoading } = UseFetchLesson(
    {
      query: `${course}Course`, 
      more: `${course}`,
   }
  )
  const colorScheme = useColorScheme();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();


  useEffect(() => {
    if(data){
      setUpdate({
      headline: data?.headline,
      id: data.id,
      img1: data.image_125_H,
      img2: data.image_240x135,
      img3: data.image_480x270,
      published_title: data.published_title,
      title: data.title,
      instructor: data.visible_instructors,
      price: data.price,
      url: data.url,
      is_paid: data.is_paid,
      tracking_id: data.tracking_id,
      locale: {
        title: data.locale.title,
        english_title: data.locale.english_title,
        simple_english_title: data.locale.simple_english_title
      },
      subtitle: data.subtitle || null,  // 'subtitle' doesn't exist in the original data
      num_reviews: data.num_review || null,  // 'num_review' doesn't exist in the original data
      image_240x13: data.image_240x13 || null  
      })
    }
  }, [data]);

  const InstructorInfo = useMemo(() => {
    return update?.instructor?.[0] ? (
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
              <ThemeText className=' text-lg font-monserrat-semiBold'>
                {update.instructor[0]?.display_name}
              </ThemeText>
              <ThemeText className=' text-sm font-monserrat-light'>
                {update.instructor[0]?.job_title}
              </ThemeText>
            </View>
          </View>
        </Link>
        <View className='flex-row items-center justify-between my-[10px]'>
          <ThemeText className=' text-3xl font-monserrat-semiBold my-3 ml-2'>
            {update.price}
          </ThemeText>
          <View className='flex-row'>
            {
              isLoad ? <SolidRoundSpinner className='border-green-400 w-7 h-7' /> :
              <Pressable onPress={()=> updateCheckList(data, user, check)} className='items-center mr-3'>
                <FontAwesome name="heart" size={20} color={CheckList(update.id, user) ? "red": "gray"} />
                <ThemeText className='font-monserrat-medium text-xs capitalize'>
                  {CheckList(update.id, user) ? "Remove from wishlist" : "Add to wishlist"}
                </ThemeText>
              </Pressable>
            }
            <Pressable
              onPress={() => shareLink(update, update.id)}
              className='items-center'>
              <FontAwesome name="share" size={20} color="#3b82f6" />
              <ThemeText className='font-monserrat-medium text-xs capitalize'>
                Share course
              </ThemeText>
            </Pressable>
          </View>
        </View>
      </View>
    ) : null;
  }, [update, check]);

  return (
      <View className='flex-1'>
        <StatusBar hidden={true} />
        {update?.img3 && 
        <ParallaxScrollView headerImageUri={update.img3}>
          { !data || loading ? (
            <View className='flex-1 items-center justify-center'>
              <SolidRoundSpinner className='border-green-400' />
            </View>
          ) : (
            update && (
              <Animated.ScrollView
                ref={scrollRef}
                showsVerticalScrollIndicator={false}>
                <View
                  className='px-6 py-3 min-h-[80vh] flex-1 w-full rounded-t-[30px]'
                  style={[
                    colorScheme === 'dark'
                      ? { backgroundColor: 'black' }
                      : { backgroundColor: 'white' },
                      // {transform: [{ translateY: -40 }]}
                  ]}>
                  <Animated.View entering={FadeInUp.duration(5000).springify()}>
                    <ThemeText className='text-2xl font-monserrat-semiBold my-4'>
                      {update?.title?.replace(/!/g, '')}
                    </ThemeText>
                    {InstructorInfo}
                  </Animated.View>

                  <TabHeader tab={tab} settab={setTab} />
                  <Tab data={update} id={tab} />
                </View>
              </Animated.ScrollView>
            )
          )}
        </ParallaxScrollView>
        }
      </View>
  );
};

export default React.memo(Course);


