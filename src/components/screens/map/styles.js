import {StyleSheet} from 'react-native';
import {COLORS, FONT, SHADOWS, SIZES} from '../../../constants/theme';

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
  txtTitleMarker: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    padding: 4,
    borderRadius: 4,
  },
  imgMarker: {width: 30, height: 30, alignSelf: 'center'},
  btnBack: {
    borderRadius: 54,
    width: 40,
    height: 40,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  headerCtnr: {
    borderRadius: 56,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 12,
    paddingBottom: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  txtAddress: {
    fontFamily: FONT.medium,
    flex: 1,
    textAlign: 'right',
  },
  pgCtnr: {
    position: 'absolute',
    zIndex: 999,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 56,
  },
  pgBottomCtnr: width => ({
    backgroundColor: COLORS.white,
    width: width,
    height: '100%',
    alignSelf: 'center',
    marginTop: 24,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    ...SHADOWS.medium,
  }),
  imgTop: {width: '100%', height: 80, resizeMode: 'cover'},
  content: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
});

export default styles;
