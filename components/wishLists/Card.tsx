import React, { memo, useContext } from "react";
import { Dimensions, Image, Pressable, useColorScheme, View } from "react-native";
import ThemeText from "../Reuseables/ThemeText";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, FadeInDown, FadeIn, ZoomIn } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { deleteCheckList, globally} from "../utils/data";
import { globalContext } from "@/context/Globalcontext";

interface CardProps {
  data: wishList;
  index: number;
}

const Card = ({ data, index }: CardProps) => {
  const screenWidth = Dimensions.get("window").width;
  const calculatedWidth = screenWidth - 160;
  const colorScheme = useColorScheme();
  const {user, check}= useContext(globalContext) as globally

  const translateX = useSharedValue(0);

  // Swipe left gesture
  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
      else if (event.translationX > 0 && translateX.value < 0) {
        translateX.value = event.translationX - 80;
      }
    })
    .onEnd(() => {
      if (translateX.value < -50) {
        translateX.value = withTiming(-80, { duration: 200 });
      } else if (translateX.value > 30) {
        translateX.value = withTiming(0, { duration: 200 });
      } else {
        translateX.value = withTiming(translateX.value < -50 ? -80 : 0, { duration: 200 })
    }});

  // Long press gesture
  const longPressGesture = Gesture.LongPress()
    .minDuration(300)
    .onEnd(() => {
      translateX.value = withTiming(-80, { duration: 200 });
    });

  // Combine gestures
  const composedGesture = Gesture.Simultaneous(swipeGesture, longPressGesture);

  // Animated card style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <View className="relative w-full">
      <Animated.View
        entering={FadeIn.duration(1500).delay(index * 300)}
        className="absolute right-0 top-0 bottom-7 w-20 flex items-center justify-center bg-red-500 rounded-lg"
      >
        <Pressable onPress={() => {deleteCheckList(data,user,check); console.log("Deleted")}}>
          <Ionicons name="trash" size={25} color="white" />
        </Pressable>
      </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(1000).delay(index * 120)}
          className="mb-7 w-full rounded-md border-[.8px] px-3 p-2 flex-row items-center justify-between"
          style={[colorScheme === "dark" ? {borderColor: "#1e293b", backgroundColor: "black" } : 
            {borderColor: "#e5e7eb", backgroundColor: "white"}, animatedStyle]} 
          >
          <View className="w-28 h-24 mr-3">
            <Image
              source={{ uri: data?.img_3 }}
              alt={data?.title}
              resizeMode="cover"
              className="w-full h-full rounded-2xl"
            />
          </View>
          <View style={{ width: calculatedWidth }} className="ml-auto px-1">
            <ThemeText className="text-lg font-monserrat-semiBold mb-4">{data.title}</ThemeText>
            <View className="flex-row items-center justify-between">
              <ThemeText className="text-lg font-medium text-gray-500">{data.price}</ThemeText>
              <View className="flex-row items-center">
                <Ionicons name="star" size={22} color="gold" />
                <ThemeText className="ml-1">{data.price}</ThemeText>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

export default memo(Card);
