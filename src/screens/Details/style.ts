import {StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../utils/Colors';
import {horizontalScale, verticalScale} from '../../utils/Metrics';

const {width} = Dimensions.get('window');
const CARD_MARGIN = horizontalScale(10);
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: verticalScale(16),
    marginBottom: verticalScale(20),
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.appColor,
    marginRight:verticalScale(50)
  },
  banner: {
    width: '100%',
    height: verticalScale(95),
    borderRadius: 10,
    marginBottom: verticalScale(18),
    alignSelf: 'center',
  },
  productList: {
    paddingHorizontal: CARD_MARGIN,
    paddingBottom: verticalScale(16),
  },
  productCard: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    margin: CARD_MARGIN / 2,
    width: CARD_WIDTH,
    padding: horizontalScale(10),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: verticalScale(120),
    marginBottom: verticalScale(8),
  },
  productName: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: verticalScale(4),
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: verticalScale(4),
  },
});

export default styles;
