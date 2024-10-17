import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { createContext } from 'react'
import { getUser } from '@/lib/Auth'
import { useFocusEffect } from 'expo-router'
interface global {
  children: ReactNode
}
export const globalContext = createContext<any>(null)
const Globalcontext = ({children}: global) => {
  const [user, setuser ] = useState<user|null>(null)
  const [loading, setloading] = useState(false)

  console.log(user)

const check = async () => {
  setloading(true)
  try {
    const result = await getUser() as user
    setuser(result)
    setloading(false)
  }
  catch(err: any){
    console.log(err.message)
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
    <globalContext.Provider value={{user, loading, setuser, setloading, check}}>
        {children}
    </globalContext.Provider>
  )
}

export default Globalcontext

const styles = StyleSheet.create({})