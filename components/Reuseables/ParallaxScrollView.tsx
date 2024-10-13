import React, { useRef } from 'react';
import { Animated, ScrollView, Text, View, Image, StyleSheet, Dimensions } from 'react-native';

const { height: windowHeight } = Dimensions.get('window');
interface parallax {
    headerImageUri: string,
    headerHeight?: number,
    minHeaderHeight?: number,
    children: React.ReactNode
}

const ParallaxScrollView = ({ headerImageUri, headerHeight = 280, minHeaderHeight = 80, children }: parallax) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -minHeaderHeight],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight / 2, headerHeight],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const headerScale = scrollY.interpolate({
    inputRange: [-headerHeight, 0],
    outputRange: [2, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.headerContainer,
          {
            height: headerHeight,
            transform: [{ translateY: headerTranslateY }, { scale: headerScale }],
          },
        ]}
      >
        <Animated.Image
          source={{ uri: headerImageUri }}
          style={[styles.headerImage, { opacity: headerOpacity }]}
          resizeMode= "cover"
        />
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={[styles.scrollViewContent, { paddingTop: headerHeight }]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {children}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // zIndex: 1,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  contentContainer: {
    backgroundColor: "white",
    width: "100%",
    transform: [{translateY: -40}],
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  defaultContent: {
    fontSize: 18,
    lineHeight: 26,
    color: '#333',
    textAlign: 'center',
  },
});

export default ParallaxScrollView;
