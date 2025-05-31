import { Category } from "../screens/AllCategories/AllCategories";

export type Product = {
  quantity: number;
  id: string;
  name: string;
  image: any;
  price: number;
};


export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Forgot: undefined;
  NewPassword: undefined;
  PasswordRecovery: undefined;
  BannerSlider: undefined;
  Home: undefined;
  Dashboard: undefined;
  HomemadeProducts: undefined;
   AllCategories: undefined;
  SubCategories: { category: Category };
  Details: { subCategory: string };
  ProductDetails: { product: Product };
  Profile:undefined;
  AddtoCart:undefined;
  Magzine:undefined;
  EditProfile:undefined;
  WishList:undefined;
  Address:undefined;
  Order:undefined;
  Language:undefined;
  SaveAddress:undefined;
  Terms:undefined;
};


