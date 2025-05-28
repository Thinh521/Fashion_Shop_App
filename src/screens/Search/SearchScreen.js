import React, {useCallback, useState, useRef, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Animated,
  Easing,
  Modal,
} from 'react-native';
import {
  FilterIcon,
  MicIcon,
  SearchIcon_2,
  SortIcon,
} from '../../assets/icons/Icons';
import Input from '../../components/ui/input';
import ProductList from '../../components/product/ProductList';
import commonStyles from '../../styles/commonStyles';
import {useFocusEffect, useRoute} from '@react-navigation/core';
import {Button} from '../../components/ui/button/Button';
import {scale} from '../../utils/scaling';
import {useTheme} from '../../contexts/ThemeContext';
import createStyles from './Search.styles';
import {showMessage} from 'react-native-flash-message';
import {useProducts} from '../../hooks/useProducts';
import {useCategories} from '../../hooks/useCategories';

const SearchScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const {data: products = []} = useProducts();
  const {data: categories = []} = useCategories();
  const {categorySlug, categoryName} = useRoute().params || {};
  const [searchItem, setSearchItem] = useState('');
  const [totalProduct, setTotalProduct] = useState(0);
  const [filters, setFilters] = useState({
    type: 'Tất cả',
    minPrice: '',
    maxPrice: '',
  });
  const [tempFilters, setTempFilters] = useState(filters);
  const [sort, setSort] = useState('Tất cả');
  const [tempSort, setTempSort] = useState(sort);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterReset, setFilterReset] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Danh sách productTypes filter từ API
  const productTypes = useMemo(
    () => ['Tất cả', ...categories.map(cat => cat.name)],
    [categories],
  );

  const sortOptions = [
    'Tất cả',
    'Tên A-Z',
    'Tên Z-A',
    'Giá thấp đến cao',
    'Giá cao đến thấp',
  ];

  useEffect(() => {
    if (categorySlug && categoryName) {
      setFilters({
        type: categorySlug,
        minPrice: '',
        maxPrice: '',
      });
      setTempFilters({
        type: categoryName,
        minPrice: '',
        maxPrice: '',
      });
      setFilterReset(true);
    }
  }, [categorySlug, categoryName]);

  useFocusEffect(
    useCallback(() => {
      setTotalProduct(products.length);
    }, [products]),
  );

  const toggleModal = useCallback(
    (modalType, open) => {
      const setModal =
        modalType === 'filter' ? setFilterModalVisible : setSortModalVisible;
      if (open) {
        modalType === 'filter' ? setTempFilters(filters) : setTempSort(sort);
        setModal(true);
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start(() => setModal(false));
      }
    },
    [
      slideAnim,
      filters,
      sort,
      setTempFilters,
      setTempSort,
      setFilterModalVisible,
      setSortModalVisible,
    ],
  );

  const applyFilters = useCallback(() => {
    if (
      tempFilters.minPrice &&
      tempFilters.maxPrice &&
      Number(tempFilters.minPrice) > Number(tempFilters.maxPrice)
    ) {
      showMessage({
        message: 'Lỗi',
        description: 'Giá tối thiểu phải nhỏ hơn hoặc bằng giá tối đa',
        type: 'danger',
        duration: 2000,
        icon: 'danger',
        style: {
          alignItems: 'center',
          paddingVertical: 20,
        },
      });
      return;
    }

    // Ánh xạ name về slug khi áp dụng bộ lọc
    const typeSlug =
      tempFilters.type === 'Tất cả'
        ? 'Tất cả'
        : categories.find(cat => cat.name === tempFilters.type)?.slug ||
          tempFilters.type;
    setFilters({
      type: typeSlug,
      minPrice: tempFilters.minPrice,
      maxPrice: tempFilters.maxPrice,
    });
    toggleModal('filter', false);
    setFilterReset(true);
  }, [tempFilters, categories]);

  const applySort = useCallback(() => {
    setSort(tempSort);
    toggleModal('sort', false);
  }, [tempSort, setSort, toggleModal]);

  const filterTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  // Reset Filter
  const resetFilter = () => {
    const defaultFilter = {
      type: 'Tất cả',
      minPrice: '',
      maxPrice: '',
    };
    setFilters(defaultFilter);
    setTempFilters(defaultFilter);
    setFilterReset(false);
  };

  // Render sort label
  const renderSortLabel = sortOption => {
    switch (sortOption) {
      case 'Tên A-Z':
        return 'Tên A-Z';
      case 'Tên Z-A':
        return 'Tên Z-A';
      case 'Giá thấp đến cao':
        return 'Giá A-Z';
      case 'Giá cao đến thấp':
        return 'Giá Z-A';
      default:
        return 'Sắp xếp';
    }
  };

  const renderModal = (type, content) => (
    <Modal
      animationType="none"
      transparent
      visible={type === 'filter' ? filterModalVisible : sortModalVisible}
      onRequestClose={() => toggleModal(type, false)}>
      <View style={styles.filterModalContainer}>
        <TouchableOpacity
          style={styles.filterModalOverlay}
          onPress={() => toggleModal(type, false)}
        />
        <Animated.View
          style={[
            styles.filterContainer,
            {transform: [{translateY: filterTranslateY}]},
          ]}>
          {content}
          <View style={styles.buttonContainer}>
            <Button
              text="Hủy"
              textStyle={styles.buttonText}
              buttonStyle={[styles.buttonfilter, styles.closeButton]}
              onPress={() => toggleModal(type, false)}
            />
            <Button
              text="Áp dụng"
              textStyle={styles.buttonText_2}
              buttonStyle={styles.buttonfilter}
              onPress={type === 'filter' ? applyFilters : applySort}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );

  return (
    <View style={{backgroundColor: theme.background}}>
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={
          <>
            {/* Phần tìm kiếm và hành động */}
            <View style={{padding: scale(16), paddingBottom: scale(80)}}>
              <View style={styles.searchContainer}>
                <Input
                  placeholder="Search any Product.."
                  leftIcon={SearchIcon_2}
                  rightIcon={MicIcon}
                  value={searchItem}
                  onChangeText={setSearchItem}
                  inputStyle={styles.searchInput}
                />
              </View>
              <View
                style={[commonStyles.rowSpaceBetween, styles.sectionHeader]}>
                <Text style={styles.sectionTitle}>
                  Tổng sản phẩm: {totalProduct}
                </Text>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity
                    style={[commonStyles.row, styles.actionButton]}
                    onPress={() => toggleModal('sort', true)}>
                    <Text style={styles.actionText}>
                      {renderSortLabel(sort === 'Tất cả' ? 'Sắp xếp' : 'sort')}
                    </Text>
                    <SortIcon style={styles.actionIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[commonStyles.row, styles.actionButton]}
                    onPress={
                      filterReset
                        ? resetFilter
                        : () => toggleModal('filter', true)
                    }>
                    <Text style={styles.actionText}>
                      {filterReset ? 'Đặt lại' : 'Lọc'}
                    </Text>
                    <FilterIcon style={styles.actionIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              <ProductList
                searchItem={searchItem}
                filters={filters}
                sort={sort}
                setTotalProduct={setTotalProduct}
              />
            </View>

            {/* Modal lọc sản phẩm */}
            {renderModal(
              'filter',
              <>
                <Text style={styles.title}>Lọc sản phẩm</Text>
                <View style={styles.filterSection}>
                  <Text style={styles.label}>Loại sản phẩm:</Text>
                  <TouchableOpacity
                    style={styles.typeButton}
                    onPress={() => setModalVisible(true)}>
                    <Text style={{color: theme.text}}>{tempFilters.type}</Text>
                  </TouchableOpacity>
                  <Modal
                    animationType="slide"
                    transparent
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <FlatList
                          data={productTypes}
                          keyExtractor={(item, index) => `type-${index}`}
                          renderItem={({item}) => (
                            <TouchableOpacity
                              style={[
                                styles.modalItem,
                                tempFilters.type === item &&
                                  styles.selectedSortItem,
                              ]}
                              onPress={() => {
                                setTempFilters({...tempFilters, type: item});
                                setModalVisible(false);
                              }}>
                              <Text
                                style={[
                                  styles.modalItemText,
                                  tempFilters.type === item &&
                                    styles.selectedSortText,
                                ]}>
                                {item}
                              </Text>
                            </TouchableOpacity>
                          )}
                        />
                      </View>
                    </View>
                  </Modal>
                </View>
                <View style={styles.filterSection}>
                  <Text style={styles.label}>Khoảng giá:</Text>
                  <View style={styles.priceInputContainer}>
                    <TextInput
                      style={styles.priceInput}
                      placeholder="Từ"
                      placeholderTextColor={theme.text}
                      keyboardType="numeric"
                      value={tempFilters.minPrice}
                      onChangeText={text =>
                        setTempFilters({...tempFilters, minPrice: text})
                      }
                    />
                    <Text style={styles.priceSeparator}>-</Text>
                    <TextInput
                      style={styles.priceInput}
                      placeholder="Đến"
                      placeholderTextColor={theme.text}
                      keyboardType="numeric"
                      value={tempFilters.maxPrice}
                      onChangeText={text =>
                        setTempFilters({...tempFilters, maxPrice: text})
                      }
                    />
                  </View>
                </View>
              </>,
            )}

            {/* Modal sắp xếp */}
            {renderModal(
              'sort',
              <View style={styles.filterSection}>
                <Text style={styles.title}>Sắp xếp sản phẩm:</Text>
                <FlatList
                  data={sortOptions}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[
                        styles.modalItem,
                        tempSort === item && styles.selectedSortItem,
                      ]}
                      onPress={() => setTempSort(item)}>
                      <Text
                        style={[
                          styles.modalItemText,
                          tempSort === item && styles.selectedSortText,
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>,
            )}
          </>
        }
      />
    </View>
  );
};

export default SearchScreen;
