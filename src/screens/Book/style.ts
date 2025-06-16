import {Dimensions, StyleSheet} from 'react-native';
import COLORS from '../../utils/Colors';
import {horizontalScale, verticalScale} from '../../utils/Metrics';
const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 110,
    backgroundColor: '#23405B',
    borderBottomRightRadius: 80,
    zIndex: 0,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 22,
    zIndex: 1,
  },
  flashSale: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  chooseDiscount: { fontSize: 14, color: '#666', marginTop: 4 },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginVertical: 18,
    zIndex: 1,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabSelected: {
    backgroundColor: '#fff',
    borderColor: '#2563eb',
    borderWidth: 2,
  },
  tabText: {
    color: '#222',
    fontWeight: '600',
  },
  tabTextSelected: {
    color: '#2563eb',
  },
  discountHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 8,
    color: '#222',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: CARD_WIDTH,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
    backgroundColor: '#f6f6f6',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#f43f5e',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  productName: {
    fontSize: 13,
    marginTop: 8,
    color: '#222',
    fontWeight: '500',
    minHeight: 32,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  newPrice: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
  },
});
export default styles