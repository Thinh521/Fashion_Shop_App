import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Images from '../../../assets/images/Images';
import commonStyles from '../../../styles/commonStyles';
import {Button} from '../../../components/ui/button/Button';
import {RightIcon} from '../../../assets/icons/Icons';
import {Colors, FontSizes, FontWeights} from '../../../theme/theme';
import {isTablet, scale} from '../../../utils/scaling';

const discountBanners = [
  {
    id: '1',
    image: Images.common.banner_1,
    title: '50-40% OFF',
    subtitle1: 'Now in (product)',
    subtitle2: 'All colours',
  },
  {
    id: '2',
    image: Images.common.banner_1,
    title: '30% OFF',
    subtitle1: 'Exclusive',
    subtitle2: 'New arrivals',
  },
  {
    id: '3',
    image: Images.common.banner_1,
    title: '1% OFF',
    subtitle1: 'Exclusive',
    subtitle2: 'New arrivals',
  },
];

const DiscountBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {width: windowWidth} = useWindowDimensions();
  const width = Math.round(windowWidth - 32);
  const bannerHeight = useMemo(() => (isTablet ? (width * 5) / 16 : (width * 9) / 16), []);
  const flatListRef = useRef(null);
  const intervalRef = useRef(null);

  // Memoize onViewableItemsChanged
  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }, []);

  // Start auto-scroll
  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (flatListRef.current && discountBanners.length > 0) {
        const nextIndex = (currentIndex + 1) % discountBanners.length;
        flatListRef.current.scrollToIndex({index: nextIndex, animated: true});
      }
    }, 3000);
  }, [currentIndex]);

  // Stop auto-scroll
  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Handle dot press
  const handleDotPress = index => {
    stopAutoScroll();
    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({index, animated: true});
    setTimeout(startAutoScroll, 3000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(intervalRef.current);
  }, [startAutoScroll]);

  return (
    <View style={[styles.discountContainer, {width}]}>
      <FlatList
        ref={flatListRef}
        data={discountBanners}
        horizontal
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        renderItem={({item}) => (
          <View style={[styles.discountBanner, {width}]}>
            <FastImage
              source={item.image}
              style={[styles.bannerImage, {width, height: bannerHeight}]}
              resizeMode="stretch"
              defaultSource={Images.common.placeholder} // Fallback image
            />
            <View style={styles.discountContent}>
              <Text style={styles.discountText}>{item.title}</Text>
              <View style={[commonStyles.row, styles.contentContainer]}>
                <View style={styles.contentBox}>
                  <Text style={styles.contentText}>{item.subtitle1}</Text>
                  <Text style={styles.contentText}>{item.subtitle2}</Text>
                </View>
              </View>
              <Button
                text="Shop Now"
                rightIcon={<RightIcon />}
                buttonStyle={styles.buttonView}
                height={36}
                textStyle={styles.buttonText}
              />
            </View>
          </View>
        )}
      />
      <View style={[commonStyles.rowCenter, styles.dotsContainer]}>
        {discountBanners.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDotPress(index)}
            style={index === currentIndex ? styles.bigDot : styles.smallDot}
          />
        ))}
      </View>
    </View>
  );
};

export default DiscountBanner;

const styles = StyleSheet.create({
  discountContainer: {
    marginBottom: scale(20),
  },
  discountBanner: {
    overflow: 'hidden',
    marginBottom: scale(15),
    borderRadius: 12,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  discountContent: {
    ...StyleSheet.absoluteFillObject,
    padding: scale(20),
    justifyContent: 'center',
  },
  discountText: {
    marginBlockEnd: scale(8),
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
  },
  contentContainer: {
    marginBottom: scale(15),
  },
  contentBox: {
    flexDirection: 'column',
  },
  contentText: {
    color: Colors.white,
    fontSize: FontSizes.small,
  },
  buttonView: {
    borderWidth: 1,
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    borderColor: Colors.white,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  dotsContainer: {
    gap: scale(8),
    marginTop: scale(8),
    justifyContent: 'center',
  },
  smallDot: {
    width: scale(8),
    height: scale(8),
    backgroundColor: '#DEDBDB',
    borderRadius: 9999,
  },
  bigDot: {
    width: scale(10),
    height: scale(10),
    backgroundColor: '#FFA3B3',
    borderRadius: 9999,
  },
});
