import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import styles from './ProductDetailStyles';
import commonStyles from '../../styles/commonStyles';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  BuyIcon,
  CartIcon,
  CheckIcon,
  LeftIcon_2,
  LocationIcon,
  LockIcon_2,
  MinusIcon,
  PlusIcon,
  RightIcon_2,
  StartIcon,
  WishListIcon,
} from '../../assets/icons/Icons';
import {
  addToCart,
  getCurrentUser,
  getWishList,
  saveWishList,
  updateCartQuantity,
} from '../../utils/storage';
import {showMessage} from 'react-native-flash-message';
import {IconButton} from '../../components/ui/button/Button';
import LottieView from 'lottie-react-native';

const {width} = Dimensions.get('window');
const IMAGE_WIDTH = width;
const IMAGE_HEIGHT = 300;

const ProductDetailScreen = item => {
  const {
    params: {product},
  } = useRoute();

  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [availableStock, setAvailableStock] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [totalStock, setTotalStock] = useState(0);

  // Lấy thông tin user hiện tại
  const currentUser = getCurrentUser();
  const userId = currentUser?.id;

  const increase = () => {
    if (!selectedColor || !selectedSize) {
      Alert.alert(
        'Chọn phân loại',
        'Vui lòng chọn màu sắc và kích thước trước',
      );
      return;
    }

    if (quantity >= availableStock) {
      return;
    }

    if (quantity === availableStock) {
      showMessage({
        message: 'Hết hàng',
        description: `Số lượng tối đa cho sản phẩm này là ${availableStock}`,
        type: 'warning',
        duration: 2000,
        icon: 'warning',
      });

      return;
    }

    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCartItem(item, newQuantity);
  };

  const decrease = () => {
    if (!selectedColor || !selectedSize) {
      Alert.alert(
        'Chọn phân loại',
        'Vui lòng chọn màu sắc và kích thước trước',
      );
      return;
    }

    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    updateCartItem(item, newQuantity);
  };

  const updateCartItem = useCallback(
    async (productItem, newQuantity) => {
      try {
        const user = getCurrentUser();
        if (!user) {
          Alert.alert('Thông báo', 'Bạn cần đăng nhập để cập nhật giỏ hàng');
          return;
        }

        if (!selectedColor || !selectedSize) {
          return;
        }

        const variantId = `${productItem.id}_${selectedColor}_${selectedSize}`;
        await updateCartQuantity(user.id, variantId, newQuantity);
      } catch (error) {
        console.error('Update cart error:', error);
      }
    },
    [selectedColor, selectedSize],
  );

  const handleAddToCart = () => {
    if (!userId) {
      Alert.alert(
        'Thông báo',
        'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng',
      );
      return;
    }

    if (!selectedColor || !selectedSize) {
      Alert.alert(
        'Chọn phân loại',
        'Vui lòng chọn màu sắc và kích thước trước khi thêm vào giỏ hàng',
      );
      return;
    }

    const stock = product.variants?.[selectedColor]?.[selectedSize] || 0;
    if (stock < 1) {
      Alert.alert('Hết hàng', 'Sản phẩm bạn chọn đã hết hàng');
      return;
    }

    const cartItem = {
      ...product,
      selectedColor,
      selectedSize,
      quantity: Math.min(quantity, stock),
      availableStock: stock,
      addedAt: new Date().toISOString(),
      colorName: selectedColor,
      sizeName: selectedSize,
      variantPrice: product.price,
      variantId: `${product.id}_${selectedColor}_${selectedSize}_${Date.now()}`, // Tạo variantId duy nhất
    };

    addToCart(userId, cartItem);
  };

  const checkWishlistStatus = () => {
    const wishlist = getWishList(userId);
    const isInWishList = wishlist.some(item => item.id === product.id);
    setIsWishlisted(isInWishList);
  };

  useFocusEffect(
    useCallback(() => {
      const wishlist = getWishList(userId);
      const isInWishList = wishlist.some(item => item.id === product.id);
      setIsWishlisted(isInWishList);
    }, [product, userId]),
  );

  const toggleWishlist = () => {
    if (!userId) return Alert.alert('Oops!', 'Bạn cần đăng nhập trước');

    const wishlist = getWishList(userId);
    const updatedWishlist = isWishlisted
      ? wishlist.filter(item => item.id !== product.id) // Xóa
      : [...wishlist, {...product, addedAt: new Date().toISOString()}]; // Thêm cả cục + thời gian

    saveWishList(userId, updatedWishlist);
    setIsWishlisted(!isWishlisted);
  };

  useEffect(() => {
    if (product?.colors?.length > 0) {
      setSelectedColor(product.colors[0]);
    }
    if (userId) {
      checkWishlistStatus();
    }
  }, [product, userId]);

  const getDiscountedPrice = (priceString, discountPercent) => {
    const originalPrice = parseFloat(priceString.replace(/[^\d.]/g, ''));
    const discountedPrice = originalPrice * (1 - discountPercent / 100);
    return `₹${discountedPrice.toFixed(0)}`;
  };

  const handleNext = () => {
    if (currentIndex < product.images.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current?.scrollToIndex({index: prevIndex, animated: true});
    }
  };

  const calculateTotalStock = variants => {
    let total = 0;

    if (variants) {
      Object.values(variants).forEach(sizes => {
        Object.values(sizes).forEach(stock => {
          total += stock;
        });
      });
    }

    return total;
  };

  useEffect(() => {
    const totalQuantity = calculateTotalStock(product.variants);
    setTotalStock(totalQuantity);
  }, [product]);

  const handleDotPress = index => {
    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({index, animated: true});
  };

  const renderColorOption = color => {
    const isSelected = color === selectedColor;
    return (
      <TouchableOpacity
        key={color}
        onPress={() => {
          setSelectedColor(color);
          setSelectedSize('');
          setAvailableStock(null);
        }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: 10,
            borderWidth: isSelected ? 2 : 1,
            borderColor: isSelected ? '#000' : '#ddd',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: color,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderSizeOption = size => {
    const isSelected = size === selectedSize;
    return (
      <TouchableOpacity
        key={size}
        onPress={() => {
          setSelectedSize(size);
          const stock = product.variants?.[selectedColor]?.[size] || 0;
          setAvailableStock(stock);

          if (quantity > stock) {
            setQuantity(stock || 1);
            updateCartItem(product, stock || 1);
          }
        }}
        style={{
          width: 50,
          height: 40,
          borderWidth: 1,
          borderColor: isSelected ? '#F83758' : '#ddd',
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
          backgroundColor: isSelected ? '#F83758' : '#fff',
        }}>
        <Text style={{color: isSelected ? '#fff' : '#000'}}>{size}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.productDetailContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.productDetailSLider}>
          <FlatList
            ref={flatListRef}
            data={product.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => (
              <Image
                source={item}
                style={{width: IMAGE_WIDTH, height: IMAGE_HEIGHT}}
                resizeMode="contain"
              />
            )}
            onMomentumScrollEnd={e => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / IMAGE_WIDTH,
              );
              setCurrentIndex(index);
            }}
          />

          {/* Navigation Arrows */}
          <TouchableOpacity
            onPress={handlePrev}
            style={[
              styles.sliderButton,
              styles.leftButton,
              {top: IMAGE_HEIGHT / 2 - 20},
            ]}>
            <LeftIcon_2 />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNext}
            style={[
              styles.sliderButton,
              styles.rightButton,
              {top: IMAGE_HEIGHT / 2 - 20},
            ]}>
            <RightIcon_2 />
          </TouchableOpacity>

          {/* Dots Indicator */}
          <View style={styles.dotContainer}>
            {product.images.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleDotPress(index)}
                style={[
                  styles.dot,
                  currentIndex === index
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.productDetailInfo}>
          {/* Product Title */}
          <Text style={styles.productTitle}>{product.productName}</Text>
          <Text style={styles.productSubtitle}>{product.title}</Text>
          <View style={[commonStyles.rowSpaceBetween]}>
            <View>
              {/* Rating */}
              <View style={[commonStyles.row, styles.ratingContainer]}>
                <View style={styles.stars}>
                  {[...Array(5)].map((_, i) => {
                    const {average} = product.rating;
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
                  ({product.rating.countRating.toLocaleString()})
                </Text>
              </View>

              {/* Price */}
              <View style={[commonStyles.row, styles.priceContainer]}>
                <Text style={styles.originalPrice}>{product.price}</Text>
                <Text style={styles.discountedPrice}>
                  {getDiscountedPrice(product.price, product.discount)}
                </Text>
                <Text style={styles.discountBadge}>{product.discount} Off</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={toggleWishlist}
              style={{marginRight: 10}}>
              <View style={styles.heartContainer}>
                {isWishlisted ? (
                  <LottieView
                    style={styles.heartAima}
                    source={require('../../assets/animation/heart_animation.json')}
                    autoPlay
                    loop={false}
                  />
                ) : (
                  <WishListIcon style={styles.heart} color="grey" />
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Color Selection */}
          <View style={styles.colorContainer}>
            <Text style={styles.colorTitle}>Color:</Text>
            <View style={styles.colorBox}>
              {product?.colors?.map(renderColorOption)}
            </View>
          </View>

          {/* Size Selection */}
          <View>
            <Text style={styles.sizeTitle}>
              Size: {selectedSize || 'Select a size'}
            </Text>
            <View style={styles.sizeBox}>
              {selectedColor &&
                Object.keys(product.variants?.[selectedColor] || {}).map(
                  renderSizeOption,
                )}
            </View>
            {selectedColor && selectedSize && (
              <Text style={styles.colorText}>
                Available: {availableStock} product
                {availableStock !== 1 ? 's' : ''}
              </Text>
            )}
          </View>

          <View>
            <Text style={styles.quantityTitle}>Quantity:</Text>
            <View style={commonStyles.rowSpaceBetween}>
              <View style={styles.quantityContainer}>
                <IconButton
                  iconStyle={styles.quantityButton}
                  icon={<MinusIcon fill="#000" width={18} height={18} />}
                  onPress={decrease}
                />

                <TextInput
                  style={styles.quantityInput}
                  value={String(quantity)}
                  onChangeText={text => {
                    const num = parseInt(text);
                    if (!isNaN(num) && num > 0) {
                      if (num > availableStock) {
                        showMessage({
                          message: 'Hết hàng',
                          description: `Số lượng tối đa cho sản phẩm này là ${availableStock}`,
                          type: 'warning',
                          duration: 2000,
                          icon: 'warning',
                        });
                        setQuantity(availableStock);
                        updateCartItem(product, availableStock);
                      } else {
                        setQuantity(num);
                        updateCartItem(product, num);
                      }
                    } else {
                      setQuantity(1);
                      updateCartItem(product, 1);
                    }
                  }}
                  keyboardType="numeric"
                  maxLength={4}
                />

                <IconButton
                  iconStyle={styles.quantityButton}
                  icon={<PlusIcon fill="#000" width={18} height={18} />}
                  onPress={increase}
                />
              </View>
              <View style={styles.availableContainer}>
                <Text>Available: </Text>
                <Text>{totalStock}</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.detailsTitle}>Product Details</Text>
          <Text style={styles.detailsText}>{product.description}</Text>

          {/* Features */}
          <View style={[commonStyles.row, styles.featuresContainer]}>
            <View style={[commonStyles.rowCenter, styles.featureItem]}>
              <View style={styles.featureIcon}>
                <LocationIcon />
              </View>
              <Text style={styles.featureText}>Nearest Store</Text>
            </View>
            <View style={[commonStyles.rowCenter, styles.featureItem]}>
              <View style={styles.featureIcon}>
                <LockIcon_2 />
              </View>
              <Text style={styles.featureText}>VIP</Text>
            </View>
            <View style={[commonStyles.rowCenter, styles.featureItem]}>
              <View style={styles.featureIcon}>
                <CheckIcon />
              </View>
              <Text style={styles.featureText}>Return policy</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={[commonStyles.row, styles.footerContainer]}>
        <TouchableOpacity
          onPress={handleAddToCart}
          style={[
            commonStyles.rowCenter,
            styles.footerButton,
            styles.cartButton,
          ]}>
          <CartIcon color="white" width={24} height={24} />
          <Text style={styles.buttonText}>Add to cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('NoBottomTab', {
              screen: 'Checkout',
              params: {product: product},
            })
          }
          style={[
            commonStyles.rowCenter,
            styles.footerButton,
            styles.buyButton,
          ]}>
          <BuyIcon />
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailScreen;
