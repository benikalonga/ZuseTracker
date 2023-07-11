import React, {useState, useRef} from 'react';
import images from '../../../constants/images';
import * as RootNavigation from '../../../RootNavigation';
const {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  ActivityIndicator,
  ToastAndroid,
  Modal,
  Animated,
} = require('react-native');
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONT} from '../../../constants/theme';
import {
  faUserPlus as userIcon,
  faArrowLeft as backIcon,
  faLocationPin as pin,
  faMapLocationDot as mapPick,
  faLocation as userLocationIcon,
  faPlus as mapZoomInIcon,
  faMinus as mapZoomOutIcon,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {addCustomer, clearCustomerAdded} from '../../../store/customerSlice';
import {useGeoCoding} from '../../../hooks/useGeoCoding';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {getLatLongDelta} from '../../../utils/utils';
import {SharedElement} from 'react-navigation-shared-element';

/**
 * CreationCustomerScreen, post the fullname and city and location to the API and listen to the response event
 * if success, update the customerList object
 */

const MAX_ZOOM_LEVEL = 20;
const MIN_ZOOM_LEVEL = 3;

const CreationCustomerScreen = () => {
  const isLoading = useSelector(state => state.customers.isLoading);
  const errorText = useSelector(state => state.customers.error);
  const customerAdded = useSelector(state => state.customers.customerAdded);
  const curPosition = useSelector(state => state.user.position);

  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [location, setLocation] = useState(curPosition);
  const [locationError, setLocationError] = useState('');
  const [isPickVisible, setIsPickVisible] = useState(false);

  const dispatch = useDispatch();

  const [address, _, rawAddress] = useGeoCoding(location);

  // If Success
  if (customerAdded) {
    ToastAndroid.show(`Customer added, ${fullName}!`, ToastAndroid.SHORT);
    setTimeout(() => {
      dispatch(clearCustomerAdded());
      RootNavigation.goBack();
    }, 1000);
  }

  const handleAddCustomer = () => {
    if (!fullName) {
      setFullNameError('Enter a valid full name');
      return;
    } else setFullNameError('');

    if (!location.latitude || !location.longitude) {
      setLocationError('Pick the location on the map');
      return;
    } else setLocationError('');

    Keyboard.dismiss();

    const city = rawAddress[4]
      ? rawAddress[4].long_name
      : rawAddress[3]
      ? rawAddress[3].long_name
      : '';
    dispatch(addCustomer({fullName, location, city}));
  };

  const handlePressPick = () => {
    Keyboard.dismiss();
    setIsPickVisible(true);
  };

  const handleCancel = () => {
    RootNavigation.goBack();
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView enabled>
        <View style={styles.content}>
          <SharedElement id="btnCreateCustomerId">
            <FontAwesomeIcon icon={userIcon} size={82} />
          </SharedElement>
          <Text style={styles.titleText}>Add a customer</Text>

          <View style={styles.inputContainer}>
            <FontAwesomeIcon icon={userIcon} color={COLORS.gray} />
            <TextInput
              style={styles.inputStyle}
              onChangeText={names => setFullName(names)}
              placeholder="Full Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="name-phone-pad"
              returnKeyType="next"
              onSubmitEditing={() => Keyboard.dismiss()}
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              color={COLORS.black}
            />
          </View>
          {fullNameError && (
            <Text style={styles.inputError}>{fullNameError}</Text>
          )}
          <View
            style={{
              ...styles.inputContainer,
              alignItems: '',
              paddingVertical: 6,
              borderWidth: 0,
            }}>
            <FontAwesomeIcon icon={pin} color={COLORS.gray} />
            <View style={{gap: 6, flex: 1}}>
              <Text
                style={{
                  fontFamily: FONT.medium,
                  fontSize: 16,
                }}>
                Customer's location
              </Text>
              <Text
                style={{
                  fontFamily: FONT.regular,
                }}>
                {address}
              </Text>
              <TouchableOpacity
                style={styles.btnPick}
                onPress={() => handlePressPick()}>
                <FontAwesomeIcon icon={mapPick} color={COLORS.primary} />
                <Text style={styles.txtPick}>CHANGE LOCATION</Text>
              </TouchableOpacity>
            </View>
          </View>
          {errorText.length > 0 ? <Text>{errorText}</Text> : null}

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btnTextContainer}
              onPress={handleAddCustomer}>
              <Text style={styles.btnText}>ADD CUSTOMER</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnTextContainerOutline}
              onPress={handleCancel}>
              <Text style={styles.btnTextOutline}>CANCEL</Text>
            </TouchableOpacity>
            {isLoading && <ActivityIndicator size="large" />}
          </View>
        </View>
      </KeyboardAvoidingView>
      <PickViewModal
        isVisible={isPickVisible}
        setIsVisible={setIsPickVisible}
        dispatch={dispatch}
        location={location}
        setLocation={setLocation}
        userLocation={curPosition}
        address={address}
        rawAddress={rawAddress}
      />
    </View>
  );
};
const PickViewModal = ({
  isVisible,
  setIsVisible,
  dispatch,
  location,
  setLocation,
  userLocation,
  address,
  rawAddress,
}) => {
  const initialRegion = {
    ...location,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [zoom, setZoom] = useState(14);

  const _map = useRef(null);

  const onMarkerPress = mapEventData => {};

  const handlePressMap = pressCoord => {
    setLocation(pressCoord);
    const [latDelta, longDelta] = getLatLongDelta(zoom, pressCoord.latitude);
    _map.current.animateToRegion(
      {
        ...pressCoord,
        latitudeDelta: latDelta,
        longitudeDelta: longDelta,
      },
      500,
    );
  };

  const handlePressUserLocation = () => {
    handlePressMap(userLocation);
  };

  const handlePressClose = () => {
    setIsVisible(false);
  };

  const handleZoom = (isZoomIn = false) => {
    let currentZoomLevel = zoom;
    // if zoomlevel set to max value and user click on minus icon, first decrement the level before checking threshold value
    if (!isZoomIn && currentZoomLevel === MAX_ZOOM_LEVEL) {
      currentZoomLevel -= 1;
    }
    // if zoomlevel set to min value and user click on plus icon, first increment the level before checking threshold value
    else if (isZoomIn && currentZoomLevel === MIN_ZOOM_LEVEL) {
      currentZoomLevel += 1;
    }
    if (
      currentZoomLevel >= MAX_ZOOM_LEVEL ||
      currentZoomLevel <= MIN_ZOOM_LEVEL
    ) {
      return;
    }

    currentZoomLevel = isZoomIn ? currentZoomLevel + 1 : currentZoomLevel - 1;
    const zoomedInRegion = {
      ...selectedRegion,
      latitudeDelta: getLatLongDelta(
        currentZoomLevel,
        selectedRegion.latitude,
      )[1],
      longitudeDelta: getLatLongDelta(
        currentZoomLevel,
        selectedRegion.latitude,
      )[0],
    };

    setSelectedRegion(zoomedInRegion);
    setZoom(currentZoomLevel);
    _map?.current?.animateToRegion(zoomedInRegion, 100);
  };

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setIsVisible(false);
      }}>
      <View style={styles.modalCtnr}>
        <MapView
          ref={_map}
          style={styles.mapContainer}
          showUserLocation
          followUserLocation
          initialRegion={selectedRegion}
          onRegionChangeComplete={region => {
            setSelectedRegion(region);
          }}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          onPress={e => handlePressMap(e.nativeEvent.coordinate)}
          loadingEnabled>
          <Marker
            coordinate={location}
            onPress={e => onMarkerPress(e.nativeEvent.coordinate)}>
            <Animated.View>
              <Text style={styles.txtMarker}>The customer is here</Text>
              <Animated.Image
                source={images.pin}
                style={[styles.imgMarker]}
                resizeMode="cover"
              />
            </Animated.View>
          </Marker>
        </MapView>
        {/* Zooms buttons */}
        <View style={styles.zoomCtnr}>
          <TouchableOpacity
            style={{padding: 6}}
            onPress={() => handleZoom(true)}
            disabled={zoom === MAX_ZOOM_LEVEL}>
            <FontAwesomeIcon
              icon={mapZoomInIcon}
              size={14}
              color={COLORS.secondary}
              style={{opacity: zoom === MAX_ZOOM_LEVEL ? 0.2 : 1}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{padding: 6}}
            onPress={() => handleZoom()}
            disabled={zoom === MIN_ZOOM_LEVEL}>
            <FontAwesomeIcon
              icon={mapZoomOutIcon}
              size={14}
              color={COLORS.secondary}
              style={{opacity: zoom === MIN_ZOOM_LEVEL ? 0.2 : 1}}
            />
          </TouchableOpacity>
        </View>
        {/* Bottom View */}
        <View style={styles.bottomCtnr}>
          <FontAwesomeIcon icon={pin} size={24} color={COLORS.white} />
          {rawAddress && (
            <Text style={styles.txtCity}>
              {rawAddress[4].long_name}, {rawAddress[5].long_name}
            </Text>
          )}
          <Text style={styles.txtAddress} numberOfLines={3}>
            {address}
          </Text>
          <TouchableOpacity
            style={{
              ...styles.btnTextContainer,
              flex: 0,
              alignSelf: 'center',
              marginTop: 10,
              backgroundColor: COLORS.white,
            }}
            onPress={handlePressClose}>
            <Text style={{...styles.btnText, color: COLORS.secondary}}>
              SAVE
            </Text>
          </TouchableOpacity>
        </View>
        {/* Button User Location */}
        <TouchableOpacity
          style={styles.btnLocation}
          onPress={handlePressUserLocation}>
          <FontAwesomeIcon
            icon={userLocationIcon}
            size={22}
            color={COLORS.secondary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnClose} onPress={handlePressClose}>
          <FontAwesomeIcon icon={backIcon} size={22} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
CreationCustomerScreen.sharedElements = route => {
  return [
    {
      id: 'btnCreateCustomerId',
    },
  ];
};

export default CreationCustomerScreen;
