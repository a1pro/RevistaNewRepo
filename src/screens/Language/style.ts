import {StyleSheet} from 'react-native';
import COLORS from '../../utils/Colors';
import {horizontalScale, verticalScale} from '../../utils/Metrics';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    // marginTop: 12,
    marginBottom: verticalScale(60),
    textAlign:"center",
    top: verticalScale(25),
    color: '#111',
  },
   backButton: {
    position: 'absolute',
    left: 20,
    top: verticalScale(25),
    zIndex: 1,
    padding: 8,
  },
  label: {
    fontSize: 15,
    color: '#444',
    marginBottom: 10,
    marginLeft: 2,
  },
  optionsContainer: {
    marginTop: 4,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionSelected: {
    backgroundColor: '#F3F7FF',
    borderColor: '#2676FD',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  optionTextSelected: {
    fontWeight: 'bold',
    color: '#2676FD',
  },
  iconContainer: {
    width: 28,
    alignItems: 'flex-end',
  },
});
export default styles