import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Modal,
  ToastAndroid,
} from 'react-native';
import {styles} from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUserCircle as userIcon,
  faLocationPin as pinIcon,
  faMapLocation as mapIcon,
  faGlobe as mailIcon,
  faPhone as phoneIcon,
  faClose as closeICon,
  faArrowLeft as backICon,
  faUserEdit as editIcon,
  faSave as saveIcon,
} from '@fortawesome/free-solid-svg-icons';
import {COLORS, FONT} from '../../../constants/theme';
import LoadingView from '../../common/loading/LoadingView';
import {ErrorView} from '../../common/error/ErrorView';
import {useDispatch, useSelector} from 'react-redux';
import {getCustomerById, updateCustomer} from '../../../store/customerSlice';
import {useGeoCoding} from '../../../hooks/useGeoCoding';
import {SharedElement} from 'react-navigation-shared-element';

/**
 * The Detail component
 */
const {width} = Dimensions.get('window');

const DetailScreen = ({navigation, route}) => {
  /** useSelectors */
  const customer = useSelector(state => state.customers.customer);
  const isLoading = useSelector(state => state.customers.isLoading);
  const errorText = useSelector(state => state.customers.error);

  const routeCustomer = route.params.customer;
  const index = route.params.index;

  const [address] = useGeoCoding(routeCustomer.location, 'getting address...');
  const [isEditVisible, setIsEditVisible] = useState(false);

  /** useDispatchers */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomerById(routeCustomer.id));
  }, []);

  const reFetch = () => {
    dispatch(getCustomerById(routeCustomer.id));
  };

  const handlePressBack = () => {
    navigation.goBack();
  };
  const handlePressEdit = routeCustomer => {
    setIsEditVisible(true);
  };
  const handlePressMap = routeCustomer => {
    navigation.navigate('Map', index);
  };

  return (
    <SafeAreaView style={styles.mainStyle}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <View style={styles.container}>
        <View style={styles.header}>
          <SharedElement id={`customer.${route.params.customer.id}.icon`}>
            <FontAwesomeIcon icon={userIcon} size={120} color={COLORS.gray2} />
          </SharedElement>
          <SharedElement id={`customer.${route.params.customer.id}.txt`}>
            <Text style={{...styles.userName, color: COLORS.primary}}>
              {routeCustomer.name}
              {customer.age && ', ' + customer.age}
            </Text>
          </SharedElement>
        </View>
        {isLoading && <LoadingView />}
        {errorText && <ErrorView onRefresh={reFetch} />}
        {customer && (
          <View style={styles.content}>
            <View style={styles.contentChild}>
              <FontAwesomeIcon
                icon={pinIcon}
                size={28}
                color={COLORS.tertiary}
              />
              <View style={{flex: 1}}>
                <Text style={styles.userName}>{routeCustomer.city}</Text>
                <Text style={{fontFamily: FONT.regular}}>{address}</Text>
              </View>
            </View>
            <View style={styles.contentChild}>
              <FontAwesomeIcon
                icon={mailIcon}
                size={28}
                color={COLORS.secondary}
              />
              <Text style={styles.userName}>{customer.email}</Text>
            </View>
            <View style={styles.contentChild}>
              <FontAwesomeIcon
                icon={phoneIcon}
                size={28}
                color={COLORS.secondary}
              />
              <Text style={styles.userName}>{customer.phone}</Text>
            </View>

            <View
              style={{
                ...styles.contentChild,
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => handlePressMap(customer)}
                style={styles.btnOnMap}>
                <FontAwesomeIcon
                  icon={mapIcon}
                  size={28}
                  color={COLORS.white}
                />
                <Text style={styles.txtOnMap}>VIEW ON THE MAP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePressEdit(routeCustomer)}
                style={styles.btnEdit}>
                <FontAwesomeIcon
                  icon={editIcon}
                  size={28}
                  color={COLORS.white}
                />
                <Text style={styles.txtOnMap}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.btnBack} onPress={handlePressBack}>
        <FontAwesomeIcon icon={backICon} size={22} color={COLORS.secondary} />
      </TouchableOpacity>
      <EditViewModal
        isEditVisible={isEditVisible}
        setIsEditVisible={setIsEditVisible}
        dispatch={dispatch}
        customer={customer}
      />
    </SafeAreaView>
  );
};

const EditViewModal = ({
  isEditVisible,
  setIsEditVisible,
  dispatch,
  customer,
}) => {
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSave = () => {
    dispatch(updateCustomer({age, email, phone}));
    setIsEditVisible(false);
    ToastAndroid.show(`${customer.name} updated`, ToastAndroid.SHORT);
  };

  const handleOnShowModal = () => {
    setAge(customer.age + '');
    setEmail(customer.email);
    setPhone(customer.phone);
  };

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={isEditVisible}
      onShow={handleOnShowModal}
      onRequestClose={() => {
        setIsEditVisible(false);
      }}>
      <View style={styles.modalCtnr}>
        <View style={styles.modalContent(width)}>
          <Text style={styles.txtTitle}>EDITING OF CUSTOMER</Text>
          <Text
            style={{
              ...styles.userName,
              color: COLORS.primary,
              alignSelf: 'center',
            }}>
            {customer.name}
          </Text>
          {/* Age */}
          <View style={styles.rowCtnr}>
            <FontAwesomeIcon icon={userIcon} size={16} color={COLORS.gray} />
            <Text style={{color: COLORS.gray}}>Age</Text>
            <TextInput
              placeholder="Customer's age"
              value={age}
              selectTextOnFocus
              numberOfLines={1}
              onChangeText={txt => setAge(txt)}
              keyboardType="decimal-pad"
              style={{color: COLORS.black}}
            />
          </View>
          {/* Email */}
          <View style={styles.rowCtnr}>
            <FontAwesomeIcon icon={mailIcon} size={16} color={COLORS.gray} />
            <Text style={{color: COLORS.gray}}>Email</Text>
            <TextInput
              placeholder="Customer's email"
              value={email}
              selectTextOnFocus
              numberOfLines={1}
              onChangeText={txt => setEmail(txt)}
              keyboardType="email-address"
              style={{color: COLORS.black}}
            />
          </View>
          {/* Phone */}
          <View style={styles.rowCtnr}>
            <FontAwesomeIcon icon={phoneIcon} size={16} color={COLORS.gray} />
            <Text style={{color: COLORS.gray}}>Phone</Text>
            <TextInput
              placeholder="Customer's phone"
              value={phone}
              selectTextOnFocus
              numberOfLines={1}
              onChangeText={txt => setPhone(txt)}
              keyboardType="phone-pad"
              style={{color: COLORS.black}}
            />
          </View>
          {/* Modal Buttons  */}
          <View style={styles.btnCtnr}>
            <TouchableOpacity
              onPress={() => handleSave(customer)}
              style={styles.btnSave}>
              <FontAwesomeIcon icon={saveIcon} size={28} color={COLORS.white} />
              <Text style={styles.txtSave}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsEditVisible(false)}
              style={styles.btnCancel}>
              <FontAwesomeIcon
                icon={closeICon}
                size={28}
                color={COLORS.white}
              />
              <Text
                style={{
                  ...styles.txtSave,
                  marginRight: 6,
                }}>
                CANCEL
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

DetailScreen.sharedElements = route => {
  const customer = route.params.customer;
  return [
    {
      id: `customer.${customer.id}.icon`,
    },
    {
      id: `customer.${customer.id}.txt`,
      animation: '',
      resize: 'clip',
    },
  ];
};

export default DetailScreen;
