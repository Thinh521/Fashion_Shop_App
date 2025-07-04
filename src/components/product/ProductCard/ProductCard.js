import React, {useCallback, useState, useMemo} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import commonStyles from '../../../styles/commonStyles';
import FastImage from 'react-native-fast-image';
import {StartIcon, WishListIcon} from '../../../assets/icons/Icons';
import {useNavigation, useFocusEffect} from '@react-navigation/core';
import products from '../../../data/productData';
import {getCurrentUser, getWishList} from '../../../utils/storage';
import {useTheme} from '../../../contexts/ThemeContext';
import createStyles from './ProductCard.styles';

const ProductCard = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [wishlistedSet, setWishlistedSet] = useState(new Set());

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        setIsLoading(true);
        try {
          const currentUser = await getCurrentUser();
          if (currentUser) {
            const wishlistData = await getWishList(currentUser.id);
            setWishlistedSet(new Set(wishlistData.map(item => item.id)));
          } else {
            setWishlistedSet(new Set());
          }
        } catch (error) {
          console.error('Lỗi load wishlist:', error);
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    }, []),
  );

  const productList = useMemo(
    () =>
      products.map(item => ({
        ...item,
        isWishlisted: wishlistedSet.has(item.id),
      })),
    [products, wishlistedSet],
  );

  const handleWishlistPress = itemId => {
    console.log(`Toggle wishlist for product ${itemId}`);
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {productList.map(item => (
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
                <TouchableOpacity
                  onPress={() => handleWishlistPress(item.id)}
                  style={styles.productWishlist}>
                  <WishListIcon
                    fill={item.isWishlisted ? theme.primary : theme.icon}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.productName}</Text>
                <Text style={styles.productDescription}>{item.title}</Text>
                <Text style={styles.currentPrice}>{item.price}</Text>
                <View style={[commonStyles.row, styles.ratingContainer]}>
                  <View style={styles.stars}>
                    {[...Array(5)].map((_, i) => {
                      const {average} = item.rating;
                      let fillColor = theme.border; // Màu mặc định cho sao không đánh giá
                      if (i + 1 <= Math.floor(average)) {
                        fillColor = theme.primary; // Sao đầy
                      } else if (
                        i + 1 === Math.ceil(average) &&
                        !Number.isInteger(average)
                      ) {
                        fillColor = `${theme.primary}80`; // Sao nửa
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
                    ({item.rating.countRating.toLocaleString()})
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductCard;
