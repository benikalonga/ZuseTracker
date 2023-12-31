import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  RefreshControl,
  Platform,
  Animated,
} from 'react-native';
import {styles} from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSearch,
  faUserCircle as userIcon,
  faLocationPin as pin,
  faMapLocation as map,
  faMap as mapIcon,
  faCar as carIcon,
  faSortAlphaAsc as sortAlphaIcon,
  faSortNumericAsc as sortDistanceIcon,
  faUserPlus as creatCustomerIcon,
} from '@fortawesome/free-solid-svg-icons';
import {COLORS, FONT} from '../../../constants/theme';
import LoadingView from '../../common/loading/LoadingView';
import {ErrorView} from '../../common/error/ErrorView';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearCustomer,
  getCustomers,
  updateCustomerOffline,
  updateCustomersSort,
} from '../../../store/customerSlice';
import {useGeoCoding} from '../../../hooks/useGeoCoding';
import {calcDistance, useOpacityAnimation} from '../../../utils/utils';
import * as RootNavigation from '../../../RootNavigation';
import {SharedElement} from 'react-navigation-shared-element';
import {Toolbar} from '../../common/Toolbar';

/**
 * The HomeScreen component
 */

const OFFLINE_MODE = -1;
const SORTING = {ALPHABET: 'A', DISTANCE: 'D'};

