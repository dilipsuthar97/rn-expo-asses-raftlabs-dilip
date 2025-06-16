import React, { memo, useEffect } from 'react';
import { Modal, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import tw from 'twrnc';

export interface LoaderProps {
  visible: boolean;
}

const Loader: React.FC<LoaderProps> = ({ visible }) => {
  const one = useSharedValue(0);
  const two = useSharedValue(0);
  const three = useSharedValue(0);
  const four = useSharedValue(0);

  useEffect(() => {
    onStartAnimation();
  }, []);

  const onStartAnimation = () => {
    one.value = withRepeat(
      withSequence(withTiming(5, { duration: 300 }), withTiming(-10, { duration: 300 })),
      -1,
      true,
    );

    two.value = withDelay(
      100,
      withRepeat(withSequence(withTiming(5, { duration: 300 }), withTiming(-10, { duration: 300 })), -1, true),
    );

    three.value = withDelay(
      200,
      withRepeat(withSequence(withTiming(5, { duration: 300 }), withTiming(-10, { duration: 300 })), -1, true),
    );

    four.value = withDelay(
      300,
      withRepeat(withSequence(withTiming(5, { duration: 300 }), withTiming(-10, { duration: 300 })), -1, true),
    );
  };

  const oneStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: one.value }],
  }));
  const twoStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: two.value }],
  }));
  const threeStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: three.value }],
  }));
  const fourStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: four.value }],
  }));

  return (
    <Modal
      transparent
      statusBarTranslucent
      supportedOrientations={['portrait', 'landscape']}
      visible={visible}
      animationType={'none'}>
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`bg-black/80 w-26 h-26 rounded-xl flex-row justify-center items-center`}>
          <Animated.View style={[tw`w-2.5 h-2.5 bg-white mx-1 rounded-full`, oneStyle]} />
          <Animated.View style={[tw`w-2.5 h-2.5 bg-white mx-1 rounded-full`, twoStyle]} />
          <Animated.View style={[tw`w-2.5 h-2.5 bg-white mx-1 rounded-full`, threeStyle]} />
          <Animated.View style={[tw`w-2.5 h-2.5 bg-white mx-1 rounded-full`, fourStyle]} />
        </View>
      </View>
    </Modal>
  );
};
export default memo(Loader);
