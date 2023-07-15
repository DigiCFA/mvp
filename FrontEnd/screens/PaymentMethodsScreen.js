import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  StyleSheet,
  Animated,
  Button,
} from "react-native";
import React from "react";

import { useCardAnimation } from "@react-navigation/stack";
import { useNavigation, useTheme } from "@react-navigation/native";

const PaymentMethodsScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();
  // const { color } = useTheme();
  const { current } = useCardAnimation();
  // const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center">
      <Pressable
        // Convert this to tailwind, probably not hard
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "rgba(0,0,0,0.5)" },
        ]}
        onPress={navigation.goBack}
      />
      <Animated.View
        style={{
          padding: 16,
          width: '90%',
          maxWidth: 400,
          borderRadius: 3,
          backgroundColors: 'black',
          // transform: [
          //   {
          //     scale: current.progress.interpolate({
          //       inputRange: [0, 1],
          //       outputRange: [0.9, 1],
          //       extrapolate: 'clamp'
          //     })
          //   }
          // ]
        }}>
        <Text>Choose a way to pay</Text>
        <Button
          title="Okay"
          className='bg-blue-400 self-end'
          onPress = {navigation.goBack}
        />
      </Animated.View>
    </View>
    // <View className="flex-1 flex-col">
    //   <View className="h-1/2">
    //     <Text>Choose a way to pay</Text>
    //   </View>
    // </View>
  );
};

export default PaymentMethodsScreen;
