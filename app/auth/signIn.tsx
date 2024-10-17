import { SafeAreaView, StyleSheet, Text, View, KeyboardTypeOptions, Alert, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import Input from '@/components/Reuseables/Input'
import Button from '@/components/Reuseables/Button'
import { Login, Register } from '@/lib/Auth'
import ThemeText from '@/components/Reuseables/ThemeText'
import { Link, router } from 'expo-router'
import { globalContext } from '@/context/Globalcontext'

const signUp = () => {
  const [regData, setregData] = useState({email:"", password:"", username: "", confirm_password: ""})
  const [isLoading, setisLoading] = useState(false)
  const {check} = useContext(globalContext)
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
    setisLoading(true)
    const {email, password} = regData
    if(email === "" || password === "") {
      Alert.alert("Fill all input field")
      setisLoading(false)
      return
    }

    try {
      const log = await Login(regData)
      if(log){
        check()
        router.replace("/(tabs)/")
      }
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
         <View className='mb-5'>
            <ThemeText>Don't have an account? <Link href="/auth/signUp"> Create an Account</Link></ThemeText>
         </View>
         <Button isloading={isLoading} btnText={'Login'} action={handlesubmit} textStyle= "  text-[21px]"/>
       </View>
       </ScrollView>
    </SafeAreaView>
   
  )
}

export default signUp

