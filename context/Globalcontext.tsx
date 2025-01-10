import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { createContext } from 'react'
import { getUser, Logout } from '@/lib/Auth'
import { router, useFocusEffect } from 'expo-router'
interface global {
  children: ReactNode
}
export const globalContext = createContext<any>(null)
const Globalcontext = ({children}: global) => {
  const [user, setuser ] = useState<user|null>(null)
  const [loading, setloading] = useState(false)
  

const check = async () => {
  setloading(true)
  try {
    const result = await getUser() as user
    if (result) {
      setuser(result)
      setloading(false)
    }
  }
  catch(err: any){
    console.log(err.message)
    setloading(false)
  }
  finally {
    setloading(false)
  }
}

const logout = async () => {
  setloading(true)
  try {
    const trylog = await Logout()
    if(trylog) {
      setloading(false)
      router.replace("/auth/signIn")
      setuser(null)
    }
  }
  catch(err) {
    console.log(err)
    setloading(false)
  }
  finally {
    setloading(false)
  }
}
useFocusEffect(useCallback(()=>{
  check()
},[]))

  return (
    <globalContext.Provider value={{user, loading, setuser, setloading, check, logout}}>
        {children}
    </globalContext.Provider>
  )
}

export default Globalcontext

const styles = StyleSheet.create({})