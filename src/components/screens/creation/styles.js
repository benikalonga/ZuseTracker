import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 24,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
    borderRadius: 200,
    borderColor: COLORS.black,
    borderWidth: 3,
  },
  avatar: {
    width: 80,
    height: 80,
  },
  name: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 18,
  },
  userInfo: {
    color: COLORS.black,
  },

  btnTextContainer: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  btnText: {
    color: COLORS.white,
    fontWeight: '400',
    textTransform: 'uppercase',
  },

  btnTextContainerOutline: {
    borderRadius: 8,
    borderBlockColor: COLORS.grey,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  btnTextOutline: {
    color: COLORS.primary,
    fontWeight: '400',
    textTransform: 'uppercase',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 6,
    gap: 6,
    borderColor: '#dadae8',
  },
  inputStyle: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    gap: 10,
  },
  inputError: {
    color: COLORS.red,
  },

  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  mapContainer: {
    width: '100%',
    height: '70%',
    backgroundColor: COLORS.black,
  },
});
