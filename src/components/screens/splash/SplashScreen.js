import React from 'react';
import {Image, Dimensions, SafeAreaView} from 'react-native';
import images from '../../../constants/images';
import {styles} from './styles';
import {SharedElement} from 'react-navigation-shared-element';

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
      <SharedElement id="btnLogo">
        <Image source={images.logo} style={styles.image(width)} />
      </SharedElement>
    </SafeAreaView>
  );
};

SplashScreen.sharedElements = route => {
  return [
    {
      id: 'btnLogo',
    },
  ];
};

export default SplashScreen;
