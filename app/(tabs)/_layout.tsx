import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Href, Link, router, Tabs } from 'expo-router';
import { ColorSchemeName, Pressable, View } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import ThemeText from '@/components/Reuseables/ThemeText';
import TabIcon from '@/components/utils/TabIcon';
import { TabRouter } from '@react-navigation/native';
import { tab } from '@/components/utils/data';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/



function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarShowLabel:false,
      }}>

      {tab.map((e)=>(
        <Tabs.Screen
        key={e.name} 
        name={e.name}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon e={e} focused={focused} colorScheme={colorScheme}/>
          )
        }}
        />
      ))}
      
    </Tabs>
  );
}