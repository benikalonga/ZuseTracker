import {StyleSheet} from 'react-native';
import {COLORS, FONT, SHADOWS} from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 10,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    margin: 30,
  },
  avatar: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
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
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginTop: 20,
  },
  btnText: {
    color: COLORS.white,
    fontWeight: '400',
    marginRight: 6,
    textTransform: 'uppercase',
  },
  txtDescrip: {fontFamily: FONT.medium, textAlign: 'justify'},
  btnBack: {
    position: 'absolute',
    zIndex: 999,
    margin: 10,
    borderRadius: 54,
    padding: 8,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
});
