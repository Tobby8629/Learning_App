import { StyleSheet, Text, View } from 'react-native';
import React, { Suspense } from 'react';
import { components } from '../utils/data';
import SolidRoundSpinner from '../Reuseables/SolidSpinner';

interface  TabProps {
  id: keyof typeof  components
  data: fetchData
}

const Tab = ({ id, data }: TabProps) => {
  const TargetComponent = components[id];

  if (!TargetComponent) {
    return <Text>Invalid Tab</Text>;
  }

  return (
    <Suspense fallback={
      <View className=' my-10 flex-1 items-center justify-center'>
        <SolidRoundSpinner className='border-green-400' />
      </View> 
     }>
      <TargetComponent data={data} />
    </Suspense>
  );
};

export default Tab;

const styles = StyleSheet.create({});
