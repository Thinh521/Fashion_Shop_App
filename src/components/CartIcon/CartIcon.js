import React, {useEffect, useRef, forwardRef, useState} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import {CartIcon} from '../../assets/icons/Icons';
import {
  getCartKey,
  getCurrentUserId,
  getTotalCartQuantity,
  storage,
} from '../../utils/storage';
import {scale} from '../../utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {useTheme} from '../../contexts/ThemeContext';

const CartIconHeader = forwardRef((props, ref) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [totalQuantity, setTotalQuantity] = useState(0);
  const userId = getCurrentUserId();
  const {theme} = useTheme();
  const styles = createStyles(theme);

  useEffect(() => {
    const key = getCartKey(userId);

    const updateQuantity = () => {
      const total = getTotalCartQuantity(userId);
      setTotalQuantity(total);
    };

    updateQuantity();

    const unsubscribe = storage.addOnValueChangedListener(changedKey => {
      if (changedKey === key) {
        updateQuantity();
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.8,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
      }
    });

    return () => unsubscribe.remove();
  }, [userId, scaleAnim]);

  return (
    <View ref={ref} style={styles.container}>
      <CartIcon style={styles.icon} />
      {totalQuantity > 0 && (
        <Animated.View
          style={[styles.badge, {transform: [{scale: scaleAnim}]}]}>
          <Text numberOfLines={1} ellipsizeMode="clip" style={styles.badgeText}>
            {totalQuantity}
          </Text>
        </Animated.View>
      )}
    </View>
  );
});

const createStyles = theme =>
  StyleSheet.create({
    container: {
      padding: scale(2),
      position: 'relative',
    },
    badge: {
      position: 'absolute',
      right: scale(-8),
      top: scale(-6),
      backgroundColor: '#FF3D00',
      borderRadius: 12,
      minWidth: scale(18),
      paddingHorizontal: scale(4),
      paddingVertical: scale(2),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#fff',
    },
    badgeText: {
      textAlign: 'center',
      color: Colors.white,
      fontSize: FontSizes.xsmall - 2,
      fontWeight: FontWeights.bold,
    },
    icon: {
      color: theme.icon,
    },
  });

export default CartIconHeader;
