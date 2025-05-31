import {StyleSheet} from 'react-native';
import COLORS from '../../utils/Colors';
import {horizontalScale, verticalScale} from '../../utils/Metrics';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 6,
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft:horizontalScale(30),
    color: COLORS.textColor,
    textAlign:"center"
  },
  inner: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
  // backButton: { marginBottom: 10, marginLeft: -4 },
  header: { fontSize: 22, marginBottom: 14, textAlign: 'left' },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 10,
    marginBottom: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: {
    width: 60,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  orderNumber: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
  },
  deliveryType: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusDelivered: {
    fontSize: 14,
    color: '#2676FD',
    fontWeight: 'bold',
  },
  itemsCount: {
    fontSize: 13,
    color: '#888',
    marginBottom: 12,
  },
  reviewBtn: {
    borderWidth: 1.5,
    borderColor: '#2676FD',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewBtnText: {
    color: '#2676FD',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
export default styles