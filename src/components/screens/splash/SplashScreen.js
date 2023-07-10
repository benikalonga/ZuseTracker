import React from 'react';
import {Image, Dimensions, SafeAreaView} from 'react-native';
import images from '../../../constants/images';
import {styles} from './styles';

const {width} = Dimensions.get('window');

/**
 * The SplashScreen component
 */

const SplashScreen = ({navigation}) => {
  setTimeout(() => {
    navigation?.replace('Home');
  }, 3000);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={images.logo} style={styles.image(width)} />
    </SafeAreaView>
  );
};

export default SplashScreen;
