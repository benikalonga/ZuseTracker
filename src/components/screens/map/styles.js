import {StyleSheet} from 'react-native';
import {COLORS, FONT, SIZES} from '../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mapContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  topView: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 10,
    margin: 10,
    gap: 6,
  },
  pagerView: {
    width: '100%',
    height: '36%',
    position: 'absolute',
    bottom: 10,
  },

  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  normal: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
    marginBottom: 10,
  },

  btnToolBar: (width = 46) => ({
    width: width,
    height: width,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.grey,
  }),
  image: width => ({
    width: width,
    height: width,
    borderRadius: width / 3,
  }),
});

export default styles;
