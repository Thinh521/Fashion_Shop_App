import HomeScreen from '../screens/Home';
import ProductScreen from '../screens/Product';
import WishListScreen from '../screens/WishList';
import SearchScreen from '../screens/Search';
import SettingScreen from '../screens/Setting';
import {
  HomeTabIcon,
  HeartTabIcon,
  ShopTabIcon,
  SearchTabIcon,
  SettingTabIcon,
  CartIcon,
  LeftIcon,
} from '../assets/icons/Icons';
import {TouchableOpacity} from 'react-native';
import PrivateTabScreen from '../components/common/PrivateTabScreen';

const routerBottomTab = [
  {
    name: 'Home',
    component: HomeScreen,
    label: 'Home',
    Icon: HomeTabIcon,
    hasLayout: true,
    options: {
      headerTitle: 'Home',
      headerShown: false,
    },
  },
  {
    name: 'Wishlist',
    component: () => <PrivateTabScreen component={WishListScreen} />,
    label: 'Wishlist',
    Icon: HeartTabIcon,
    hasLayout: true,
    options: {
      headerTitle: 'Wishlist',
      headerShown: false,
    },
  },
  {
    name: 'Product',
    component: () => <PrivateTabScreen component={ProductScreen} />,
    label: null,
    Icon: ShopTabIcon,
    hasLayout: true,
    isCenterButton: true,
    options: {
      headerTitle: ' ',
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      headerLeft: () => (
        <TouchableOpacity style={{marginLeft: 16}}>
          <LeftIcon />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 16,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#F2F2F2',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CartIcon color="black" />
        </TouchableOpacity>
      ),
    },
  },
  {
    name: 'Search',
    component: () => <PrivateTabScreen component={SearchScreen} />,
    label: 'Search',
    Icon: SearchTabIcon,
    hasLayout: true,
    options: {
      headerTitle: 'Search',
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      headerLeft: () => (
        <TouchableOpacity style={{marginLeft: 16}}>
          <LeftIcon />
        </TouchableOpacity>
      ),
    },
  },
  {
    name: 'Setting',
    component: () => <PrivateTabScreen component={SettingScreen} />,
    label: 'Setting',
    Icon: SettingTabIcon,
    hasLayout: false,
    options: {
      headerTitle: 'Checkout',
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      headerLeft: () => (
        <TouchableOpacity style={{marginLeft: 16}}>
          <LeftIcon />
        </TouchableOpacity>
      ),
    },
  },
];

export default routerBottomTab;
