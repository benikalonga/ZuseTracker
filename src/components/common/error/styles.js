import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/theme';

export const styles = StyleSheet.create({
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    gap: 10,
  },

  errorImg: {
    height: 80,
    resizeMode: 'contain',
  },
  errorBtnTextContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.error,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  btnText: {
    color: COLORS.error,
    fontWeight: '400',
  },
  txt: {
    color: '#a7a7a7',
  },
});
