import React, {useCallback, useState, useMemo, useEffect, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {StartIcon, WishListIcon} from '../../../assets/icons/Icons';
import {useNavigation, useFocusEffect} from '@react-navigation/core';
import {getCurrentUser, getWishList} from '../../../utils/storage';
import {useTheme} from '../../../contexts/ThemeContext';
import createStyles from './ProductList.styles';
import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchProducts} from '../../../api/productApi';
import {scale} from '../../../utils/scaling';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {FontSizes} from '../../../theme/theme';
import commonStyles from '../../../styles/commonStyles';

const {width: screenWidth} = Dimensions.get('window');
const ITEM_WIDTH = (screenWidth - 48) / 2;
const ITEM_HEIGHT = ITEM_WIDTH * 1.4;

// Memoized ProductItem component để tránh re-render không cần thiết
const ProductItem = React.memo(({item, onPress, styles, theme}) => {
  const handlePress = useCallback(() => {
    onPress(item.id);
  }, [item.id, onPress]);

  const stars = useMemo(() => {
    const average = item.rating?.average || item.rating || 0;
    return [...Array(5)].map((_, i) => {
      let fillColor = '#ccc';
      if (i + 1 <= Math.floor(average)) {
        fillColor = '#EDB310';
      } else if (i + 1 === Math.ceil(average) && !Number.isInteger(average)) {
        fillColor = '#EDB31080';
      }
      return fillColor;
    });
  }, [item.rating]);

  const formattedPrice = useMemo(() => {
    if (typeof item.price === 'number') {
      return item.price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
    }
    return item.price || 'Liên hệ';
  }, [item.price]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.card, {width: ITEM_WIDTH}]}>
      <View style={styles.productImageContainer}>
        <FastImage
          source={{
            uri: item.thumbnail || 'https://via.placeholder.com/150',
            priority: FastImage.priority.normal,
          }}
          style={styles.productImage}
          resizeMode="contain"
          fallback
        />
        <View style={styles.productWishlist}>
          <WishListIcon color={item.isWishlisted ? '#FF0000' : '#000'} />
        </View>
      </View>
      <View style={styles.productInfo}>
        <Text
          style={styles.productTitle}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.title || 'N/A'}
        </Text>
        <Text
          style={styles.productDescription}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item.description || 'Không có mô tả'}
        </Text>
        <Text style={styles.price}>{formattedPrice}</Text>
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {stars.map((fillColor, i) => (
              <StartIcon key={i} fill={fillColor} style={styles.starIcon} />
            ))}
          </View>
          <Text style={styles.ratingCount}>{item.stock || 0} Stock</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const ProductList = ({
  searchItem = '',
  filters = {},
  sort = 'Tất cả',
  setTotalProduct = () => {},
}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const {width: SCREEN_WIDTH} = Dimensions.get('window');
  const ITEM_MARGIN = scale(10);
  const productItemWidth = (SCREEN_WIDTH - ITEM_MARGIN * 3 - 10) / 2;
  const [wishlistedSet, setWishlistedSet] = useState(new Set());

  console.log(productItemWidth);

  const loadingStateRef = useRef({
    isInitialLoad: true,
    hasScrolledToEnd: false,
  });

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', searchItem, filters, sort],
    queryFn: ({pageParam = 1}) => fetchProducts({pageParam}),
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length >= 10) return undefined;
      return lastPage.nextPage;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  // Optimize allProducts calculation với shallow comparison
  const allProducts = useMemo(() => {
    return data?.pages?.flatMap(page => page.products) || [];
  }, [data?.pages]);

  // Load wishlist data
  useFocusEffect(
    useCallback(() => {
      const loadWishlistData = async () => {
        try {
          const currentUser = await getCurrentUser();
          if (currentUser) {
            const wishlistData = await getWishList(currentUser.id);
            const wishlistIds = new Set(wishlistData.map(item => item.id));
            setWishlistedSet(prevSet => {
              // Chỉ update nếu thực sự có thay đổi
              if (
                prevSet.size !== wishlistIds.size ||
                [...prevSet].some(id => !wishlistIds.has(id))
              ) {
                return wishlistIds;
              }
              return prevSet;
            });
          } else {
            setWishlistedSet(prevSet =>
              prevSet.size > 0 ? new Set() : prevSet,
            );
          }
        } catch (error) {
          console.error('Lỗi load wishlist:', error);
        }
      };
      loadWishlistData();
    }, []),
  );

  // Optimize product filtering và sorting
  const productList = useMemo(() => {
    const {type = 'Tất cả', minPrice = '', maxPrice = ''} = filters;
    const min = minPrice ? parseFloat(minPrice) : -Infinity;
    const max = maxPrice ? parseFloat(maxPrice) : Infinity;
    const searchLower = searchItem.toLowerCase();

    let filteredProducts = allProducts.filter(item => {
      // Early return for performance
      if (
        searchItem &&
        !(item.title || '').toLowerCase().includes(searchLower)
      ) {
        return false;
      }

      if (type !== 'Tất cả' && item.category !== type) {
        return false;
      }

      if (minPrice || maxPrice) {
        const price =
          typeof item.price === 'string'
            ? parseFloat(item.price.replace(/[^\d]/g, ''))
            : Number(item.price) || 0;

        if (price < min || price > max) {
          return false;
        }
      }

      return true;
    });

    // Optimize sorting
    if (sort !== 'Tất cả') {
      const sortFunctions = {
        'Tên A-Z': (a, b) => (a.title || '').localeCompare(b.title || ''),
        'Tên Z-A': (a, b) => (b.title || '').localeCompare(a.title || ''),
        'Giá thấp đến cao': (a, b) => {
          const priceA =
            typeof a.price === 'string'
              ? parseFloat(a.price.replace(/[^\d]/g, ''))
              : Number(a.price) || 0;
          const priceB =
            typeof b.price === 'string'
              ? parseFloat(b.price.replace(/[^\d]/g, ''))
              : Number(b.price) || 0;
          return priceA - priceB;
        },
        'Giá cao đến thấp': (a, b) => {
          const priceA =
            typeof a.price === 'string'
              ? parseFloat(a.price.replace(/[^\d]/g, ''))
              : Number(a.price) || 0;
          const priceB =
            typeof b.price === 'string'
              ? parseFloat(b.price.replace(/[^\d]/g, ''))
              : Number(b.price) || 0;
          return priceB - priceA;
        },
      };

      const sortFunction = sortFunctions[sort];
      if (sortFunction) {
        filteredProducts.sort(sortFunction);
      }
    }

    // Map với optimized object creation
    return filteredProducts.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      thumbnail: item.thumbnail,
      rating: item.rating,
      stock: item.stock,
      category: item.category,
      isWishlisted: wishlistedSet.has(item.id),
    }));
  }, [allProducts, searchItem, filters, sort, wishlistedSet]);

  useEffect(() => {
    setTotalProduct(productList.length);
    if (loadingStateRef.current.isInitialLoad && productList.length > 0) {
      loadingStateRef.current.isInitialLoad = false;
    }
  }, [productList.length, setTotalProduct]);

  const handleLoadMore = useCallback(() => {
    if (
      hasNextPage &&
      !isFetchingNextPage &&
      !loadingStateRef.current.hasScrolledToEnd
    ) {
      console.log('Fetching next page, current products:', productList.length);
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, productList.length]);

  // Handle item press
  const handleItemPress = useCallback(
    productId => {
      navigation.navigate('NoBottomTab', {
        screen: 'ProductDetail',
        params: {productId},
      });
    },
    [navigation],
  );

  // Optimize render item
  const renderItem = useCallback(
    ({item}) => (
      <ProductItem
        item={item}
        onPress={handleItemPress}
        styles={styles}
        theme={theme}
      />
    ),
    [handleItemPress, styles, theme],
  );

  // Optimize key extractor
  const keyExtractor = useCallback(item => `product-${item.id}`, []);

  // Loading footer
  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;

    return (
      <View>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }, [isFetchingNextPage, theme.primary]);

  // Empty component
  const renderEmptyComponent = useCallback(
    () => (
      <Text style={styles.noResultText}>Không tìm thấy sản phẩm phù hợp</Text>
    ),
    [styles.noResultText],
  );

  // Loading state
  if (isLoading && !allProducts.length) {
    return (
      <View>
        {[0, 1].map(row => (
          <View
            key={row}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: ITEM_MARGIN,
            }}>
            {[0, 1].map(col => {
              const index = row * 2 + col;
              const isLeftItem = col === 0;
              return (
                <SkeletonPlaceholder key={index} borderRadius={8} speed={1200}>
                  <View
                    style={{
                      marginRight: isLeftItem ? ITEM_MARGIN : 0,
                      width: productItemWidth,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 8,
                      overflow: 'hidden',
                    }}>
                    {/* Ảnh */}
                    <SkeletonPlaceholder.Item
                      width="100%"
                      height={scale(146)}
                      borderRadius={4}
                    />

                    {/* Thông tin sản phẩm */}
                    <View style={{padding: scale(10)}}>
                      <SkeletonPlaceholder.Item
                        width="100%"
                        height={scale(14)}
                        marginBottom={scale(8)}
                      />
                      <SkeletonPlaceholder.Item
                        width="100%"
                        height={scale(30)}
                        marginBottom={scale(8)}
                      />
                      <SkeletonPlaceholder.Item
                        width="50%"
                        height={scale(16)}
                        marginBottom={scale(6)}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        {/* Rating */}
                        <View style={{flexDirection: 'row'}}>
                          {Array(5)
                            .fill(0)
                            .map((_, starIndex) => (
                              <SkeletonPlaceholder.Item
                                key={starIndex}
                                width={scale(12)}
                                height={scale(12)}
                                marginRight={scale(2)}
                              />
                            ))}
                        </View>
                        <SkeletonPlaceholder.Item
                          width="20%"
                          height={scale(12)}
                        />
                      </View>
                    </View>
                  </View>
                </SkeletonPlaceholder>
              );
            })}
          </View>
        ))}
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Lỗi: {error?.message || 'Không thể tải sản phẩm'}
        </Text>
      </View>
    );
  }

  return (
    <View style={{backgroundColor: theme.background, flex: 1}}>
      <FlatList
        ref={flatListRef}
        data={productList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={styles.grid}
        contentContainerStyle={styles.scrollContainer}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * Math.floor(index / 2),
          index,
        })}
        // Performance optimizations
        disableVirtualization={false}
        legacyImplementation={false}
      />
    </View>
  );
};

export default React.memo(ProductList);
