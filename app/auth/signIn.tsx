import { SafeAreaView, StyleSheet, Text, View, KeyboardTypeOptions, Alert, TouchableOpacity, ScrollView, Image, Pressable } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Input from '@/components/Reuseables/Input'
import Button from '@/components/Reuseables/Button'
import { Login, Register } from '@/lib/Auth'
import ThemeText from '@/components/Reuseables/ThemeText'
import { Link, Redirect, router } from 'expo-router'
import { globalContext } from '@/context/Globalcontext'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { globally } from '@/components/utils/data'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'

const signUp = () => {
  const [regData, setregData] = useState({email:"", password:"", username: "", confirm_password: ""})
  const [isLoading, setisLoading] = useState(false)
  const {check, loading, user} = useContext(globalContext) as globally
  const form = [
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
  ]
  
  const handlechange = (val:string, id:string) => {
    setregData({...regData, [id]: val})
  }

  const handlesubmit = async () => {
    setisLoading(true);
    const { email, password } = regData;
    if (!email || !password) {
      Alert.alert("Fill all input fields");
      setisLoading(false);
      return;
    }
    try {
      const log = await Login(regData);
      if (log) {
        check()
        setTimeout(() => {
          console.log(loading, user)
          setisLoading(false)
          router.replace("/(tabs)/")
        }, 2000);
      }
    } catch (err: any) {
      Alert.alert("Error", err?.message || "An error occurred");
      setisLoading(false)
    }
  };

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
      <ScrollView className='w-full py-10'>
        <Pressable className='flex-row items-center w-11/12 mx-auto mb-5' onPress={()=>router.back()}>
            <FontAwesome6 name="arrow-left" size={25} color={"#86efac"}/>
            <ThemeText className='ml-3 font-monserrat-semiBold text-2xl'> Back</ThemeText>
         </Pressable>
         
       <View className='min-h-[80vh] w-11/12 m-auto py-5'>
         <View className='mb-14'>
            <ThemeText className='text-center font-monserrat-bold text-4xl'>Login</ThemeText>
         </View>
         {
          form.map((e)=>(
            <View key={e.name}>
              <ThemeText className='mb-2 text-xl font-monserrat-semiBold capitalize'>{e.name}</ThemeText>
              <View className=' h-14 mb-5 w-full border-[1px] flex-row items-center border-gray-700 rounded-lg'>
                <Input 
                  id={e.id}
                  handlechange={handlechange}
                  className=' font-monserrat-medium'
                  val={e.val}
                  name={e.name}
                  placeholder={e.placeholder}
                  keyboardtype={e.keyboard ? getKeyboardType(e.keyboard) : undefined}  
                />
              </View>
          </View>
          ))
         }
         <View className='my-5 flex-row items-center justify-between'>
            <ThemeText className='text-sm w-1/3'><Link href="/auth/signUp" className='text-blue-400 font-monserrat-bold'> Forgot password</Link></ThemeText>
            <ThemeText className='w-2/3 font-monserrat-semiBold text-sm text-right'>Don't have an account? <Link href="/auth/signUp" className='text-blue-400 font-monserrat-bold'> Register</Link></ThemeText>
         </View>
         <Button isloading={isLoading} btnText={'Login'} action={handlesubmit} textStyle= " text-[21px]" btnStyle='mt-14'/>
         <ThemeText className='text-center my-8 font-monserrat-bold'> OR </ThemeText>
        <View className=' w-2/3 mx-auto flex-row justify-center items-center'>
          <Pressable className='mr-5'>
             <FontAwesome name="facebook-official" color={"#86efac"} size={20} />
          </Pressable>
          <Pressable className='mr-5'>
             <FontAwesome name="facebook-official" color={"#86efac"} size={20} />
          </Pressable>
          <Pressable className='mr-5'>
             <FontAwesome name="facebook-official" color={"#86efac"} size={20} />
          </Pressable>
          <Pressable className='mr-5'>
             <FontAwesome name="facebook-official" color={"#86efac"} size={20} />
          </Pressable>
        </View>
       </View>
       </ScrollView>
    </SafeAreaView>
   
  )
}

export default signUp

