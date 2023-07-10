import React from 'react';
import * as RootNavigation from '../../../RootNavigation';
import {styles} from './styles';
import {faArrowLeft as backICon} from '@fortawesome/free-solid-svg-icons';
import {View, Image, Text, ScrollView, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {COLORS, FONT, SHADOWS} from '../../../constants/theme';
import images from '../../../constants/images';

/**
 * The AboutScreen component
 */

const AboutScreen = () => {
  const handlePressBack = () => {
    RootNavigation.goBack();
  };
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.content}>
            <Image style={styles.avatar} source={images.logo} />
            <Text style={{...styles.name, color: COLORS.primary}}>
              ZuseTracker
            </Text>
            <Text>Technical assessment by</Text>
            <Text style={styles.name}>Beni Kalonga</Text>
            <Text style={styles.userInfo}>React Native Developer</Text>
            <Text style={styles.name}>Zuse Technology</Text>
            <View style={{width: '100%'}}>
              <Text style={styles.userInfo}>Description</Text>
              <Text style={{fontFamily: FONT.medium, textAlign: 'justify'}}>
                1. Home Screen: The landing page of the app. It should display a
                list of available customers retrieved from your Mocki API,
                sorted by distance from the agent's current location. Each item
                should show the customer's name and location.
              </Text>
              <Text style={{fontFamily: FONT.medium, textAlign: 'justify'}}>
                2. Login Screen: This screen should allow users to enter a
                username and password and submit these details to your Mocki
                API. Upon successful login, the user should be redirected to the
                Home Screen.
              </Text>
              <Text style={{fontFamily: FONT.medium, textAlign: 'justify'}}>
                3. Customer Creation Screen: Authenticated users should be able
                to navigate to this screen from the Home Screen. It should allow
                users to create a new customer by submitting a form with the
                customer's name and selecting the customer's location on a map.
                When submitted, the customer should be sent to your Mocki API.
                Upon successful creation, the user should be redirected to the
                Home Screen, where the new customer should appear in the list.
              </Text>
              <Text style={{fontFamily: FONT.medium, textAlign: 'justify'}}>
                4. Customer Detail Screen: When a customer on the Home Screen is
                selected, the user should be taken to a detail page where they
                can see more information about the customer. This screen should
                retrieve the customer's details from your Mocki API.{' '}
              </Text>
              <Text style={{fontFamily: FONT.medium, textAlign: 'justify'}}>
                5. Map Screen: This screen should display a map with markers
                indicating the locations of the customers. Clicking on a marker
                should open a popup with details about the customer at that
                location.
              </Text>
              <Text style={{fontFamily: FONT.medium, textAlign: 'justify'}}>
                6. Splash Screen: This screen is the welcome screen.
              </Text>
              <Text style={{fontFamily: FONT.medium, textAlign: 'justify'}}>
                7. Profil Screen: This screen show the current user connected
                and gives the ability to Log out.
              </Text>
              <Text style={{fontFamily: FONT.medium, textAlign: 'justify'}}>
                8. About Screen: This screen show the info about the app.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          zIndex: 999,
          margin: 10,
          borderRadius: 54,
          padding: 8,
          backgroundColor: COLORS.white,
          ...SHADOWS.small,
        }}
        onPress={handlePressBack}>
        <FontAwesomeIcon icon={backICon} size={22} color={COLORS.secondary} />
      </TouchableOpacity>
    </>
  );
};

export default AboutScreen;
