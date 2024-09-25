import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome6, Octicons } from '@expo/vector-icons'

const SearchInput = () => {
  const [search, setSearch] = useState('') 
  return (
    <View className=' my-6 bg-[#ffffff1a] flex-row items-center gap-2 rounded-lg px-4 h-[50px] w-full border-[.3px] border-gray-[#8080806b]'>
      <View className=' mr-'>
        <Octicons name='search' size={17} />
      </View>
      <TextInput
        value={search}
        placeholder='what do you want to learn ?'
        placeholderTextColor="#808080b8" 
        onChangeText={(value)=> setSearch(value)}
        className='w-full'
      />
    </View>
  )
}

export default SearchInput

const styles = StyleSheet.create({})