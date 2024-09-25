import { ColorSchemeName, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Href, Link } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';

interface Tab {
  e: {
    name: string;
    icon: string;
    link: Href<string | object>; 
  };
  focused: boolean;
  colorScheme: ColorSchemeName | undefined; 
}

const TabIcon = ({e,focused,colorScheme}: Tab) => {

  return (
    <Link href={e.link}>
      <FontAwesome6 
      name={e.icon} 
      color={focused ? "#86efac" : colorScheme === 'dark' ?  "white" :  "black"} 
      size={28}
      />
    </Link>
  )
}

export default TabIcon

const styles = StyleSheet.create({})