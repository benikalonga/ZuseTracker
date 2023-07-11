/**
 *
 * The main Component
 * Uses Navigation and contains all the screens
 *
 */

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './components/screens/splash/SplashScreen';
import HomeScreen from './components/screens/home/HomeScreen';
import {COLORS} from './constants/theme';
import MapScreen from './components/screens/map/MapScreen';
import DetailScreen from './components/screens/detail/DetailScreen';

import {Provider, useDispatch} from 'react-redux';
import {store} from './store/store';
import LoginScreen from './components/screens/login/LoginScreen';
import * as RootNavigation from './RootNavigation';
import ProfileScreen from './components/screens/profil/ProfileScreen';
import Geolocation from '@react-native-community/geolocation';
import {updateCurPosition, updateInitPosition} from './store/userSlice';
import {getCustomersOffline} from './store/customerSlice';
import AboutScreen from './components/screens/about/AboutScreen';
import CreationCustomerScreen from './components/screens/creation/CreationCustomerScreen';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator();

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomersOffline());

    Geolocation.getCurrentPosition(
      pos => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        const position = {latitude, longitude};

        console.log(position);

        dispatch(updateCurPosition(position));
        dispatch(updateInitPosition(position));
      },
      error => {
        console.error(error);
      },
      {
        timeout: 15000,
        maximumAge: 10000,
        enableHighAccuracy: true,
      },
    );
    const watchID = Geolocation.watchPosition(
      pos => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        dispatch(updateCurPosition({latitude, longitude}));

        console.log('Update cur Position');
      },
      error => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        useSignificantChanges: true,
      },
    );
    return () => {
      Geolocation.clearWatch(watchID);
      console.log('CLose watch');
    };
  }, []);

  return (
    <NavigationContainer ref={RootNavigation.navigationRef}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={HomeScreen}
        />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Creation" component={CreationCustomerScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};
export default App;
