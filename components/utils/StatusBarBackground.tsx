import Constants from 'expo-constants'
import { Platform } from 'react-native'
import styled from 'styled-components/native'


const headerHeight = 48

export const StatusBarBackground = styled.View`
  background: #86efac;
  flex: 1;
  padding-bottom: 0;
  margin-bottom: 0;
  padding-top: ${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
  height: ${Platform.OS === 'ios' ? Constants.statusBarHeight + headerHeight : headerHeight}px;
  
`

