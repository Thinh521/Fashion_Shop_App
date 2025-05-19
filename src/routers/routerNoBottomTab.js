import {TouchableOpacity} from 'react-native';
import LoginScreen from '../screens/Auth/Login';
import RegisterScreen from '../screens/Auth/Register';
import CheckoutScreen from '../screens/Checkout';
import {LeftIcon, WishListIcon} from '../assets/icons/Icons';
import PlaceoderScreen from '../screens/Placeoder';
import ShippingScreen from '../screens/Shipping';
import ProductDetailScreen from '../screens/ProductDetail/ProductDetailScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword';
import Onboarding from '../screens/Onboarding';
import LoginRequiredScreen from '../screens/Auth/Login/LoginRequiredScreen';
import CartIconHeader from '../components/CartIcon/CartIcon';

const routerNoBottomTab = [
  {
    name: 'Onboarding',
    component: Onboarding,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'LoginRequired',
    component: LoginRequiredScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Login',
    component: LoginScreen,
    options: {
      title: 'Login',
      headerShown: false,
    },
  },
  {
    name: 'Register',
    component: RegisterScreen,
    options: {
      title: 'Register',
      headerShown: false,
    },
  },
  {
    name: 'Forgotpassword',
    component: ForgotPasswordScreen,
    options: {
      title: 'Forgotpassword',
      headerShown: false,
    },
  },
  {
    name: 'Checkout',
    component: CheckoutScreen,
    options: ({navigation}) => ({
      title: 'Checkout',
      headerTitle: 'Checkout',
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginLeft: 16}}>
          <LeftIcon />
        </TouchableOpacity>
      ),
    }),
  },
  {
    name: 'Placeorder',
    component: PlaceoderScreen,
    options: ({navigation}) => ({
      title: 'Placeorder',
      headerTitle: 'Shopping Bag',
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginLeft: 16}}>
          <LeftIcon />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 16}}>
          <WishListIcon fill="black" />
        </TouchableOpacity>
      ),
    }),
  },
  {
    name: 'Shipping',
    component: ShippingScreen,
    options: ({navigation}) => ({
      title: 'Shipping',
      headerTitle: 'Checkout',
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginLeft: 16}}>
          <LeftIcon />
        </TouchableOpacity>
      ),
    }),
  },
  {
    name: 'ProductDetail',
    component: ProductDetailScreen,
    options: ({navigation}) => ({
      title: 'ProductDetail',
      headerTitle: ' ',
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginLeft: 16}}>
          <LeftIcon />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MainTabNavigator', {screen: 'Search'})
          }
          style={{paddingRight: 25, paddingTop: 10}}>
          <CartIconHeader />
        </TouchableOpacity>
      ),
    }),
  },
];

export default routerNoBottomTab;
