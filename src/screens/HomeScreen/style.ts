import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/Metrics';
import COLORS from '../../utils/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10),
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: '#e53935',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  rightBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  arabicHome: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#4d574d', // dark green/black
    marginRight: 6,
  },
  logoImg: {
    width: 54,
    height: 54,
    marginHorizontal: 2,
  },
  revistaText: {
    fontSize: 20,
    color: COLORS.revista, // gold
    fontWeight: 'bold',
    marginLeft: 3,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(5),
    marginBottom: verticalScale(10),
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
  },
});
