import { FlatList, Pressable, ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import ThemeText from './ThemeText'
import Animated, { FadeInUp, scrollTo } from 'react-native-reanimated'
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesome } from '@expo/vector-icons'
import { swish } from '../utils/data'
import { useCourse } from '../course/Context'
import { AnimatedScrollView } from 'react-native-reanimated/lib/typescript/reanimated2/component/ScrollView'


interface pagination {
  total: number,
  page: string,
  setpage: React.Dispatch<SetStateAction<string>>
  scrollType: "flatlist" | "scrollView"
}

const Pagination = ({ total, page, setpage, scrollType }: pagination) => {
  const data = total && Array.from({ length: total }, (_, index) => ({ value: index + 1 }));

  const switchtab = (e: keyof typeof swish) => {
    e === "prev" ? setpage((parseInt(page, 10) - 1).toString()) :
    setpage((parseInt(page, 10) + 1).toString())
  }
  
  const colorscheme = useColorScheme()

 
  // useEffect(() => {
  //   const scrollToTop = () => {
  //     if (!scrollRef.current) return;
  //     setTimeout(() => {
  //       if (scrollType === "scrollView") {
  //         (scrollRef.current as AnimatedScrollView).scrollTo({
  //           y: 0,
  //           animated: true,
  //         });
  //       } else {
  //         (scrollRef.current as FlatList).scrollToOffset({
  //           offset: 0,
  //           animated: true,
  //         });
  //       }
  //     }, 2000);
     
  //   };
  
  //   scrollToTop();
  // }, [page, scrollType, scrollRef]);
  

  return (
    <>
      {total ? (
        <View>
          <View className='mt-5 flex-row items-center justify-between'>
            <View className='my-3 flex-row items-center'>
              <ThemeText>page</ThemeText>
              <TouchableOpacity
                className='py-2 border-[1px] mx-3 h-10 border-green-400 w-32'
              >
                <Animated.View key="viewTrue" entering={FadeInUp.duration(1000).springify()} className="w-full">
                  <SelectDropdown
                    data={data ? data : []}
                    onSelect={(selectedItem) => {
                      setpage(selectedItem.value)
                    }}
                    dropdownStyle={styles.dropdownMenuStyle}
                    showsVerticalScrollIndicator={false}
                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View className='flex-row w-full p-1 px-2 h-full justify-between'>
                          <ThemeText>{page}</ThemeText>
                          <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} />
                        </View>
                      );
                    }}
                    renderItem={(item) => {
                      return (
                        <View className='p-2 w-full'>
                          <ThemeText>{item.value}</ThemeText>
                        </View>
                      );
                    }}
                  />
                </Animated.View>
              </TouchableOpacity>
              <ThemeText> of {total}</ThemeText>
            </View>
            <View className='flex-row justify-end items-center w-28'>
              {parseInt(page, 10) > 1 ? (
                <Pressable onPress={() => switchtab("prev")} className='items-center'>
                  <FontAwesome name="angle-double-left" size={23} color={"#4ade80"} />
                  <ThemeText className='mt-1'>Prev</ThemeText>
                </Pressable>
              ) : null}
              {parseInt(page, 10) < total ? (
                <Pressable onPress={() => switchtab("next")} className='items-center ml-8'>
                  <FontAwesome name="angle-double-right" size={23} color={"#4ade80"} />
                  <ThemeText className='mt-1'>Next</ThemeText>
                </Pressable>
              ) : null}
            </View>
          </View>
        </View>
      ) : <ThemeText>This why L'm not showing</ThemeText>}
    </>
  )
}

export default React.memo(Pagination)

const styles = StyleSheet.create({
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    marginTop: 10
  },
})

























// import { Pressable, ScrollView,  StyleSheet, TouchableOpacity, View } from 'react-native'
// import React, { SetStateAction, useCallback, useRef, useState } from 'react'
// import ThemeText from './ThemeText'
// import Animated, { FadeInUp } from 'react-native-reanimated'
// import SelectDropdown from 'react-native-select-dropdown'
// import { FontAwesome } from '@expo/vector-icons'
// import { swish } from '../utils/data'

// interface pagination {
//   total: number,
//   page: string,
//   setpage: React.Dispatch<SetStateAction<string>>
// }


