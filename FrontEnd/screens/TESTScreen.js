import {
    Animated,
    View,
    Text,
    Pressable,
    StyleSheet,
    useWindowDimensions,
  } from 'react-native';
  import { cardA } from '@react-navigation/stack';
  import { Button } from 'react-native-paper';
  
  const styles = StyleSheet.create({
    viewAnimated: {
      width: '100%',
    },
    viewContainer: {
      flex: 1,
      padding: 10,
      backgroundColor: '#E5E5E5',
      borderRadius: 20,
    },
  });
  function TESTScreen({ navigation }) {
    const { height } = useWindowDimensions();
    const current = navigation.dangerouslyGetParent()?.getCurrentOptions().cardStyleInterpolator;
  
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          ]}
          onPress={navigation.goBack}
        />
        <Animated.View
          style={[
            {
              height: height,
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, height * 0.5],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
            styles.viewAnimated,
          ]}>
          <View style={styles.viewContainer}>
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus
              PageMaker including versions of Lorem Ipsum.
            </Text>
            <Button
              style={{ marginTop: 40 }}
              mode="contained"
              onPress={navigation.goBack}>
              Close Modal
            </Button>
          </View>
        </Animated.View>
      </View>
    );
  }
  export default TESTScreen;
  