import {StyleSheet} from 'react-native';
import COLORS from '../../utils/Colors';
import {horizontalScale, responsiveFontSize, verticalScale} from '../../utils/Metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  headerText: {
    textAlign: 'left',
    marginTop: verticalScale(20),
    fontSize: 24,
    marginBottom: verticalScale(10),
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
    profileImage2: {
    width: 68,
    height: 68,
    borderRadius: 24,
    marginRight: 16,
  },
  editProfileButton: {
    backgroundColor: '#0066FF',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  editProfileText: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize:responsiveFontSize(20),
    marginBottom: 8,
  },
  menuList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 30,
    // Optional: shadow styling
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    justifyContent: 'space-between',
  },
  menuItemText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
  },
    backButton: {
    position: 'absolute',
    top: verticalScale(20),
    left: 10,
    zIndex: 1,
    padding: 8,
  },
});
export default styles