import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {
  FilterIcon,
  MicIcon,
  SearchIcon_2,
  SortIcon,
  StartIcon,
  WishListIcon,
} from '../../assets/icons/Icons';
import styles from './WishList.styles';
import Input from '../../components/ui/input';
import commonStyles from '../../styles/commonStyles';
import FastImage from 'react-native-fast-image';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import {getCurrentUser, getWishList} from '../../utils/storage';

const WishListScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const wishlistData = getWishList(currentUser.id);
        setProducts(wishlistData || []);
      }
    }, []),
  );

  const totalItems = products.length;

  return (
    <View style={[commonStyles.screenContainer]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Section Header */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="Search any Product.."
            leftIcon={SearchIcon_2}
            rightIcon={MicIcon}
            inputStyle={styles.searchInput}
          />
        </View>

        <View style={[commonStyles.rowSpaceBetween, styles.sectionHeader]}>
          <Text style={styles.sectionTitle}>{totalItems}+ Items</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={[commonStyles.row, styles.actionButton]}>
              <Text style={styles.actionText}>Sort</Text>
              <SortIcon style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={[commonStyles.row, styles.actionButton]}>
              <Text style={styles.actionText}>Filter</Text>
              <FilterIcon style={styles.actionIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.wsihlistContainer}>
          {products.length > 0 ? (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.grid}>
                {products.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                      navigation.navigate('NoBottomTab', {
                        screen: 'ProductDetail',
                        params: {product: item},
                      })
                    }
                    style={styles.card}>
                    <View style={styles.productImageContainer}>
                      <FastImage
                        source={item.images[0]}
                        style={styles.productImage}
                        resizeMode="contain"
                      />
                      <View style={styles.productWishlist}>
                        <WishListIcon color="red" />
                      </View>
                    </View>
                    <View style={styles.productInfo}>
                      <Text
                        style={styles.name}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {item.name || item.productName}
                      </Text>
                      <Text
                        style={styles.title}
                        numberOfLines={2}
                        ellipsizeMode="tail">
                        {item.title || item.title}
                      </Text>
                      <Text style={styles.price}>
                        {item.price?.toLocaleString()}
                      </Text>
                      <View style={styles.ratingContainer}>
                        <View style={styles.stars}>
                          {[...Array(5)].map((_, i) => {
                            const average = item.rating?.average || 0;
                            let fillColor = '#ccc';

                            if (i + 1 <= Math.floor(average)) {
                              fillColor = '#EDB310';
                            } else if (
                              i + 1 === Math.ceil(average) &&
                              !Number.isInteger(average)
                            ) {
                              fillColor = '#EDB31080';
                            }

                            return (
                              <StartIcon
                                key={i}
                                fill={fillColor}
                                style={styles.starIcon}
                              />
                            );
                          })}
                        </View>
                        <Text style={styles.ratingCount}>
                          ({item.rating?.countRating?.toLocaleString() || 0})
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Your wishlist is empty</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default WishListScreen;