// const Pagination = ({ total, page, setpage }: pagination) => {
//   const data = total && Array.from({ length: total }, (_, index) => ({ value: index + 1 }));
//   const scroll = useRef<ScrollView | null>(null)

//   const switchtab = async (e: keyof typeof swish) => {
//     e === "prev" ? setpage((parseInt(page,10) - 1).toString()) :
//     setpage((parseInt(page,10) + 1).toString())
//   }

//   const scrollUp = useCallback(()=>{
//     setTimeout(() => {
//       if(scroll.current){
//         scroll.current.scrollTo({y: 0, animated: true})
//       }
//     }, 1000);   
//   },[page])

//   scrollUp()

//   return (
//     <>
//       {total ? (
//         <ScrollView ref={scroll}>
//           <View className='mt-5 flex-row items-center justify-between'> 
//           <View className='my-3 flex-row items-center'>
//             <ThemeText>page {page}</ThemeText>
//             <TouchableOpacity
//               className= 'py-2 border-[1px] mx-3 h-10 border-green-400 w-32'
//             >
//               <Animated.View entering={FadeInUp.duration(1000).springify()} className="w-full">
//                 <SelectDropdown
//                   data={data ? data : []}
//                     onSelect={(selectedItem, index) => {
//                       setpage(selectedItem.value)
//                     }}
//                     dropdownStyle={styles.dropdownMenuStyle}
//                     showsVerticalScrollIndicator={false}
//                     renderButton={(selectedItem, isOpened) => {
//                     return (
//                       <View className='flex-row w-full p-1 px-2 h-full justify-between'>
//                         <ThemeText>
//                           {page}
//                         </ThemeText>
//                         <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} />
//                       </View>
//                     );
//                   }}
//                   renderItem={(item, index, isSelected) => {
//                     return (
//                       <View className='p-2 w-full'>
//                         <ThemeText>{item.value}</ThemeText>
//                       </View>
//                     );
//                   }}
//                 />
//               </Animated.View>
              
//             </TouchableOpacity>
//             <ThemeText> of {total}</ThemeText>
//           </View>
//           <View className=' flex-row justify-between w-28'>
//             {
//               parseInt(page, 10) <= 1 ? null : 
//               <Pressable onPress={()=> switchtab("prev")} className='items-center'>
//                 <FontAwesome name="angle-double-left" size={23} />
//                 <ThemeText className='mt-1'>Prev</ThemeText>
//               </Pressable>
//             }

//           {
//             parseInt(page, 10) >= 1 &&
//             <Pressable onPress={()=>switchtab("next") } className='items-center'>
//               <FontAwesome name="angle-double-right" size={23}/>
//               <ThemeText className='mt-1'>Next</ThemeText>
//             </Pressable>
//           }
//           </View>
//           </View>
//         </ScrollView>
//       ) : null}
//     </>
//   )
// }

// export default React.memo(Pagination)

// const styles = StyleSheet.create({
//   dropdownMenuStyle: {
//     backgroundColor: '#E9ECEF',
//     borderRadius: 8,
//     width: 128,
//     bottom: 0
//   },
// })



// // interface dropinter {
// //   data: {value: number}[]
// // }

// // export const Drop = ({data}: dropinter) => {
// //   return (
// //     <SelectDropdown
// //       data={data}
// //       onSelect={(selectedItem, index) => {
        
// //       }}
// //       showsVerticalScrollIndicator={false}
// //       renderButton={(selectedItem, isOpened) => {
// //       return (
// //         <View>
// //           <Text>
// //             {selectedItem && selectedItem.value}
// //           </Text>
// //           <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} />
// //         </View>
// //       );
// //     }}
// //     renderItem={(item, index, isSelected) => {
// //       return (
// //         <View>
// //           <Text>{item.value}</Text>
// //         </View>
// //       );
// //     }}
// //   />
// //   )
// // }



// // renderButton={(selectedItem, isOpened) => {
// //   return (
// //     <View>
// //       {selectedItem && (
// //         <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
// //       )}
// //       <Text style={styles.dropdownButtonTxtStyle}>
// //         {(selectedItem && selectedItem.title) || 'Select your mood'}
// //       </Text>
// //       <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
// //     </View>
// //   );
// // }}
// // renderItem={(item, index, isSelected) => {
// //   return (
// //     <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
// //       <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
// //       <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
// //     </View>
// //   );
// // }