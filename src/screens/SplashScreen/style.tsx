import {StyleSheet} from 'react-native';
import COLORS from '../../utils/Colors';
import {verticalScale} from '../../utils/Metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor || '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImg: {
    height: '25%',
    width: '80%',
    alignSelf: 'center',
  },
  loader: {
    marginTop: verticalScale(30),
  },
});

export default styles;
