import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../../contexts/ThemeContext';
import {useCategories} from '../../../hooks/useCategories';
import {useNavigation} from '@react-navigation/core';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const CategoriesList = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();
  const {data: categories = [], isLoading, isError, error} = useCategories();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <SkeletonPlaceholder borderRadius={4}>
          <View style={styles.skeletonContainer}>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <View key={index} style={styles.skeletonItem} />
              ))}
          </View>
        </SkeletonPlaceholder>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Lỗi: {error?.message || 'Không thể tải dữ liệu'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={item => item.slug}
        contentContainerStyle={styles.categoriesContainer}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        renderItem={({item, index}) => {
          const isFirstItem = index === 0;
          const isLastItem = index === categories.length - 1;

          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MainTabNavigator', {
                  screen: 'Product',
                  params: {categorySlug: item.slug, categoryName: item.name},
                });
              }}
              style={[
                styles.categoryItem,
                isFirstItem && {marginLeft: 0},
                isLastItem && {marginRight: 0},
              ]}
              activeOpacity={0.7}>
              <View style={styles.categoryContent}>
                <Text style={styles.categoryText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      marginBottom: 20,
      height: 60,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      color: theme.error || '#ff3b30',
      fontSize: 16,
      textAlign: 'center',
    },
    categoriesContainer: {
      paddingVertical: 8,
      paddingHorizontal: 2,
    },
    categoryItem: {
      marginRight: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.card,
    },
    categoryContent: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      minWidth: 100,
    },
    categoryText: {
      color: theme.text || '#333333',
      fontSize: 14,
      fontWeight: '600',
      textAlign: 'center',
      textTransform: 'capitalize',
    },
    skeletonContainer: {
      flexDirection: 'row',
      paddingVertical: 8,
    },
    skeletonItem: {
      width: 100,
      height: 40,
      borderRadius: 12,
      marginRight: 16,
    },
  });

export default React.memo(CategoriesList);
