import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Input from '../../components/ui/input';
import {
  FilterIcon,
  MicIcon,
  SearchIcon_2,
  SortIcon,
} from '../../assets/icons/Icons';
import commonStyles from '../../styles/commonStyles';
import CategotiesList from './components/CategotiesList';
import DiscountBanner from './components/DiscountBanner';
import Deal from './components/Deal';
import ProductSlider_1 from './components/ProductSlider_1';
import SpecialOffer from './components/SpecialOffer';
import Sale from './components/Sale';
import TrendingProduct from './components/TrendingProduct';
import BannerSummer from './components/BannerSummer';
import BannerSponsored from './components/BannerSponsored';
import {useNavigation} from '@react-navigation/core';
import {useTheme} from '../../contexts/ThemeContext';
import createStyles from './HomeStyles';
import ProductSlider_2 from './components/ProductSlider_2';

const HomeScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();

  const navigationToShop = () => {
    navigation.navigate('MainTabNavigator', {
      screen: 'Product',
    });
  };
  return (
    <View style={{backgroundColor: theme.background}}>
      <ScrollView
        style={styles.homeContainer}
        showsVerticalScrollIndicator={false}>
        {/* Section Header */}
        <TouchableOpacity onPress={navigationToShop} activeOpacity={0.8}>
          <View style={styles.searchContainer} pointerEvents="none">
            <Input
              placeholder="Search any Product.."
              leftIcon={SearchIcon_2}
              rightIcon={MicIcon}
              inputStyle={styles.searchInput}
              editable={false}
            />
          </View>
        </TouchableOpacity>

        {/* Section Search sort filter */}
        <View style={[commonStyles.rowSpaceBetween, styles.sectionHeader]}>
          <Text style={styles.sectionTitle}>All Featured</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              onPress={navigationToShop}
              style={[commonStyles.row, styles.actionButton]}>
              <Text style={styles.actionText}>Sort</Text>
              <SortIcon style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={navigationToShop}
              style={[commonStyles.row, styles.actionButton]}>
              <Text style={styles.actionText}>Filter</Text>
              <FilterIcon style={styles.actionIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories List */}
        <CategotiesList />

        {/* Discount Banner */}
        <DiscountBanner />

        {/* Deal */}
        <Deal />

        {/* Slider Product 1 */}
        <ProductSlider_1 />

        {/* Special Offer */}
        <SpecialOffer />

        {/* Sale */}
        <Sale />

        {/* Trending Product */}
        <TrendingProduct />

        {/* Slider Product 2 */}
        <ProductSlider_2 />

        {/* Banner Summer */}
        <BannerSummer />

        {/* Banner Sponsored */}
        <BannerSponsored />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
