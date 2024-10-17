import { SafeAreaView, StyleSheet, Text, View, KeyboardTypeOptions, Alert, TouchableOpacity, ScrollView, useColorScheme } from 'react-native'
import React, { useCallback, useState } from 'react'
import Input from '@/components/Reuseables/Input'
import Button from '@/components/Reuseables/Button'
import { Register } from '@/lib/Auth'
import ThemeText from '@/components/Reuseables/ThemeText'
import { Link, router } from 'expo-router'

const signUp = () => {
  const [regData, setregData] = useState({email:"", password:"", username: "", confirm_password: ""})
  const [isLoading, setisLoading] = useState(false)

  const form = [
    {
      id: "username",
      name:"username",
      val: regData.username,
      placeholder: "Enter username",
      keyboard: "default"
    },
    {
      id: "email",
      name:"email",
      val: regData.email,
      placeholder: " Enter a valid email",
      keyboard: "email-address"
    },
    {
      id: "password",
      name:"password",
      placeholder: "Enter your password",
      val: regData.password,
    },
    {
      id: "confirm_password",
      name:"confirm password",
      placeholder: "confirm your password",
      val: regData.confirm_password,
    },
  ]
  
  const handleInputchange = (val:string, id:string) => {
    setregData({...regData, [id]: val})
  }
  const handlesubmit = async () => {
    setisLoading(true)
    const {email, password, username, confirm_password} = regData
    if(email === "" || password === "" || username === "" || confirm_password === "") {
      Alert.alert("Fill all input field")
      setisLoading(false)
      return
    }

    if (confirm_password !== password){
      Alert.alert("You entered incorrect password")
      setisLoading(false)
      return
    }
    try {
      await Register(regData).then(()=>router.replace("/(tabs)/"))
    }
    catch(err:any) {
      Alert.alert("Error", err.message)
    }
    finally {
      setisLoading(false)
    }    
  }

  const getKeyboardType = (keyboard: string): KeyboardTypeOptions => {
    switch(keyboard) {
      case 'email-address':
        return 'email-address';
      case 'visible-password':
        return 'visible-password';  
      default:
        return 'default';
    }
  };


  return (
    <SafeAreaView className="h-full w-full items-center">
      <ScrollView className='w-full'>
       <View className='min-h-[80vh] w-10/12 m-auto py-5 items-center justify-center'>
         {
          form.map((e)=>(
            <View key={e.name}>
              <Text className='mb-2 text-xl font-monserrat-semiBold capitalize'>{e.name}</Text>
              <View className=' h-14 mb-5 w-full border-[1px] flex-row items-center border-gray-700 rounded-lg'>
                <Input 
                  id={e.id}
                  className=' font-monserrat-medium'
                  handlechange={handleInputchange}
                  val={e.val}
                  name={e.name}
                  placeholder={e.placeholder}
                  keyboardtype={e.keyboard ? getKeyboardType(e.keyboard) : undefined}  
                />
              </View>
          </View>
          ))
         }
         <View className='mb-5'>
            <ThemeText>Already have an account? <Link href="/auth/signIn"> Sign In </Link></ThemeText>
         </View>
         <Button isloading={isLoading} btnText={'Register'} action={handlesubmit} textStyle= "  text-[21px]"/>
       </View>
       </ScrollView>
    </SafeAreaView>
   
  )
}

export default signUp

const styles = StyleSheet.create({})