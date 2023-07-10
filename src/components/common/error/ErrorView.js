import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import images from '../../../constants/images';
import {styles} from './styles';

/**
 * The error component used to display an error
 */
export const ErrorView = ({
  errorText = 'Something went Wrong',
  onRefresh,
  children,
}) => {
  return (
    <View style={styles.errorContainer}>
      <Image style={styles.errorImg} source={images.logo_offline} />
      <Text style={{color: '#a7a7a7'}}>{errorText}</Text>
      <TouchableOpacity
        style={styles.errorBtnTextContainer}
        onPress={onRefresh}>
        <Text style={styles.btnText}>Refresh</Text>
      </TouchableOpacity>
      {children}
    </View>
  );
};
