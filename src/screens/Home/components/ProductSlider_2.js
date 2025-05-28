import React, {useRef, useState, useCallback, useMemo} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Text,
  ActivityIndicator,
} from 'react-native';
import {LeftIcon_2, RightIcon_2} from '../../../assets/icons/Icons';
import {Shadows} from '../../../theme/theme';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import {getCurrentUser, getWishList} from '../../../utils/storage';
import {isTablet, scale} from '../../../utils/scaling';
import ProductCard from './ProductCard';
import {useTheme} from '../../../contexts/ThemeContext';
import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchProducts} from '../../../api/productApi';

const ProductSlider_2 = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const {width} = useWindowDimensions();
  const numColumns = useMemo(() => (isTablet ? 4 : 2), []);
  const ITEM_WIDTH = useMemo(() => {
    return (width - 10 * (numColumns - 1) - 42) / numColumns;
  }, [width, numColumns]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [wishlistedSet, setWishlistedSet] = useState(new Set());
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({pageParam = 1}) => fetchProducts({pageParam}),
    getNextPageParam: lastPage => lastPage.nextPage,
    staleTime: 5 * 60 * 1000,
  });

  // Tải wishlist khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      const loadWishlist = async () => {
        try {
          const currentUser = await getCurrentUser();
          if (currentUser) {
            const wishlistData = await getWishList(currentUser.id);
            setWishlistedSet(new Set(wishlistData.map(item => item.id)));
          } else {
            setWishlistedSet(new Set());
          }
        } catch (err) {
          console.error('Lỗi khi lấy wishlist:', err);
        }
      };
      loadWishlist();
    }, []),
  );

  // Chuyển đổi dữ liệu từ tất cả các trang thành mảng phẳng
  const productList = useMemo(() => {
    if (!data?.pages) return [];
    const allProducts = data.pages.flatMap(page => page.products);

    return allProducts.map(item => ({
      ...item,
      isWishlisted: wishlistedSet.has(item.id),
    }));
  }, [data?.pages, wishlistedSet]);

  const scrollToIndex = useCallback(
    index => {
      if (index >= 0 && index < productList.length) {
        flatListRef.current?.scrollToIndex({animated: true, index});
        setCurrentIndex(index);
      }
    },
    [productList.length],
  );

  const handleNext = useCallback(() => {
    if (currentIndex < productList.length - numColumns) {
      scrollToIndex(currentIndex + 1);
      if (currentIndex + numColumns >= productList.length - 1 && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [
    currentIndex,
    productList.length,
    numColumns,
    scrollToIndex,
    hasNextPage,
    fetchNextPage,
  ]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  }, [currentIndex, scrollToIndex]);

  const navigationToProductDetail = useCallback(
    item => {
      navigation.navigate('NoBottomTab', {
        screen: 'ProductDetail',
        params: {productId: item.id},
      });
    },
    [navigation],
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && productList.length >= 10) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, productList.length]);

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;

    return (
      <View style={[styles.footerContainer, {width: ITEM_WIDTH}]}>
        <ActivityIndicator size="small" color={theme.primary} />
      </View>
    );
  }, [isFetchingNextPage, theme]);

  if (isLoading && !productList.length) {
    return (
      <View style={styles.container}>
        <FlatList
          data={Array(numColumns).fill({})}
          renderItem={({item, index}) => (
            <ProductCard
              item={item}
              width={ITEM_WIDTH}
              isWishlisted={false}
              isLoading={true}
              onPress={() => {}}
            />
          )}
          keyExtractor={(_, index) => `skeleton-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{width: 10}} />}
          snapToInterval={ITEM_WIDTH + 10}
          decelerationRate="fast"
        />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={{color: theme.error || 'red'}}>
          Lỗi: {error?.message || 'Không thể tải dữ liệu'}
        </Text>
      </View>
    );
  }

  if (productList.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{color: theme.text}}>Không có sản phẩm để hiển thị</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={productList}
        extraData={productList}
        renderItem={({item}) => (
          <ProductCard
            item={item}
            width={ITEM_WIDTH}
            isWishlisted={item.isWishlisted}
            isLoading={isLoading}
            onPress={navigationToProductDetail}
          />
        )}
        ListFooterComponent={renderFooter}
        keyExtractor={item => item.id?.toString() || Math.random().toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{width: 10}} />}
        snapToInterval={ITEM_WIDTH + 10}
        decelerationRate="fast"
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH + 10,
          offset: (ITEM_WIDTH + 10) * index,
          index,
        })}
        onMomentumScrollEnd={event => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / (ITEM_WIDTH + 10),
          );
          setCurrentIndex(index);
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        windowSize={5}
      />

      {currentIndex > 0 && (
        <TouchableOpacity
          style={[styles.navButton, styles.leftButton]}
          onPress={handlePrev}>
          <LeftIcon_2 />
        </TouchableOpacity>
      )}

      {currentIndex < productList.length - numColumns && (
        <TouchableOpacity
          style={[styles.navButton, styles.rightButton]}
          onPress={handleNext}>
          <RightIcon_2 />
        </TouchableOpacity>
      )}
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      position: 'relative',
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    navButton: {
      position: 'absolute',
      top: '45%',
      width: scale(40),
      height: scale(40),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.border || '#ccc',
      borderRadius: 9999,
      transform: [{translateY: -20}],
      ...Shadows.medium,
    },
    leftButton: {
      left: 0,
    },
    rightButton: {
      right: 0,
    },
    footerContainer: {
      height: 300,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    footerText: {
      marginTop: 8,
      fontSize: 12,
    },
  });

export default ProductSlider_2;
