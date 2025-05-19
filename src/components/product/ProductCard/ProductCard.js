import React, {useCallback, useState, useMemo} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import styles from './ProductCard.styles';
import commonStyles from '../../../styles/commonStyles';
import FastImage from 'react-native-fast-image';
import {StartIcon, WishListIcon} from '../../../assets/icons/Icons';
import {useNavigation, useFocusEffect} from '@react-navigation/core';
import products from '../../../data/productData';
import {getCurrentUser, getWishList} from '../../../utils/storage';

const ProductCard = () => {
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

  return (
    <View style={{flex: 1}}>
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
                <View style={styles.productWishlist}>
                  <WishListIcon color={item.isWishlisted ? 'red' : '#fff'} />
                </View>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.productName}</Text>
                <Text style={styles.productDescription}>{item.title}</Text>
                <Text style={styles.currentPrice}>{item.price}</Text>
                <View style={[commonStyles.row, styles.ratingContainer]}>
                  <View style={styles.stars}>
                    {[...Array(5)].map((_, i) => {
                      const {average} = item.rating;
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
