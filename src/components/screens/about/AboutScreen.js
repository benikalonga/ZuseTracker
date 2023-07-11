import React, {useEffect, useRef} from 'react';
import * as RootNavigation from '../../../RootNavigation';
import {styles} from './styles';
import {faArrowLeft as backICon} from '@fortawesome/free-solid-svg-icons';
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {COLORS} from '../../../constants/theme';
import images from '../../../constants/images';
import {SharedElement} from 'react-navigation-shared-element';

/**
 * The AboutScreen component
 */

const AboutScreen = () => {
  const handlePressBack = () => {
    RootNavigation.goBack();
  };

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      delay: 300,
    }).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.content}>
            <SharedElement id="btnLogo">
              <Image style={styles.avatar} source={images.logo} />
            </SharedElement>

            <Text style={{...styles.name, color: COLORS.primary}}>
              ZuseTracker
            </Text>
            <Text>Technical assessment by</Text>
            <Text style={styles.name}>Beni Kalonga</Text>
            <Text style={styles.userInfo}>React Native Developer</Text>
            <Text style={styles.name}>Zuse Technology</Text>
            <Animated.View style={{width: '100%', opacity}}>
              <Text style={styles.userInfo}>Description</Text>
              <Text style={styles.txtDescrip}>
                1. Home Screen: The landing page of the app. It should display a
                list of available customers retrieved from your Mocki API,
                sorted by distance from the agent's current location. Each item
                should show the customer's name and location.
              </Text>
              <Text style={styles.txtDescrip}>
                2. Login Screen: This screen should allow users to enter a
                username and password and submit these details to your Mocki
                API. Upon successful login, the user should be redirected to the
                Home Screen.
              </Text>
              <Text style={styles.txtDescrip}>
                3. Customer Creation Screen: Authenticated users should be able
                to navigate to this screen from the Home Screen. It should allow
                users to create a new customer by submitting a form with the
                customer's name and selecting the customer's location on a map.
                When submitted, the customer should be sent to your Mocki API.
                Upon successful creation, the user should be redirected to the
                Home Screen, where the new customer should appear in the list.
              </Text>
              <Text style={styles.txtDescrip}>
                4. Customer Detail Screen: When a customer on the Home Screen is
                selected, the user should be taken to a detail page where they
                can see more information about the customer. This screen should
                retrieve the customer's details from your Mocki API.{' '}
              </Text>
              <Text style={styles.txtDescrip}>
                5. Map Screen: This screen should display a map with markers
                indicating the locations of the customers. Clicking on a marker
                should open a popup with details about the customer at that
                location.
              </Text>
              <Text style={styles.txtDescrip}>
                6. Splash Screen: This screen is the welcome screen.
              </Text>
              <Text style={styles.txtDescrip}>
                7. Profil Screen: This screen show the current user connected
                and gives the ability to Log out.
              </Text>
              <Text style={styles.txtDescrip}>
                8. About Screen: This screen show the info about the app.
              </Text>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.btnBack} onPress={handlePressBack}>
        <FontAwesomeIcon icon={backICon} size={22} color={COLORS.secondary} />
      </TouchableOpacity>
    </>
  );
};
AboutScreen.sharedElements = route => {
  console.log(route.params);
  return [{id: 'btnLogo', otherId: 'btnLogo'}];
};
export default AboutScreen;
