import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const LoadingView = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
  },
});
