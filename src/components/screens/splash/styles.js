import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: width => ({
    width: width / 3,
    height: width / 3,
  }),
});
