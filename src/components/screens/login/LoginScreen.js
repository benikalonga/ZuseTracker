import React, {useState, createRef, useRef, useEffect} from 'react';
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
  Animated,
} = require('react-native');
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../../store/userSlice';
import {COLORS} from '../../../constants/theme';
import {faUserTie as userIcon} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {SharedElement} from 'react-navigation-shared-element';

/**
 * LoginScreen, post the email and password to the API and listen to the response event
 * if success, update the user object and store it in the local storage
 */
const LoginScreen = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const isLoading = useSelector(state => state.user.isLoading);
  const errorText = useSelector(state => state.user.error);
  const user = useSelector(state => state.user.user);

  const dispatch = useDispatch();

  const passwordInputRef = createRef();

  // If Success
  if (!isLoading && user.token) {
    ToastAndroid.show(`Welcome, ${user.name}!`, ToastAndroid.SHORT);
    setTimeout(() => {
      RootNavigation.goBack();
    }, 1000);
  }

  const handleLogIn = () => {
    if (!userEmail) {
      setEmailError('Enter a valid email address');
      return;
    } else setEmailError('');
    if (!userPassword) {
      setPasswordError('Enter a valid password');
      return;
    } else setPasswordError('');

    Keyboard.dismiss();
    dispatch(loginUser({userEmail, userPassword}));
  };

  const handleCancel = () => {
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
    <View style={styles.container}>
      <KeyboardAvoidingView enabled>
        <View style={styles.content}>
          <SharedElement id="btnUserId">
            <FontAwesomeIcon icon={userIcon} size={82} />
          </SharedElement>
          <Text style={styles.titleText}>Get access every where</Text>
          <Text>Log in to use all the features</Text>
          <Animated.View
            style={{
              ...styles.content,
              width: '100%',
              paddingHorizontal: 0,
              marginTop: 0,
              opacity,
            }}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserEmail => setUserEmail(UserEmail)}
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              color={COLORS.black}
            />
            {emailError && <Text style={styles.inputError}>{emailError}</Text>}
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserPassword => setUserPassword(UserPassword)}
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
              ref={passwordInputRef}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry={true}
              underlineColorAndroid="#f000"
              returnKeyType="next"
              color={COLORS.black}
            />

            {passwordError && (
              <Text style={styles.inputError}>{passwordError}</Text>
            )}

            {errorText?.message ? <Text>{errorText}</Text> : null}

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btnTextContainer}
                onPress={handleLogIn}>
                <Text style={styles.btnText}>Log in</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnTextContainerOutline}
                onPress={handleCancel}>
                <Text style={styles.btnTextOutline}>Cancel</Text>
              </TouchableOpacity>
              {isLoading && <ActivityIndicator size="large" />}
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

LoginScreen.sharedElements = route => {
  return [{id: 'btnUserId', otherId: 'btnUserId'}];
};
export default LoginScreen;
