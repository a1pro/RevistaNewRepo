import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  addressContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addressText: {
    color: '#555',
  },
  cartItemRow: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 1,
  },
  cartImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  emptyCartContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
emptyCartText: {
  fontSize: 16,
  color: '#666',
},
  cartTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  cartDescription: {
    fontSize: 12,
    color: '#666',
    marginVertical: 4,
  },
  cartPrice: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 14,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 12,
    marginLeft: 10,
    paddingHorizontal: 5,
  },
  qtyBtn: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  qtyText: {
    marginHorizontal: 6,
    fontWeight: 'bold',
    fontSize: 14,
  },
  qtySymbol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    
    borderColor: '#ddd',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    // borderTopWidth: 1,
    fontWeight: 'bold',
    marginBottom:20
  },
  checkoutBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  clearCartBtn: {
  backgroundColor: '#ff4444',
  borderRadius: 8,
  paddingHorizontal: 16,
  paddingVertical: 10,
  alignItems: 'center',
},
clearCartText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
deleteIcon: {
  position: 'absolute',
  top: 0,
  right: 8,
  zIndex: 1,
},
});
