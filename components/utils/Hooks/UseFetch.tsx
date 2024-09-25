import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import axios from 'axios'
import { UdemyUser } from '../data'

interface Fetch {
  url: string,
}

const UseFetch = ({url}: Fetch) => {
  useEffect(()=>{
    const fetchData = async () => {
      const res = axios.get(url, 
        {
          params: {},
          auth:{ username: UdemyUser.username, password:""}
        }
    )
    }
  },[])

  return (
    <View>
      <Text>UseFetch</Text>
    </View>
  )
}

export default UseFetch

