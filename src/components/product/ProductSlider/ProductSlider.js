import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Images from '../../../assets/images/Images';
import {LeftIcon_2, RightIcon_2, StartIcon} from '../../../assets/icons/Icons';
import {
  BorderRadius,
  Colors,
  FontSizes,
  FontWeights,
  Shadows,
  Spacing,
} from '../../../theme/theme';

const ProductSlider = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {width} = useWindowDimensions();

  const ITEM_WIDTH = (width - 42) / 2;

  const productData = [
    {
      id: '1',
      image: Images.common.sale_1,
      title: 'Women Printed Kurta',
      description: 'Neque porro quisquam est qui dolorem ipsum quia',
      currentPrice: '₹1500',
      originalPrice: '₹2499',
      discount: '40% Off',
      ratingCount: '56890',
    },
    {
      id: '2',
      image: Images.common.sale_2,
      title: 'Women Printed Kurta',
      description: 'Neque porro quisquam est qui dolorem ipsum quia',
      currentPrice: '₹2499',
      originalPrice: '₹4999',
      discount: '50% Off',
      ratingCount: '45890',
    },
    {
      id: '3',
      image: Images.common.sale_1,
      title: 'Women Printed Kurta',
      description: 'Neque porro quisquam est qui dolorem ipsum quia',
      currentPrice: '₹1500',
      originalPrice: '₹2499',
      discount: '40% Off',
      ratingCount: '56890',
    },
    {
      id: '4',
      image: Images.common.sale_2,
      title: 'Women Printed Kurta',
      description: 'Neque porro quisquam est qui dolorem ipsum quia',
      currentPrice: '₹2499',
      originalPrice: '₹4999',
      discount: '50% Off',
      ratingCount: '45890',
    },
  ];

  const scrollToIndex = index => {
    flatListRef.current?.scrollToIndex({animated: true, index});
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < productData.length - 2) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const renderItem = ({item}) => (
    <View style={[styles.card, {width: ITEM_WIDTH}]}>
      <FastImage
        source={item.image}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.currentPrice}>{item.currentPrice}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          <Text style={styles.discount}>{item.discount}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <StartIcon key={i} style={styles.starIcon} />
            ))}
          </View>
          <Text style={styles.ratingCount}>{item.ratingCount}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={productData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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

      {currentIndex < productData.length - 2 && (
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
  slideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.r8,
    ...Shadows.medium,
    marginBottom: Spacing.s10,
    marginRight: 0,
  },
  productImage: {
    width: '100%',
    height: 124,
    borderRadius: BorderRadius.r4,
  },
  productInfo: {
    padding: Spacing.s10,
  },
  productTitle: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.medium,
    marginBottom: 6,
  },
  productDescription: {
    lineHeight: 16,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.regular,
    marginBottom: 8,
  },
  currentPrice: {
    marginBottom: 4,
    fontWeight: FontWeights.bold,
    fontSize: FontSizes.semiLarge,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  originalPrice: {
    color: Colors.gray,
    fontSize: FontSizes.medium,
    marginRight: Spacing.s10,
    textDecorationLine: 'line-through',
  },
  discount: {
    color: '#FF6B00',
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: Spacing.s10,
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 2,
  },
  ratingCount: {
    color: Colors.gray,
    fontSize: FontSizes.small,
  },
  navButton: {
    position: 'absolute',
    top: '45%',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.rFull,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [{translateY: -20}],
  },
  leftButton: {
    left: 0,
  },
  rightButton: {
    right: 0,
  },
});

export default ProductSlider;
