import React, {useState, createRef} from 'react';
import images from '../../../constants/images';
import * as RootNavigation from '../../../RootNavigation';
const {
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} = require('react-native');
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../../store/userSlice';
import {COLORS} from '../../../constants/theme';
import {
  faSearch,
  faUserTie as userIcon,
  faLocationPin as pin,
  faMapLocation as map,
  faMap as mapIcon,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

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

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView enabled>
        <View style={styles.content}>
          <FontAwesomeIcon icon={userIcon} size={82} />
          <Text style={styles.titleText}>Get access every where</Text>
          <Text>Log in to use all the features</Text>
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
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
