import {TouchableOpacity} from 'react-native';
import LoginScreen from '../screens/Auth/Login';
import RegisterScreen from '../screens/Auth/Register';
import CheckoutScreen from '../screens/Checkout';
import {WishListIcon} from '../assets/icons/Icons';
import PlaceoderScreen from '../screens/Placeoder';
import ShippingScreen from '../screens/Shipping';
import ProductDetailScreen from '../screens/ProductDetail/ProductDetailScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword';
import Onboarding from '../screens/Onboarding';
import LoginRequiredScreen from '../screens/Auth/Login/LoginRequiredScreen';
import CartIconHeader from '../components/CartIcon/CartIcon';
import ProfileEditScreen from '../screens/Setting/ProfileEditScreen';
import CartScreen from '../screens/Cart';
import MapPickerScreen from '../screens/MapPicker/MapPickerScreen';
import OrderScreen from '../screens/order/orderScreen';
import OrderDetailScreen from '../screens/order/OrderDetailScreen';

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
    options: () => ({
      title: 'Checkout',
      headerTitle: 'Checkout',
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
    }),
  },
  {
    name: 'Placeorder',
    component: PlaceoderScreen,
    options: () => ({
      title: 'Placeorder',
      headerTitle: 'Shopping Bag',
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
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
    options: () => ({
      title: 'Shipping',
      headerTitle: 'Checkout',
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
    }),
  },
  {
    name: 'ProductDetail',
    component: ProductDetailScreen,
    options: ({navigation}) => ({
      title: 'ProductDetail',
      headerTitle: 'Product Detail',
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('NoBottomTab', {screen: 'Cart'})}
          style={{paddingRight: 25, paddingTop: 10}}>
          <CartIconHeader />
        </TouchableOpacity>
      ),
    }),
  },
  {
    name: 'Cart',
    component: CartScreen,
    options: ({navigation}) => ({
      title: 'Cart',
      headerTitle: ' ',
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('NoBottomTab', {screen: 'Cart'})}
          style={{paddingRight: 25, paddingTop: 10}}>
          <CartIconHeader />
        </TouchableOpacity>
      ),
    }),
  },
  {
    name: 'ProfileEdit',
    component: ProfileEditScreen,
    options: () => ({
      title: 'ProfileEdit',
      headerTitle: 'Profile Info',
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
    }),
  },
  {
    name: 'MapPicker',
    component: MapPickerScreen,
    options: ({navigation}) => ({
      title: 'MapPicker',
      headerTitle: 'Map',
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
    }),
  },
  {
    name: 'Order',
    component: OrderScreen,
    options: () => ({
      title: 'Order',
      headerTitle: 'Order',
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
    }),
  },
  {
    name: 'OrderDetail',
    component: OrderDetailScreen,
    options: () => ({
      title: 'OrderDetail',
      headerTitle: 'Chi tiết đơn hàng',
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
    }),
  },
];

export default routerNoBottomTab;
