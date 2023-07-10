import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {useSelector} from 'react-redux';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import haversine from 'haversine';
import PagerView from 'react-native-pager-view';
import {Toolbar} from '../../common/Toolbar';
import {COLORS, FONT, SHADOWS} from '../../../constants/theme';
import images from '../../../constants/images';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUserTie as userIcon,
  faUserCircle as userCustomerIcon,
  faLocationPin as pinIcon,
  faCar as carIcon,
  faArrowLeft as closeICon,
} from '@fortawesome/free-solid-svg-icons';

import {useGeoCoding} from '../../../hooks/useGeoCoding';
import * as RootNavigation from '../../../RootNavigation';
import {calcDistance} from '../../../utils/utils';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const OFFLINE_MODE = -1;

const MapScreen = ({navigation, route}) => {
  /** useSelectors */
  const customerList = useSelector(state => state.customers.customers);
  const customerListOffline = useSelector(
    state => state.customers.customersOffline,
  );

  const customerListDisplayed =
    route.params === OFFLINE_MODE ? customerListOffline : customerList;

  const user = useSelector(state => state.user.user);
  const initPosition = useSelector(state => state.user.initPosition);
  const curPosition = useSelector(state => state.user.position);

  const [curIndex, setCurIndex] = useState(
    route.params === OFFLINE_MODE ? 0 : route.params,
  );

  const _map = useRef(null);
  const _pagerView = useRef(null);

  const distTraveled = useRef(0.0);
  distTraveled.current = calcDistance(initPosition, curPosition);
  const [address] = useGeoCoding(curPosition);

  const initialRegion = {
    ...customerListDisplayed?.at(curIndex)?.location,
    latitudeDelta: 1,
    longitudeDelta: 1,
  };

  const onMarkerPress = (mapEventData, customer, index) => {
    if (curIndex !== index) {
      _pagerView.current.setPage(index);
      setCurIndex(i => index);
    }
  };

  const handlePageSelect = e => {
    const customer = customerListDisplayed.at(e.nativeEvent.position);
    setCurIndex(e.nativeEvent.position);
    if (customer)
      _map.current.animateToRegion(
        {
          ...customer.location,
          latitudeDelta: 1,
          longitudeDelta: 1,
        },
        350,
      );
  };

  const handleLogin = () => {
    RootNavigation.navigate('Login');
  };

  const handleProfile = () => {
    RootNavigation.navigate('Profile');
  };

  const handlePressBack = () => {
    RootNavigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        style={styles.mapContainer}
        showUserLocation
        followUserLocation
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        loadingEnabled>
        {customerListDisplayed.map((customer, index) => {
          return (
            <Marker
              key={index}
              coordinate={customer.location}
              onPress={e => onMarkerPress(e, customer, index)}>
              <Animated.View>
                {curIndex === index && (
                  <Text
                    style={{
                      backgroundColor: COLORS.primary,
                      color: COLORS.white,
                      padding: 4,
                      borderRadius: 4,
                    }}>
                    {customer.name}
                  </Text>
                )}
                <Animated.Image
                  source={images.pin}
                  style={[{width: 30, height: 30, alignSelf: 'center'}]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.topView}>
        {/* Go Back */}
        <TouchableOpacity
          style={{
            borderRadius: 54,
            width: 40,
            height: 40,
            padding: 6,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white,
            ...SHADOWS.small,
          }}
          onPress={handlePressBack}>
          <FontAwesomeIcon
            icon={closeICon}
            size={22}
            color={COLORS.secondary}
          />
        </TouchableOpacity>
        {user.token ? (
          <>
            <View
              style={{
                backgroundColor:
                  route.params === OFFLINE_MODE ? COLORS.red : COLORS.white,
                borderRadius: 56,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 12,
                paddingBottom: 12,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                ...SHADOWS.medium,
              }}>
              {route.params !== OFFLINE_MODE ? (
                <>
                  <Text
                    style={{
                      fontFamily: FONT.medium,
                      flex: 1,
                      textAlign: 'right',
                    }}
                    numberOfLines={1}>
                    {address}
                  </Text>
                  <FontAwesomeIcon icon={pinIcon} />
                </>
              ) : (
                <Text
                  style={{
                    fontFamily: FONT.medium,
                    flex: 1,
                    textAlign: 'center',
                    color: COLORS.white,
                  }}
                  numberOfLines={1}>
                  OFFLINE
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={handleProfile}
              style={{...styles.btnToolBar, ...SHADOWS.medium}}>
              <Image source={user.profile} style={styles.image(42)} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.btnToolBar(36)} onPress={handleLogin}>
            <FontAwesomeIcon icon={userIcon} size={24} color={COLORS.gray} />
          </TouchableOpacity>
        )}
      </View>
      <PagerView
        style={styles.pagerView}
        ref={_pagerView}
        initialPage={curIndex}
        onPageSelected={e => handlePageSelect(e)}>
        {customerListDisplayed.map((customer, index) => {
          const distFromYou = calcDistance(curPosition, customer.location);
          const [addressCust] = useGeoCoding(customer.location);

          return (
            <View key={index}>
              <View
                style={{
                  position: 'absolute',
                  zIndex: 999,
                  alignSelf: 'center',
                  backgroundColor: COLORS.white,
                  borderRadius: 56,
                }}>
                <FontAwesomeIcon
                  icon={userCustomerIcon}
                  size={48}
                  color={COLORS.tertiary}
                />
              </View>
              <View
                style={{
                  backgroundColor: COLORS.white,
                  width: CARD_WIDTH,
                  height: '100%',
                  alignSelf: 'center',
                  marginTop: 24,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  ...SHADOWS.medium,
                }}>
                <Image
                  style={{width: '100%', height: 80, resizeMode: 'cover'}}
                  source={images.logo}
                />
                <View
                  style={{
                    padding: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                  }}>
                  <Text style={styles.welcomeMessage}>{customer.name}</Text>
                  <View style={{flexDirection: 'row', gap: 4}}>
                    <FontAwesomeIcon icon={pinIcon} />
                    <Text style={styles.normal}>{customer.city}</Text>
                  </View>
                  {curPosition && (
                    <View style={{flexDirection: 'row', gap: 4}}>
                      <FontAwesomeIcon icon={carIcon} />
                      <Text
                        style={{
                          fontFamily: FONT.regular,
                          fontWeight: 'bold',
                        }}>
                        {parseFloat(distFromYou).toFixed(2)} KM from you
                      </Text>
                    </View>
                  )}
                  <Text style={styles.normal} numberOfLines={2}>
                    {addressCust}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </PagerView>
    </View>
  );
};

export default MapScreen;
