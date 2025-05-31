import {StyleSheet} from 'react-native';
import COLORS from '../../utils/Colors';
import {horizontalScale, verticalScale} from '../../utils/Metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor || '#fff',
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 40, // Same width as back button to center the title
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workingText: {
    fontSize: 18,
    color: COLORS.textColor || '#333',
  },
});

export default styles;
