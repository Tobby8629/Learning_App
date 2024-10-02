import { Pressable, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { components, courseMenu } from '../utils/data'

interface tabheader {
  tab: keyof typeof  components,
  settab: React.Dispatch<React.SetStateAction<keyof typeof components>>
}

const TabHeader = ({tab, settab}: tabheader) => {
  const colorScheme = useColorScheme()
  const check = colorScheme === "dark"
  return (
  <View 
    style = {[check ? {backgroundColor:"#86efac"} : {backgroundColor:"#ffffffa3"}]}
    className={`mb-3 flex-row justify-between p-1 rounded-lg`}
  >
    {courseMenu.map((e,index)=>(
      <Pressable onPress={()=> settab(e.id)} key={e.name} style={[e.id === tab  ? { backgroundColor: '#e7e6e6ab', transform: [{ scaleX: 1.04 }], zIndex: 99} : {}, {borderRadius: e.id === tab ? 8 : 0}]} className="py-3 w-1/3" >
        <View 
         style={[{borderRightWidth: index === courseMenu.length - 1 ? 0 : 2},]}
         className={`py-1 border-r-2 border-[#e7e6e6ab] last:border-0`}>
          <Text 
          style={[e.id === tab ? {color: "#374151"} : {color: "#9ca3af"}]}
          className='text-gray-700 text-center font-monserrat-semiBold'>{e.name}</Text>
        </View>
      </Pressable>
    ))} 
  </View>
    )
}

export default React.memo(TabHeader)




