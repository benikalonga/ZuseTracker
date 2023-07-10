import {StyleSheet} from 'react-native';
import {FONT, SIZES, COLORS} from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  toolbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    minHeight: 82,
    alignItems: 'center',
    gap: 4,
    paddingTop: 4,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
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
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
    marginBottom: 10,
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    backgroundColor: COLORS.white,
    gap: 6,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.grey,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.medium,
    height: '100%',
    gap: 10,
    paddingHorizontal: 14,
  },
  searchInput: {
    fontFamily: FONT.regular,
    flex: 1,
  },
  searchBtn: (width = 50) => ({
    width: width,
    height: '100%',
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  searchBtnImage: {
    width: '50%',
    height: '50%',
    tintColor: COLORS.white,
  },
});