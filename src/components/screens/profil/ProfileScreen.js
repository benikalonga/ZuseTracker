import React, {useEffect, useRef} from 'react';
import * as RootNavigation from '../../../RootNavigation';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {clearUser} from '../../../store/userSlice';
import {
  faLocationPin as pinIcon,
  faArrowLeft as backICon,
} from '@fortawesome/free-solid-svg-icons';
import {useGeoCoding} from '../../../hooks/useGeoCoding';
import {
  View,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {COLORS, FONT} from '../../../constants/theme';
import {SharedElement} from 'react-navigation-shared-element';
import {useOpacityAnimation} from '../../../utils/utils';

/** The Profile Screen component
 *
 * First get the user object,
 * Populate the component
 * Handle the logout feature
 */

const {width} = Dimensions.get('window');

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

  const opacity = useOpacityAnimation(500, 100);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SharedElement id="btnUserConnectedId">
          <Image style={styles.avatar(width)} source={user.profile} />
        </SharedElement>
        <Animated.View style={{...styles.content, opacity}}>
          <Text>@{user.username}</Text>
          <Text style={styles.name}>
            {user.name} {user.surname}
          </Text>
          <Text style={styles.userInfo}>{user.email}</Text>
          <FontAwesomeIcon icon={pinIcon} size={32} />
          <Text style={{fontFamily: FONT.regular}}>You are at</Text>
          <Text style={styles.txtAddress}>{address}</Text>
          <TouchableOpacity
            style={styles.btnTextContainer}
            onPress={handleLogOut}>
            <Text style={styles.btnText}>Log out...</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <TouchableOpacity style={styles.btnBack} onPress={handlePressBack}>
        <FontAwesomeIcon icon={backICon} size={22} color={COLORS.secondary} />
      </TouchableOpacity>
    </View>
  );
};
ProfileScreen.sharedElements = route => {
  return [{id: 'btnUserConnectedId', otherId: 'btnUserConnectedId'}];
};
export default ProfileScreen;
