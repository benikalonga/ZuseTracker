import React, {useEffect, useRef, useState} from 'react';
import images from '../../constants/images';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../screens/home/styles';
import {COLORS, FONT} from '../../constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUserTie as userIcon,
  faLocationPin as pinIcon,
  faMapLocation as mapIcon,
  faGlobe as mailIcon,
  faPhone as phoneIcon,
  faClose as closeICon,
  faUserEdit as editIcon,
  faSave as saveIcon,
} from '@fortawesome/free-solid-svg-icons';
import * as RootNavigation from '../../RootNavigation';
import {
  loginUserLocal,
  updateCurPosition,
  updateInitPosition,
} from '../../store/userSlice';
import haversine from 'haversine';
import {useGeoCoding} from '../../hooks/useGeoCoding';
import {calcDistance} from '../../utils/utils';

export const Toolbar = () => {
  const user = useSelector(state => state.user.user);
  const initPosition = useSelector(state => state.user.initPosition);
  const curPosition = useSelector(state => state.user.position);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginUserLocal());
  }, []);

  const distTraveled = useRef(0.0);

  distTraveled.current = calcDistance(initPosition, curPosition);
  const distance = parseFloat(distTraveled.current).toFixed(2);

  const [address] = useGeoCoding(curPosition);

  const handleLogin = () => {
    RootNavigation.navigate('Login');
  };

  const handleProfile = () => {
    RootNavigation.navigate('Profile');
  };

  return (
    <View style={styles.toolbarContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.btnToolBar(46)}
          onPress={() => RootNavigation.navigate('About')}>
          <Image source={images.logo} style={styles.image(28)} />
        </TouchableOpacity>
      </View>
      {user.token && (
        <View style={{flex: 1, flexDirection: 'row', gap: 6}}>
          <FontAwesomeIcon icon={pinIcon} />
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text style={{fontFamily: FONT.medium}} numberOfLines={1}>
              {address}
            </Text>
            <Text
              style={{
                fontFamily: FONT.regular,
              }}>
              {distance === '0.00'
                ? 'Start moving...'
                : `Traveled ${distance} KM`}
            </Text>
          </View>
        </View>
      )}
      <View style={{flexDirection: 'row'}}>
        {user.token ? (
          <TouchableOpacity onPress={handleProfile} style={styles.btnToolBar}>
            <Image source={user.profile} style={styles.image(42)} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btnToolBar(46)} onPress={handleLogin}>
            <FontAwesomeIcon icon={userIcon} size={24} color={COLORS.gray} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
