import React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ProductSliderSkeleton = () => {
  const NUM_PRODUCT_ITEMS = 4;
  const {width: windowWidth} = useWindowDimensions();
  const productItemWidth = (windowWidth - 42) / 2;

  return (
    <SkeletonPlaceholder borderRadius={8} speed={800}>
      <View style={styles.productSliderContainer}>
        <View style={styles.productListContainer}>
          {Array(NUM_PRODUCT_ITEMS)
            .fill(0)
            .map((_, index) => (
              <View
                key={index}
                style={[
                  styles.productCard,
                  {width: productItemWidth},
                  index < NUM_PRODUCT_ITEMS - 1 && {marginRight: 10},
                ]}>
                <View style={styles.productImageContainer}>
                  <SkeletonPlaceholder.Item
                    width={productItemWidth}
                    height={124}
                    borderRadius={4}
                  />
                  <SkeletonPlaceholder.Item
                    width={30}
                    height={30}
                    borderRadius={9999}
                    style={styles.productWishlist}
                  />
                </View>
                <View style={styles.productInfo}>
                  <SkeletonPlaceholder.Item
                    width={100}
                    height={14}
                    marginBottom={6}
                  />
                  <SkeletonPlaceholder.Item
                    width={120}
                    height={12}
                    marginBottom={8}
                  />
                  <SkeletonPlaceholder.Item
                    width={80}
                    height={16}
                    marginBottom={4}
                  />
                  <View style={styles.priceContainer}>
                    <SkeletonPlaceholder.Item
                      width={50}
                      height={13}
                      marginRight={10}
                    />
                    <SkeletonPlaceholder.Item width={50} height={13} />
                  </View>
                  <View style={styles.ratingContainer}>
                    <View style={styles.stars}>
                      {Array(5)
                        .fill(0)
                        .map((_, starIndex) => (
                          <SkeletonPlaceholder.Item
                            key={starIndex}
                            width={16}
                            height={16}
                            marginRight={2}
                          />
                        ))}
                    </View>
                    <SkeletonPlaceholder.Item width={40} height={12} />
                  </View>
                </View>
              </View>
            ))}
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  productSliderContainer: {
    marginBottom: 20,
  },
  productListContainer: {
    flexDirection: 'row',
  },
  productCard: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  productImageContainer: {
    position: 'relative',
  },
  productWishlist: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  productInfo: {
    padding: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 10,
  },
});

export default ProductSliderSkeleton;
