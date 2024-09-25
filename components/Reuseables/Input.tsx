import { KeyboardTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { FontAwesome6 } from '@expo/vector-icons'

interface input {
  id: string,
  handlechange: (id:string, value:string) => void
  keyboardtype?: KeyboardTypeOptions
  val: string
  className?: string,
  placeholder: string,
  name?: string,
}

const Input = ({id, handlechange, name, placeholder, keyboardtype, val, className}:input) => {
  const [show, setShow] = useState(true)
  const checkpasswowrd = name?.includes("password")
  const toggleShow = ()=>{
    setShow(!show)
  }
   return (
    <View  className='w-full h-full flex-row items-center p-2 '>
      <TextInput 
        value={val}
        onChangeText={(value) => handlechange(id,value)}
        placeholder={placeholder}
        keyboardType={keyboardtype}
        secureTextEntry={checkpasswowrd ? show || false : undefined}
        className={`w-11/12 h-full ${className}`}
        
      />
      {name?.includes("password") && 
       <TouchableOpacity onPress={toggleShow} className='w-1/12'>
        <FontAwesome6 name= {show ? "eye-slash" : "eye"} size={15} /> 
       </TouchableOpacity> 
      }
    </View>
  )
}

export default React.memo(Input)