const HomeScreen = ({navigation}) => {
  /** useSelectors */
  const customerList = useSelector(state => state.customers.customers);
  const user = useSelector(state => state.user.user);

  const customerListOffline = useSelector(
    state => state.customers.customersOffline,
  );
  const isLoading = useSelector(state => state.customers.isLoading);
  const errorText = useSelector(state => state.customers.error);

  const curPosition = useSelector(state => state.user.position);

  const [searchTerm, setSearchTerm] = useState(null);
  const inputSearch = useRef(null);

  const [refreshing, setRefreshing] = useState(false);
  const [sort, setSort] = useState(SORTING.DISTANCE);

  /** useDispatchers */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  const onRefresh = useCallback(() => {
    dispatch(getCustomers());
  });
  const reFetch = () => {
    dispatch(getCustomers());
  };

  const handleClickItem = (customer, index) => {
    dispatch(clearCustomer());
    dispatch(updateCustomerOffline(customer));
    navigation.navigate('Detail', {customer, index});
  };
  const handleClickMap = (customer, index) => {
    dispatch(updateCustomerOffline(customer));
    navigation.navigate('Map', index);
  };

  const handleSort = () => {
    dispatch(updateCustomersSort({sort, curPosition}));
    console.log(sort);
    const curSort =
      sort === SORTING.ALPHABET ? SORTING.DISTANCE : SORTING.ALPHABET;

    setSort(curSort);
  };
  const handleCreateCustomer = () => {
    user.token
      ? RootNavigation.navigate('Creation')
      : RootNavigation.navigate('Login');
  };

  //always check if the inputSearch is not empty, then filter the list
  let customerListDisplayed =
    searchTerm && searchTerm.length > 0
      ? customerList
          .slice()
          .filter(
            item =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.city.toLowerCase().includes(searchTerm.toLowerCase()),
          )
      : customerList;

  customerListDisplayed = [{id: -1}, ...customerListDisplayed];

  return (
    <SafeAreaView style={styles.mainStyle}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <Toolbar />
      <View style={styles.container}>
        {customerList && (
          <FlatList
            data={customerListDisplayed}
            renderItem={({item, index}) =>
              index === 0 ? (
                <SearchView
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  inputSearch={inputSearch}
                  handleCreateCustomer={handleCreateCustomer}
                  sort={sort}
                  setSort={handleSort}
                />
              ) : (
                <CustomerItem
                  customer={item}
                  handleClickItem={handleClickItem}
                  handleClickMap={handleClickMap}
                  userPosition={curPosition}
                  key={index}
                  index={index - 1}
                />
              )
            }
            keyExtractor={customer => customer.id}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={<HeaderList />}
            contentContainerStyle={{
              rowGap: 10,
              paddingBottom: Platform.OS === 'android' ? 132 : 0,
            }}
            ItemSeparatorComponent={
              <View style={{height: 1, backgroundColor: COLORS.grey}} />
            }
            stickyHeaderIndices={[1]}
          />
        )}
        {isLoading && <LoadingView />}
        {errorText && (
          <ErrorView onRefresh={reFetch}>
            {customerListOffline.length > 0 && (
              <>
                <Text style={{marginTop: 10}}>CONNECTION ISSUE</Text>
                <TouchableOpacity
                  style={styles.btnOffMap}
                  onPress={() => navigation.navigate('Map', OFFLINE_MODE)}>
                  <FontAwesomeIcon
                    icon={mapIcon}
                    color={COLORS.white}
                    size={24}
                  />
                  <Text style={{color: COLORS.white}}>VIEW SAVED DATA</Text>
                </TouchableOpacity>
              </>
            )}
          </ErrorView>
        )}
      </View>
      {customerList && !isLoading && !errorText && (
        <TouchableOpacity
          style={styles.btnMap}
          onPress={() => navigation.navigate('Map', 0)}>
          <FontAwesomeIcon icon={mapIcon} color={COLORS.tertiary} size={24} />
          <Text style={{color: COLORS.tertiary}}>OPEN ON THE MAP</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const HeaderList = ({handleClick}) => {
  return (
    <View>
      <Text style={styles.userName}>Hello, ZuseTracker!</Text>
      <Text style={styles.welcomeMessage}>Find a customer here!</Text>
    </View>
  );
};

const SearchView = ({
  searchTerm,
  setSearchTerm,
  inputSearch,
  handleCreateCustomer,
  sort,
  setSort,
}) => {
  const user = useSelector(state => state.user.user);
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={text => {
            setSearchTerm(text);
          }}
          selectTextOnFocus
          placeholder="Who are you looking for?"
          ref={inputSearch}
          autoCapitalize="none"
        />
        <FontAwesomeIcon icon={faSearch} color={COLORS.dark} />
      </View>
      <TouchableOpacity style={styles.searchBtn()} onPress={setSort}>
        <FontAwesomeIcon
          icon={sort === SORTING.ALPHABET ? sortAlphaIcon : sortDistanceIcon}
          color={COLORS.secondary}
          size={24}
        />
      </TouchableOpacity>
      {user.token && (
        <TouchableOpacity
          style={{...styles.searchBtn(), backgroundColor: COLORS.grey}}
          onPress={handleCreateCustomer}>
          <SharedElement id="btnCreateCustomerId">
            <FontAwesomeIcon
              icon={creatCustomerIcon}
              color={COLORS.secondary}
              size={24}
            />
          </SharedElement>
        </TouchableOpacity>
      )}
    </View>
  );
};

const CustomerItem = ({
  customer,
  index,
  handleClickItem,
  handleClickMap,
  userPosition,
}) => {
  const [address] = useGeoCoding(customer.location);
  const distance = parseFloat(
    calcDistance(userPosition, customer.location),
  ).toFixed(2);

  const opacity = useOpacityAnimation(100, 0);

  return (
    <Animated.View style={{opacity}}>
      <TouchableOpacity
        style={{...styles.btnItem}}
        onPress={() => handleClickItem(customer, index)}>
        <SharedElement id={`customer.${customer.id}.icon`}>
          <FontAwesomeIcon icon={userIcon} size={54} color={COLORS.gray2} />
        </SharedElement>
        <View style={styles.itemCtnr}>
          <SharedElement id={`customer.${customer.id}.txt`}>
            <Text style={{...styles.userName, color: COLORS.primary}}>
              {customer.name}
            </Text>
          </SharedElement>

          <View style={styles.itemCtnr2}>
            <FontAwesomeIcon icon={pin} color={COLORS.secondary} />
            <Text style={styles.itemTxtCity}>{customer.city}</Text>
          </View>
          <Text numberOfLines={1}>{address}</Text>
          <View style={styles.itemTxtDistance}>
            <FontAwesomeIcon icon={carIcon} />
            {distance === '0.00' ? (
              <Text>SAME PLACE WITH YOU</Text>
            ) : (
              <Text style={{fontFamily: FONT.medium}}>{distance} KM</Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={() => handleClickMap(customer, index)}>
          <FontAwesomeIcon icon={map} size={32} color={COLORS.secondary} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default HomeScreen;
