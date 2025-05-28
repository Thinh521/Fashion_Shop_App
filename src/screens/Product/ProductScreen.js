import React, {useCallback, useState, useRef, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Animated,
  Easing,
  Modal,
  InteractionManager,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {
  FilterIcon,
  MicIcon,
  SearchIcon_2,
  SortIcon,
} from '../../assets/icons/Icons';
import Input from '../../components/ui/input';
import ProductList from '../../components/product/ProductList';
import commonStyles from '../../styles/commonStyles';
import {useFocusEffect} from '@react-navigation/core';
import {Button} from '../../components/ui/button/Button';
import {scale} from '../../utils/scaling';
import {useTheme} from '../../contexts/ThemeContext';
import {useCategories} from '../../hooks/useCategories';
import {useProducts} from '../../hooks/useProducts';
import {showMessage} from 'react-native-flash-message';
import createStyles from './ProductStyles';
import {debounce} from 'lodash';

// Constants
const SORT_OPTIONS = [
  'Tất cả',
  'Tên A-Z',
  'Tên Z-A',
  'Giá thấp đến cao',
  'Giá cao đến thấp',
];

const SORT_LABELS = {
  'Tên A-Z': 'Tên A-Z',
  'Tên Z-A': 'Tên Z-A',
  'Giá thấp đến cao': 'Giá thấp',
  'Giá cao đến thấp': 'Giá cao',
};

const DEFAULT_FILTERS = {
  type: 'Tất cả',
  minPrice: '',
  maxPrice: '',
};

// Memoized modal components
const TypeSelectionModal = React.memo(
  ({visible, productTypes, selectedType, onSelect, onClose, styles}) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      hardwareAccelerated={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FlatList
            data={productTypes}
            keyExtractor={(item, index) => `type-${index}`}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.modalItem,
                  selectedType === item && styles.selectedSortItem,
                ]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}>
                <Text
                  style={[
                    styles.modalItemText,
                    selectedType === item && styles.selectedSortText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={10}
            removeClippedSubviews={true}
          />
        </View>
      </View>
    </Modal>
  ),
);

const SortModal = React.memo(
  ({visible, sortOptions, selectedSort, onSelect, onClose, styles}) => (
    <View style={styles.filterSection}>
      <Text style={styles.title}>Sắp xếp sản phẩm:</Text>
      <FlatList
        data={sortOptions}
        keyExtractor={(item, index) => `sort-${index}`}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.modalItem,
              selectedSort === item && styles.selectedSortItem,
            ]}
            onPress={() => onSelect(item)}>
            <Text
              style={[
                styles.modalItemText,
                selectedSort === item && styles.selectedSortText,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
      />
    </View>
  ),
);

const FilterModal = React.memo(
  ({
    tempFilters,
    setTempFilters,
    productTypes,
    categoryMap,
    theme,
    styles,
    onTypeModalOpen,
    modalVisible,
    onTypeModalClose,
  }) => (
    <>
      <Text style={styles.title}>Lọc sản phẩm</Text>
      <View style={styles.filterSection}>
        <Text style={styles.label}>Loại sản phẩm:</Text>
        <TouchableOpacity style={styles.typeButton} onPress={onTypeModalOpen}>
          <Text style={{color: theme.text}}>
            {categoryMap[tempFilters.type] || tempFilters.type}
          </Text>
        </TouchableOpacity>

        <TypeSelectionModal
          visible={modalVisible}
          productTypes={productTypes}
          selectedType={tempFilters.type}
          onSelect={item => setTempFilters(prev => ({...prev, type: item}))}
          onClose={onTypeModalClose}
          styles={styles}
        />
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
              setTempFilters(prev => ({...prev, minPrice: text}))
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
              setTempFilters(prev => ({...prev, maxPrice: text}))
            }
          />
        </View>
      </View>
    </>
  ),
);

const ProductScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const route = useRoute();
  const {data: products = []} = useProducts();
  const {data: categories = []} = useCategories();
  const {categorySlug, categoryName} = route.params || {};

  // State management
  const [searchItem, setSearchItem] = useState('');
  const [totalProduct, setTotalProduct] = useState(0);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [tempFilters, setTempFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState('Tất cả');
  const [tempSort, setTempSort] = useState('Tất cả');
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterReset, setFilterReset] = useState(false);

  // Refs
  const slideAnim = useRef(new Animated.Value(0)).current;
  const searchTimeoutRef = useRef(null);

  // Memoized values
  const categoryMap = useMemo(() => {
    const map = {};
    categories.forEach(cat => {
      map[cat.slug] = cat.name;
    });
    return map;
  }, [categories]);

  const productTypes = useMemo(
    () => ['Tất cả', ...categories.map(cat => cat.name)],
    [categories],
  );

  // Debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce(text => {
        setSearchItem(text);
      }, 300),
    [],
  );

  // Initialize filters from route params
  useEffect(() => {
    if (categorySlug && categoryName) {
      const newFilters = {
        type: categorySlug,
        minPrice: '',
        maxPrice: '',
      };
      const newTempFilters = {
        type: categoryName,
        minPrice: '',
        maxPrice: '',
      };

      setFilters(newFilters);
      setTempFilters(newTempFilters);
      setFilterReset(true);
    }
  }, [categorySlug, categoryName]);

  // Focus effect for product count
  useFocusEffect(
    useCallback(() => {
      InteractionManager.runAfterInteractions(() => {
        setTotalProduct(products.length);
      });
    }, [products.length]),
  );

  // Modal animation functions
  const toggleModal = useCallback(
    (modalType, open) => {
      const setModal =
        modalType === 'filter' ? setFilterModalVisible : setSortModalVisible;

      if (open) {
        if (modalType === 'filter') {
          setTempFilters(filters);
        } else {
          setTempSort(sort);
        }
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
    [slideAnim, filters, sort],
  );

  // Filter validation and application
  const applyFilters = useCallback(() => {
    const minPrice = tempFilters.minPrice ? Number(tempFilters.minPrice) : 0;
    const maxPrice = tempFilters.maxPrice
      ? Number(tempFilters.maxPrice)
      : Infinity;

    if (tempFilters.minPrice && tempFilters.maxPrice && minPrice > maxPrice) {
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

    // Map category name to slug
    const typeSlug =
      tempFilters.type === 'Tất cả'
        ? 'Tất cả'
        : categories.find(cat => cat.name === tempFilters.type)?.slug ||
          tempFilters.type;

    const newFilters = {
      type: typeSlug,
      minPrice: tempFilters.minPrice,
      maxPrice: tempFilters.maxPrice,
    };

    setFilters(newFilters);
    setFilterReset(true);
    toggleModal('filter', false);
  }, [tempFilters, categories, toggleModal]);

  // Sort application
  const applySort = useCallback(() => {
    setSort(tempSort);
    toggleModal('sort', false);
  }, [tempSort, toggleModal]);

  // Reset filters
  const resetFilter = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setTempFilters(DEFAULT_FILTERS);
    setFilterReset(false);
  }, []);

  // Handle search input
  const handleSearchChange = useCallback(text => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setSearchItem(text);
    }, 300);
  }, []);

  // Render sort label
  const renderSortLabel = useCallback(sortOption => {
    return SORT_LABELS[sortOption] || 'Sắp xếp';
  }, []);

  // Animation interpolations
  const filterTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  // Modal rendering function
  const renderModal = useCallback(
    (type, content) => (
      <Modal
        animationType="none"
        transparent={true}
        visible={type === 'filter' ? filterModalVisible : sortModalVisible}
        onRequestClose={() => toggleModal(type, false)}
        hardwareAccelerated={true}>
        <View style={styles.filterModalContainer}>
          <TouchableOpacity
            style={styles.filterModalOverlay}
            activeOpacity={1}
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
                buttonStyle={styles.buttonfilter}
                onPress={type === 'filter' ? applyFilters : applySort}
              />
            </View>
          </Animated.View>
        </View>
      </Modal>
    ),
    [
      filterModalVisible,
      sortModalVisible,
      toggleModal,
      filterTranslateY,
      styles,
      applyFilters,
      applySort,
    ],
  );

  // Header component
  const ListHeaderComponent = useMemo(
    () => (
      <View style={{padding: scale(16), paddingBottom: scale(80)}}>
        {/* Search Section */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            leftIcon={SearchIcon_2}
            rightIcon={MicIcon}
            value={searchItem}
            onChangeText={handleSearchChange}
            inputStyle={styles.searchInput}
          />
        </View>

        {/* Actions Section */}
        <View style={[commonStyles.rowSpaceBetween, styles.sectionHeader]}>
          <Text style={styles.sectionTitle}>Tổng sản phẩm: {totalProduct}</Text>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[commonStyles.row, styles.actionButton]}
              onPress={() => toggleModal('sort', true)}>
              <Text style={styles.actionText}>
                {renderSortLabel(sort === 'Tất cả' ? 'Sắp xếp' : sort)}
              </Text>
              <SortIcon style={styles.actionIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[commonStyles.row, styles.actionButton]}
              onPress={
                filterReset ? resetFilter : () => toggleModal('filter', true)
              }>
              <Text style={styles.actionText}>
                {filterReset ? 'Đặt lại' : 'Lọc'}
              </Text>
              <FilterIcon style={styles.actionIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Product List */}
        <ProductList
          searchItem={searchItem}
          filters={filters}
          sort={sort}
          setTotalProduct={setTotalProduct}
        />
      </View>
    ),
    [
      searchItem,
      totalProduct,
      sort,
      filterReset,
      filters,
      styles,
      handleSearchChange,
      toggleModal,
      renderSortLabel,
      resetFilter,
    ],
  );

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <View style={{backgroundColor: theme.background, flex: 1}}>
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />

      {/* Filter Modal */}
      {renderModal(
        'filter',
        <FilterModal
          tempFilters={tempFilters}
          setTempFilters={setTempFilters}
          productTypes={productTypes}
          categoryMap={categoryMap}
          theme={theme}
          styles={styles}
          onTypeModalOpen={() => setModalVisible(true)}
          modalVisible={modalVisible}
          onTypeModalClose={() => setModalVisible(false)}
        />,
      )}

      {/* Sort Modal */}
      {renderModal(
        'sort',
        <SortModal
          visible={sortModalVisible}
          sortOptions={SORT_OPTIONS}
          selectedSort={tempSort}
          onSelect={setTempSort}
          onClose={() => toggleModal('sort', false)}
          styles={styles}
        />,
      )}
    </View>
  );
};

export default React.memo(ProductScreen);
