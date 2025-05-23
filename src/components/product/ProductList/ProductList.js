import React, {useCallback, useState, useMemo, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {StartIcon, WishListIcon} from '../../../assets/icons/Icons';
import {useNavigation, useFocusEffect} from '@react-navigation/core';
import products from '../../../data/productData';
import {getCurrentUser, getWishList} from '../../../utils/storage';
import {useTheme} from '../../../contexts/ThemeContext';
import createStyles from './ProductList.styles';
import {scale} from '../../../utils/scaling';

const ProductList = ({
  searchItem = '',
  filters = {},
  sort = 'Tất cả',
  setTotalProduct = () => {},
}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [wishlistedSet, setWishlistedSet] = useState(new Set());

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
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
        }
      };
      loadData();
    }, []),
  );

  const productList = useMemo(() => {
    const {type = 'Tất cả', minPrice = '', maxPrice = ''} = filters;
    let filteredProducts = products.filter(item => {
      const matchesSearch = item.productName
        .toLowerCase()
        .includes(searchItem.toLowerCase());
      const matchesType = type === 'Tất cả' || item.category === type;
      const price = parseFloat(item.price.replace(/[^\d]/g, '')) || 0;
      const min = minPrice ? parseFloat(minPrice) : -Infinity;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      return matchesSearch && matchesType && price >= min && price <= max;
    });

    if (sort !== 'Tất cả') {
      filteredProducts.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^\d]/g, '')) || 0;
        const priceB = parseFloat(b.price.replace(/[^\d]/g, '')) || 0;
        if (sort === 'Tên A-Z')
          return a.productName.localeCompare(b.productName);
        if (sort === 'Tên Z-A')
          return b.productName.localeCompare(a.productName);
        if (sort === 'Giá thấp đến cao') return priceA - priceB;
        if (sort === 'Giá cao đến thấp') return priceB - priceA;
        return 0;
      });
    }

    return filteredProducts.map(item => ({
      ...item,
      isWishlisted: wishlistedSet.has(item.id),
    }));
  }, [searchItem, filters, sort, wishlistedSet]);

  useEffect(() => {
    setTotalProduct(productList.length);
  }, [productList, setTotalProduct]);

  return (
    <View style={{backgroundColor: theme.background}}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {productList.length === 0 && (
            <Text style={styles.noResultText}>
              Không tìm thấy sản phẩm phù hợp
            </Text>
          )}

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
                  <WishListIcon
                    color={item.isWishlisted ? '#FF0000' : '#000'}
                  />
                </View>
              </View>
              <View style={styles.productInfo}>
                <Text
                  style={styles.productTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.productName}
                </Text>
                <Text
                  style={styles.productDescription}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {item.title}
                </Text>
                <Text style={styles.price}>{item.price}</Text>
                <View style={styles.ratingContainer}>
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

export default ProductList;
