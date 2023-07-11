import haversine from 'haversine';
import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

export const calcDistance = (latLatOne, latLatTwo) => {
  return haversine(latLatOne, latLatTwo) || 0;
};
export const getLatLongDelta = (zoom, latitude) => {
  const LONGITUDE_DELTA = Math.exp(Math.log(360) - zoom * Math.LN2);
  const ONE_LATITUDE_DEGREE_IN_METERS = 111.32 * 1000;
  const accurateRegion =
    LONGITUDE_DELTA *
    (ONE_LATITUDE_DEGREE_IN_METERS * Math.cos(latitude * (Math.PI / 180)));
  const LATITUDE_DELTA = accurateRegion / ONE_LATITUDE_DEGREE_IN_METERS;

  return [LONGITUDE_DELTA, LATITUDE_DELTA];
};

export const useOpacityAnimation = (duration = 500, delay = 0) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      useNativeDriver: true,
      delay,
    }).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  return opacity;
};
