import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {Colors, FontSizes, FontWeights, Shadows} from '../../theme/theme';
import {scale} from '../../utils/scaling';
import {useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Button} from '../../components/ui/button/Button';
import {addReview, getCurrentUser, getReview} from '../../utils/storage';
import commonStyles from '../../styles/commonStyles';
import {StartIcon} from '../../assets/icons/Icons';

// Component StarIcon
const StarIcon = React.memo(({fill}) => (
  <View style={styles.starIcon}>
    <StartIcon fill={fill} style={{width: 18, height: 18}} />
  </View>
));

// Component StarRating
const StarRating = React.memo(
  ({rating, onRatingChange, isInteractive = false}) => {
    const stars = [...Array(5)].map((_, i) => {
      const starValue = i + 1;
      let fillColor = '#ccc';
      if (isInteractive) {
        fillColor = starValue <= rating ? '#EDB310' : '#ccc';
      } else {
        if (i + 1 <= Math.floor(rating)) {
          fillColor = '#EDB310';
        } else if (i + 1 === Math.ceil(rating) && !Number.isInteger(rating)) {
          fillColor = '#EDB31080';
        }
      }
      return (
        <TouchableOpacity
          key={i}
          onPress={() => isInteractive && onRatingChange(starValue)}
          disabled={!isInteractive}>
          <StarIcon fill={fillColor} />
        </TouchableOpacity>
      );
    });

    return (
      <View
        style={[
          commonStyles.row,
          styles.stars,
          {justifyContent: 'flex-start'},
        ]}>
        {stars}
      </View>
    );
  },
);

// Component ProductHeader
const ProductHeader = React.memo(({product, averageRating}) => {
  const {theme} = useTheme();

  return (
    <View
      style={[
        styles.header,
        {borderBottomWidth: 1, borderBottomColor: theme.border},
      ]}>
      <FastImage
        source={{
          uri: product?.thumbnail,
          priority: FastImage.priority.normal,
        }}
        style={[
          styles.productImage,
          {borderWidth: 1, borderColor: theme.border},
        ]}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={[styles.productTitle, {color: theme.text}]}>
        {product?.title || 'Sản phẩm'}
      </Text>
      <View style={styles.ratingContainer}>
        <StarRating rating={parseFloat(averageRating)} />
        <Text style={[styles.ratingCount, {color: theme.text}]}>
          ({averageRating})
        </Text>
      </View>
    </View>
  );
});

// Component ReviewForm
const ReviewForm = React.memo(
  ({rating, setRating, comment, setComment, error, onSubmit}) => {
    const {theme} = useTheme();
    return (
      <View
        style={[
          styles.reviewForm,
          {backgroundColor: theme.backgroundSecondary},
        ]}>
        <Text style={[styles.formTitle, {color: theme.text}]}>
          Đánh giá sản phẩm
        </Text>
        <View style={{marginBottom: scale(14)}}>
          <StarRating
            rating={rating}
            onRatingChange={setRating}
            isInteractive={true}
          />
        </View>
        <TextInput
          style={[
            styles.commentInput,
            {borderColor: theme.border, color: theme.text},
          ]}
          placeholder="Viết nhận xét của bạn..."
          placeholderTextColor={theme.text}
          multiline
          value={comment}
          onChangeText={setComment}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Button
          text="Gửi đánh giá"
          onPress={onSubmit}
          buttonStyle={styles.submitButton}
          textStyle={styles.submitButtonText}
        />
      </View>
    );
  },
);

