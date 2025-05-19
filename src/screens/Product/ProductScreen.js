import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {
  FilterIcon,
  MicIcon,
  SearchIcon_2,
  SortIcon,
} from '../../assets/icons/Icons';
import styles from './ProductStyles';
import Input from '../../components/ui/input';
import ProductList from '../../components/product/ProductList';
import commonStyles from '../../styles/commonStyles';
import {useQuery} from '@tanstack/react-query';
import {fetchProducts} from '../../api/productApi';
import {useFocusEffect} from '@react-navigation/core';
import productData from '../../data/productData';

const ProductScreen = () => {
  // Gọi api products
  // const {data, isLoading, isError, refetch} = useQuery({
  //   queryKey: ['products'],
  //   queryFn: fetchProducts,
  // });

  // if (isLoading) return <ActivityIndicator size="large" />;

  // if (isError) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <Text>Lỗi khi tải dữ liệu.</Text>
  //       <TouchableOpacity onPress={refetch}>
  //         <Text style={{color: 'blue', marginTop: 10}}>Thử lại</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  const [totalProduct, setTotalProduct] = useState([0]);

  useFocusEffect(
    useCallback(() => {
      const total = productData.length;
      setTotalProduct(total);
    }, []),
  );

  return (
    <View style={[commonStyles.screenContainer]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <Input
            placeholder="Search any Product.."
            leftIcon={SearchIcon_2}
            rightIcon={MicIcon}
            inputStyle={styles.searchInput}
          />
        </View>

        <View style={[commonStyles.rowSpaceBetween, styles.sectionHeader]}>
          <Text style={styles.sectionTitle}>Total product: {totalProduct}</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={[commonStyles.row, styles.actionButton]}>
              <Text style={styles.actionText}>Sort</Text>
              <SortIcon style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={[commonStyles.row, styles.actionButton]}>
              <Text style={styles.actionText}>Filter</Text>
              <FilterIcon style={styles.actionIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <ProductList />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductScreen;
