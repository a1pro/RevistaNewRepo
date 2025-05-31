import { StyleSheet } from "react-native";
import COLORS from "../../utils/Colors";
import { verticalScale } from "../../utils/Metrics";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerImage: {
        width: '100%',
        height: 320,
        backgroundColor: '#f7f7f7',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 18,
        margin: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: COLORS.black,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingText: {
        fontSize: 15,
        color: '#333',
        marginRight: 6,
    },
    reviewText: {
        fontSize: 14,
        color: '#888',
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.appColor || '#007bff',
        marginBottom: 10,
    },
    currency: {
        fontWeight: 'normal',
        fontSize: 16,
        color: COLORS.black,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 4,
        color: COLORS.black,
        marginLeft:verticalScale(20)
    },
    detailsText: {
        fontSize: 15,
        color: '#444',
        marginBottom: 12,
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    qtyBtnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    qtyValue: {
        fontSize: 16,
        fontWeight: '600',
        minWidth: 24,
        textAlign: 'center',
        color: COLORS.black,
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    heartBtn: {
        marginRight: 12,
        padding: 8,
    },
    cartBtn: {
        flex: 1,
        backgroundColor: COLORS.appColor || '#007bff',
        borderRadius: 8,
        alignItems: 'center',
        padding: 12,
        marginRight: 8,
    },
    cartBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buyBtn: {
        backgroundColor: COLORS.appColor || '#f7c948',
        borderRadius: 8,
        alignItems: 'center',
        padding: 12,
        minWidth: 90,
    },
    buyBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    bottomBarUnderline: {
        height: 1,
        backgroundColor: '#eee',
        width: '100%',
    },
    similarCard: {
  width: 130,
  marginRight: 12,
  backgroundColor: '#fff',
  borderRadius: 8,
  padding: 8,
  alignItems: 'center',
  elevation: 2,
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  marginLeft:verticalScale(20),
  marginBottom:verticalScale(20)
},
similarImage: {
  width: 90,
  height: 90,
  borderRadius: 6,
  marginBottom: 6,
  backgroundColor: '#f1f1f1',
},
similarName: {
  fontSize: 14,
  fontWeight: '500',
  color: '#222',
  marginBottom: 2,
  textAlign: 'center',
},
similarPrice: {
  fontSize: 13,
  color: '#1663F7',
  fontWeight: 'bold',
},


});
export default styles