export const base_url = 'https://www.revista-sa.com';

export const Base_Url = {
  login: `${base_url}/api/v4/auth/login`,
  signup: `${base_url}/api/v4/auth/register`,
  banner: ` ${base_url}/api/v4/banners`,
  categories: `${base_url}/api/v4/categories/popular-categories`,
  allcategory:`${base_url}/api/v4/categories`,
  latestpro:`${base_url}/api/v4/products/latest`,
  addtocart:`${base_url}/api/v4/cart/add`,
  getcart:`${base_url}/api/v4/cart`,
  cartremove:`${base_url}/api/v4/cart/remove`,
  clearCart:`${base_url}/api/v4/cart/remove-all`,
  addReview:`${base_url}/api/v4/products/reviews/submit`,
  getAddress:`${base_url}/api/v4/customer/address/list`,
  addWishlist:`${base_url}/api/v4/customer/wish-list/add`,
  wishlistremove:`${base_url}/api/v4/customer/wish-list/remove`,
  getWishlist:`${base_url}/api/v4/customer/wish-list`,
  clearWishlist:`${base_url}/api/v4/customer/wish-list/clear-all`
  
};
