import {StyleSheet} from 'react-native';
import COLORS from '../../utils/Colors';
import {horizontalScale, verticalScale} from '../../utils/Metrics';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  innerContainer: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'left' },
  addressBox: {
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    padding: 16,
    marginTop: 10,
  },
  label: { fontWeight: 'bold', fontSize: 15, marginTop: 10 },
  value: { fontSize: 15, marginTop: 2, marginBottom: 4, color: COLORS.textColor },
});
export default styles