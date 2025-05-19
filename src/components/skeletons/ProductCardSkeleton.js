import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ProductCardSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.grid}>
        {[...Array(4)].map((_, index) => (
          <View key={index} style={styles.card} />
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 280,
    borderRadius: 8,
    marginBottom: 12,
  },
});

export default ProductCardSkeleton;
