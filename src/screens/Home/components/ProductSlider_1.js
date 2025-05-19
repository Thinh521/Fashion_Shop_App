import React, {useRef, useState, useCallback, useMemo} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {LeftIcon_2, RightIcon_2} from '../../../assets/icons/Icons';
import productData from '../../../data/productData';
import {Colors, Shadows} from '../../../theme/theme';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import {getCurrentUser, getWishList} from '../../../utils/storage';
import {isTablet, scale} from '../../../utils/scaling';
import ProductCard from './ProductCard';

const ProductSlider_1 = () => {
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const {width} = useWindowDimensions();
  const numColumns = useMemo(() => (isTablet ? 4 : 2), []);
  const ITEM_WIDTH = useMemo(() => {
    return (width - 10 * (numColumns - 1) - 32) / numColumns;
  }, [width, numColumns]);

  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wishlistedSet, setWishlistedSet] = useState(new Set());

  useFocusEffect(
    useCallback(() => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const wishlistData = getWishList(currentUser.id);
        setWishlistedSet(new Set(wishlistData.map(item => item.id)));
      } else {
        setWishlistedSet(new Set());
      }
    }, []),
  );

  const scrollToIndex = index => {
    flatListRef.current?.scrollToIndex({animated: true, index});
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < productData.length - numColumns) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const navigationToProductDetail = useCallback(
    item => {
      navigation.navigate('NoBottomTab', {
        screen: 'ProductDetail',
        params: {product: item},
      });
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={productData}
        renderItem={({item}) => (
          <ProductCard
            item={item}
            width={ITEM_WIDTH}
            isWishlisted={wishlistedSet.has(item.id)}
            isLoading={isLoading}
            onPress={navigationToProductDetail}
          />
        )}
        keyExtractor={item => item.id.toString()}
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
      />

      {currentIndex > 0 && (
        <TouchableOpacity
          style={[styles.navButton, styles.leftButton]}
          onPress={handlePrev}>
          <LeftIcon_2 />
        </TouchableOpacity>
      )}

      {currentIndex < productData.length - numColumns && (
        <TouchableOpacity
          style={[styles.navButton, styles.rightButton]}
          onPress={handleNext}>
          <RightIcon_2 />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  navButton: {
    position: 'absolute',
    top: '45%',
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
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
});

export default ProductSlider_1;
