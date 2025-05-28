import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {
  DeliverIcon,
  LocationIcon_2,
  RightIcon_3,
} from '../../assets/icons/Icons';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../contexts/ThemeContext';
import {scale} from '../../utils/scaling';
import {Colors, FontSizes, FontWeights, Shadows} from '../../theme/theme';
import {Button} from '../../components/ui/button/Button';

const OrderDetailScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const {order} = useRoute().params;

  if (!order) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Không tìm thấy đơn hàng</Text>
      </View>
    );
  }

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = status => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return '#FF6B35';
      case 'processing':
        return '#4ECDC4';
      case 'shipped':
        return '#45B7D1';
      case 'delivered':
        return '#96CEB4';
      case 'cancelled':
        return '#F38BA8';
      default:
        return '#6C757D';
    }
  };

  const getStatusText = status => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'Chờ xử lý';
      case 'processing':
        return 'Đang xử lý';
      case 'shipped':
        return 'Đang vận chuyển';
      case 'delivered':
        return 'Đã giao hàng';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Thông tin giao hàng */}
        <View style={styles.headerBox}>
          <LinearGradient
            colors={['#F83758', '#764ba2']}
            style={styles.headerGradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <Text style={styles.dateText}>
              Dự kiến: {formatDate(order.createdAt)}
            </Text>
          </LinearGradient>
          <View style={{padding: 18, flex: 1}}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Thông tin vận chuyển</Text>
                <Text style={styles.sectionTitle_2}>
                  SPX Express: SPXVN5446946867
                </Text>
              </View>
              <View>
                <RightIcon_3 style={styles.arrowIcon} />
              </View>
            </View>
            <View style={styles.xeBox}>
              <DeliverIcon />
              <View>
                <Text style={styles.statusText}>
                  {getStatusText(order.status)}
                </Text>
                <Text style={styles.statusText}>
                  Dự kiến: {formatDate(order.createdAt)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Địa chỉ giao hàng */}
        <View style={styles.addressContainer}>
          <View style={[styles.sectionHeader, {gap: 10}]}>
            <LocationIcon_2 />
            <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
          </View>

          <View style={styles.addressCard}>
            <Text style={styles.recipientName}>
              Name: {order?.user?.username || 'Khách hàng'}
            </Text>
            <Text style={styles.recipientPhone}>
              Phone: {order?.user?.phone || 'Không có SĐT'}
            </Text>
            <Text numberOfLines={1} style={styles.address}>
              Address: {order?.address || 'Không có địa chỉ'}
            </Text>
          </View>
        </View>

        {/* Thông tin sản phẩm */}
        <View style={styles.addressContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sản phẩm đã đặt</Text>
          </View>

          <TouchableOpacity style={styles.productCard}>
            <View style={styles.productContent}>
              <View style={styles.imageContainer}>
                <FastImage
                  source={{
                    uri:
                      order.product?.thumbnail ||
                      'https://via.placeholder.com/150',
                  }}
                  style={styles.productImage}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.1)']}
                  style={styles.imageOverlay}
                />
              </View>

              <View style={styles.productDetails}>
                <View style={styles.productInfo}>
                  <View style={{marginBottom: 6}}>
                    <Text style={styles.productTitle} numberOfLines={1}>
                      {order.product?.title || 'Sản phẩm không xác định'}
                    </Text>
                  </View>
                  {order.product?.colorName && (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Màu sắc:</Text>
                      <View style={styles.colorIndicator}>
                        <Text style={styles.infoValue}>
                          {order.product.colorName}
                        </Text>
                      </View>
                    </View>
                  )}

                  {order.product?.sizeName && (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Kích thước:</Text>
                      <Text style={styles.infoValue}>
                        {order.product.sizeName}
                      </Text>
                    </View>
                  )}

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>
                      Số lượng: {order.product?.quantity || 1}
                    </Text>
                  </View>

                  <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Đơn giá</Text>
                    <Text style={styles.price}>
                      {(order.product?.price || 0).toLocaleString('vi-VN')} ₫
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Tổng kết đơn hàng */}
        <View style={{marginBottom: 16}}>
          <LinearGradient
            colors={['#f093fb', '#f5576c']}
            style={styles.summaryCard}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>Tổng thanh toán</Text>
              <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPrice}>
                  {(
                    (order.product?.price || 0) * (order.product?.quantity || 1)
                  ).toLocaleString('vi-VN')}{' '}
                  ₫
                </Text>
              </View>
            </View>

            <View style={styles.paymentInfo}>
              <Text style={styles.paymentMethod}>
                💳 {order.paymentMethod || 'Thanh toán khi nhận hàng'}
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Các nút hành động - Cố định dưới cùng */}
      <View style={styles.fixedActionSection}>
        <Button
          text="Liên hệ hỗ trợ"
          buttonStyle={[
            styles.buttonFooter,
            {backgroundColor: '#fff', borderWidth: 2, borderColor: '#FF6B6B'},
          ]}
          textStyle={[styles.buttonText, {color: '#FF6B6B'}]}
        />
        <Button
          text="Theo dõi đơn hàng"
          buttonStyle={[
            styles.buttonFooter,
            {
              backgroundColor: '#FF6B6B',
              borderWidth: 0,
            },
          ]}
          textStyle={[styles.buttonText, {color: '#fff'}]}
        />
      </View>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollView: {
      flex: 1,
      padding: scale(16),
      marginBottom: 90,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
    },
    errorText: {
      fontSize: 18,
      color: '#dc3545',
      fontWeight: '600',
    },
    headerBox: {
      borderWidth: 1,
      borderRadius: 12,
      ...Shadows.medium,
      marginBottom: scale(16),
      borderColor: theme.border,
      backgroundColor: theme.background,
    },
    addressContainer: {
      borderWidth: 1,
      borderColor: theme.border,
      padding: 18,
      borderRadius: 12,
      ...Shadows.medium,
      backgroundColor: theme.background,
      marginBottom: scale(16),
    },
    headerGradient: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    dateText: {
      color: Colors.white,
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.semiBold,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    orderNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },
    statusBadge: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    statusText: {
      color: theme.text,
      fontSize: FontSizes.small,
      fontWeight: FontWeights.regular,
    },

    // Section styles
    section: {
      marginHorizontal: 16,
      marginTop: 20,
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    iconContainer: {
      width: 40,
      height: 40,
      backgroundColor: '#f8f9fa',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    iconText: {
      fontSize: 20,
    },
    sectionTitleContainer: {
      flex: 1,
      gap: 4,
      flexDirection: 'column',
    },
    sectionTitle: {
      color: theme.text,
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.semiBold,
    },
    sectionTitle_2: {
      color: theme.text,
      fontSize: FontSizes.small,
      fontWeight: FontWeights.regular,
    },
    arrowIcon: {
      width: 18,
      height: 18,
      color: theme.icon,
    },
    xeBox: {
      gap: scale(10),
      flexDirection: 'row',
      alignItems: 'center',
    },

    // Address styles
    addressCard: {
      backgroundColor: '#f8f9fa',
      borderRadius: 12,
      padding: 16,
      borderLeftWidth: 4,
      borderLeftColor: Colors.primary,
    },
    recipientName: {
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.regular,
      color: theme.text,
      marginBottom: 8,
    },
    recipientPhone: {
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.regular,
      color: theme.text,
      marginBottom: 8,
    },
    address: {
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.regular,
      color: theme.text,
      lineHeight: 24,
    },

    // Product styles
    productCard: {
      borderRadius: 12,
      overflow: 'hidden',
    },
    productHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    productTitle: {
      flex: 1,
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.semiBold,
      color: theme.text,
    },
    productContent: {
      flexDirection: 'row',
      gap: 16,
    },
    imageContainer: {
      position: 'relative',
      borderRadius: 12,
      overflow: 'hidden',
    },
    productImage: {
      width: 100,
      height: 100,
      borderRadius: 12,
    },
    imageOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 30,
    },
    productDetails: {
      flex: 1,
      flexDirection: 'column',
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    infoLabel: {
      fontSize: 14,
      color: '#6c757d',
      fontWeight: '500',
    },
    infoValue: {
      fontSize: 14,
      color: '#2c3e50',
      fontWeight: '600',
    },
    colorIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    priceLabel: {
      fontSize: 12,
      color: '#6c757d',
      marginBottom: 4,
    },
    price: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#e74c3c',
    },

    // Summary styles
    summaryCard: {
      borderRadius: 16,
      padding: 20,
    },
    summaryContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    summaryLabel: {
      fontSize: 18,
      color: '#fff',
      fontWeight: '600',
    },
    totalPriceContainer: {
      alignItems: 'flex-end',
    },
    totalPrice: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },
    paymentInfo: {
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: 'rgba(255,255,255,0.3)',
    },
    paymentMethod: {
      color: '#fff',
      fontSize: 16,
      opacity: 0.9,
    },

    // Fixed Action Section (Footer)
    fixedActionSection: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: scale(16),
      backgroundColor: theme.background,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      overflow: 'hidden',
      paddingTop: scale(8),
    },
    buttonFooter: {
      flex: 1,
      height: scale(48),
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 0,
      borderRadius: 12,
      marginHorizontal: scale(4),
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    primaryButtonText: {
      color: Colors.primary,
    },
    buttonPrimary: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: Colors.primary,
    },
  });

export default OrderDetailScreen;
