import React from 'react';
import * as RootNavigation from '../../../RootNavigation';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {clearUser} from '../../../store/userSlice';
import {
  faLocationPin as pinIcon,
  faArrowLeft as closeICon,
  faArrowLeft as backICon,
} from '@fortawesome/free-solid-svg-icons';
import {useGeoCoding} from '../../../hooks/useGeoCoding';
import {View, Image, Text, Alert, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {COLORS, FONT, SHADOWS} from '../../../constants/theme';

/** The Profile Screen component
 *
 * First get the user object,
 * Populate the component
 * Handle the logout feature
 */

const ProfileScreen = ({navigation, route}) => {
  const curPosition = useSelector(state => state.user.position);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [address] = useGeoCoding(curPosition);

  /**
   * If the user clics log out, an alert dialog pops up asking to confirm
   * if confirmed, the user.isLoggedIn will be set to false
   * and will be redirected to the HomeScreen
   */
  const handleLogOut = () => {
    Alert.alert('Log out', 'You are about to log out ', [
      {
        text: 'Cancel',
        type: 'Cancel',
      },
      {
        text: 'Confirm',
        onPress: () => {
          dispatch(clearUser());
          RootNavigation.goBack();
        },
      },
    ]);
  };

  const handlePressBack = () => {
    RootNavigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.avatar} source={user.profile} />
        <Text>@{user.username}</Text>
        <Text style={styles.name}>
          {user.name} {user.surname}
        </Text>
        <Text style={styles.userInfo}>{user.email}</Text>
        <FontAwesomeIcon icon={pinIcon} size={32} />
        <Text style={{fontFamily: FONT.regular}}>You are at</Text>
        <Text
          style={{
            fontFamily: FONT.bold,
            color: COLORS.secondary,
            textAlign: 'center',
          }}>
          {address}
        </Text>
        <TouchableOpacity
          style={styles.btnTextContainer}
          onPress={handleLogOut}>
          <Text style={styles.btnText}>Log out...</Text>
        </TouchableOpacity>
      </View>
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
    </View>
  );
};

export default ProfileScreen;
