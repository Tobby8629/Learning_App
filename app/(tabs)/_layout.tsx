import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import TabIcon from '@/components/utils/TabIcon';
import { tab } from '@/components/utils/data';

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
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          padding: 50
        },
        }}>

      {tab.map((e)=>(
        <Tabs.Screen
        key={e.name} 
        name={e.name}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon e={e} focused={focused} colorScheme={colorScheme}/>
          ),
        }}
        
        />
      ))}
      
    </Tabs>
  );
}