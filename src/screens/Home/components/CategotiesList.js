import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import commonStyles from '../../../styles/commonStyles';
import FastImage from 'react-native-fast-image';
import Images from '../../../assets/images/Images';
import {FontSizes, FontWeights} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';
import {useTheme} from '../../../contexts/ThemeContext';

const stories = [
  {
    id: 1,
    image: Images.common.story_1,
    title: 'Beauty',
  },
  {
    id: 2,
    image: Images.common.story_2,
    title: 'Fashion',
  },
  {
    id: 3,
    image: Images.common.story_3,
    title: 'Kids',
  },
  {
    id: 4,
    image: Images.common.story_4,
    title: 'Mens',
  },
  {
    id: 5,
    image: Images.common.story_5,
    title: 'Womens',
  },
  {
    id: 6,
    image: Images.common.story_1,
    title: 'Womens',
  },
  {
    id: 7,
    image: Images.common.story_2,
    title: 'Womens',
  },
];

const CategotiesList = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <View>
      <View style={styles.categoriesWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={stories}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.categoriesContainer}
          renderItem={({item, index}) => {
            const isLastItem = index === stories.length - 1;
            return (
              <TouchableOpacity
                style={[
                  styles.categoryItem,
                  {marginRight: isLastItem ? 0 : 16},
                ]}
                activeOpacity={0.7}>
                <View
                  style={[commonStyles.center, styles.categoryImageContainer]}>
                  <FastImage
                    source={item.image}
                    style={styles.categoryImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.categoryText}>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default CategotiesList;

const createStyles = theme =>
  StyleSheet.create({
    categoriesWrapper: {
      marginBlockEnd: scale(20),
    },

    categoriesContainer: {
      paddingVertical: scale(8),
    },

    categoryItem: {
      marginRight: scale(16),
      alignItems: 'center',
    },

    categoryImageContainer: {
      width: scale(63),
      height: scale(63),
      borderRadius: 9999,
      marginBottom: 8,
    },

    categoryImage: {
      width: scale(63),
      height: scale(63),
    },

    categoryText: {
      color: theme.text,
      textAlign: 'center',
      fontSize: FontSizes.small,
      fontWeight: FontWeights.regular,
    },
  });
