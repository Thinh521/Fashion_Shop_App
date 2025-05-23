import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import createStyles from './order.styles';
import {getCurrentUser, getOrder} from '../../utils/storage';
import FastImage from 'react-native-fast-image';
import commonStyles from '../../styles/commonStyles';

const OrderScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const [orders, setOrders] = useState([]);
  const user = getCurrentUser();

  console.log(orders);

  useEffect(() => {
    const loadOrders = async () => {
      if (user?.id) {
        try {
          const fetchedOrders = await getOrder(user.id);
          setOrders(fetchedOrders);
        } catch (error) {
          console.error('Lỗi khi tải đơn hàng:', error);
        }
      }
    };
    loadOrders();
  }, [user?.id]);

  if (!orders.length) {
    return (
      <View style={[styles.center, {backgroundColor: theme.background}]}>
        <Text style={[styles.emptyText, {color: theme.text}]}>
          Bạn chưa có đơn hàng nào
        </Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <FlatList
        data={orders}
        style={{padding: 16}}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View>
            <View style={styles.card}>
              <View style={styles.header}>
                <Text style={[styles.orderId, {color: theme.text}]}>
                  Đơn hàng #{item.id.split('_')[1]}
                </Text>
                <Text
                  style={[
                    styles.status,
                    {
                      color:
                        item.status === 'pending' ? theme.text : theme.text,
                    },
                  ]}>
                  {item.status === 'pending' ? 'Đang xử lý' : 'Hoàn thành'}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.orderBox}>
                <FastImage
                  style={styles.image}
                  source={item.product?.images[0]}
                />
                <View style={{flex: 1}}>
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailName, {color: theme.text}]}>
                      {item.product?.productName || 'Không có tên sản phẩm'}
                    </Text>
                  </View>
                  <View style={commonStyles.row}>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailText, {color: theme.text}]}>
                        Màu: {item.product?.colorName || 'Không có màu'}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailText, {color: theme.text}]}>
                        Kích thước:{' '}
                        {item.product?.sizeName || 'Không có kích thước'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailText, {color: theme.text}]}>
                      Số lượng: {item.product?.quantity ?? 'Không có số lượng'}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailText, {color: theme.text}]}>
                      Giá:{' '}
                      {item.product?.price
                        ? `${item.product.price.toLocaleString()} VNĐ`
                        : 'Không có giá'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.detailText, {color: theme.text}]}>
                  Địa chỉ: {item.address || 'Không có địa chỉ'}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.detailText, {color: theme.text}]}>
                  Ngày: {item.createdAt}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default OrderScreen;