// Component ReviewItem
const ReviewItem = React.memo(({review, fadeAnim}) => {
  const {theme} = useTheme();

  return (
    <Animated.View
      style={[
        styles.reviewItem,
        {
          opacity: fadeAnim,
          backgroundColor: theme.card,
          borderWidth: 1,
          borderColor: theme.border,
        },
      ]}>
      <View style={styles.reviewHeader}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', gap: scale(10)}}>
          <FastImage
            style={styles.reviewImage}
            source={{uri: review.image, priority: FastImage.priority.normal}}
            resizeMode={FastImage.resizeMode.cover}
            fallback
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              gap: scale(2),
            }}>
            <Text style={[styles.reviewUser, {color: theme.text}]}>
              Người dùng: {review.name}
            </Text>
            <Text style={[styles.reviewDate, {color: theme.textSecondary}]}>
              {new Date(review.createdAt).toLocaleDateString('vi-VN')}
            </Text>
          </View>
        </View>
      </View>
      <View style={[commonStyles.row, styles.reviewStars]}>
        <StarRating rating={review.rating} />
        <Text style={[styles.ratingCount, {color: theme.text}]}>
          ({review.rating})
        </Text>
      </View>
      <Text style={[styles.reviewComment, {color: theme.text}]}>
        {review.comment}
      </Text>
    </Animated.View>
  );
});

// Main Component
const ProductReviewScreen = () => {
  const {theme} = useTheme();
  const {order} = useRoute().params || {};

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  const user = getCurrentUser();

  useEffect(() => {
    const loadReviews = () => {
      const stored = getReview(user.id);
      const filtered = stored.filter(r => r.productId === order?.product?.id);
      setReviews(filtered);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };
    loadReviews();
  }, [order?.product?.id, fadeAnim, user.id]);

  const handleSubmitReview = useCallback(() => {
    if (rating === 0) return setError('Vui lòng chọn số sao');
    if (!comment.trim()) return setError('Vui lòng nhập nhận xét');

    const newReview = {
      id: Date.now().toString(),
      productId: order?.product?.id,
      name: order?.user?.username,
      image: order?.user?.image,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    addReview(user.id, newReview);
    setReviews(prev => [newReview, ...prev]);
    setRating(0);
    setComment('');
    setError(null);
  }, [rating, comment, order?.product?.id, user.id]);

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
        1,
      )
    : 0;

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <ProductHeader product={order?.product} averageRating={averageRating} />
      <ReviewForm
        rating={rating}
        setRating={setRating}
        comment={comment}
        setComment={setComment}
        error={error}
        onSubmit={handleSubmitReview}
      />
      <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ReviewItem review={item} fadeAnim={fadeAnim} />
        )}
        contentContainerStyle={styles.reviewList}
        ListEmptyComponent={
          <Text style={[styles.emptyText, {color: theme.textSecondary}]}>
            Chưa có đánh giá nào
          </Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: scale(16),
    alignItems: 'center',
  },
  productImage: {
    width: scale(80),
    height: scale(80),
    borderRadius: 999,
    marginBottom: scale(10),
  },
  productTitle: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    textAlign: 'center',
    marginBottom: scale(10),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  starIcon: {
    marginHorizontal: scale(2),
  },
  starIconSmall: {
    marginHorizontal: scale(1),
    transform: [{scale: 0.8}],
  },
  ratingCount: {
    fontSize: FontSizes.medium,
    marginLeft: scale(5),
  },
  reviewForm: {
    padding: scale(16),
    marginBottom: scale(10),
    ...Shadows.medium,
  },
  formTitle: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(10),
  },
  commentInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: scale(10),
    paddingLeft: scale(16),
    marginBottom: scale(16),
    fontSize: FontSizes.regular,
  },
  submitButton: {
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    textAlign: 'center',
  },
  errorText: {
    color: Colors.error,
    fontSize: FontSizes.small,
    marginBottom: scale(10),
    textAlign: 'center',
  },
  reviewList: {
    padding: scale(16),
  },
  reviewItem: {
    padding: scale(16),
    borderRadius: 8,
    marginBottom: scale(10),
    ...Shadows.small,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(5),
  },
  reviewImage: {
    width: scale(35),
    height: scale(35),
    borderRadius: 9999,
  },
  reviewUser: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
  },
  reviewStars: {
    alignItems: 'center',
  },
  reviewComment: {
    fontSize: FontSizes.regular,
    marginBottom: scale(5),
  },
  reviewDate: {
    fontSize: FontSizes.xsmall,
  },
  emptyText: {
    fontSize: FontSizes.regular,
    textAlign: 'center',
    padding: scale(20),
  },
});

export default ProductReviewScreen;
