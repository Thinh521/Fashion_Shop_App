import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import styles from './Onboarding.styles';
import SplashScreen from '../Splash/SplashScreen';
import Images from '../../assets/images/Images';
import commonStyles from '../../styles/commonStyles';
import {MMKV} from 'react-native-mmkv';

const {width: screenWidth} = Dimensions.get('window');
const storage = new MMKV();

const slides = [
  {
    progress: '1',
    image: Images.common.splash_1,
    title: 'Choose Products',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
  },
  {
    progress: '2',
    image: Images.common.splash_2,
    title: 'Make Payment',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
  },
  {
    progress: '3',
    image: Images.common.splash_3,
    title: 'Get Your Order',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
  },
];

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const checkOnboarding = () => {
      const completed = storage.getBoolean('hasCompletedOnboarding');
      if (completed) {
        setHasCompletedOnboarding(true);
        navigation.replace('MainTabNavigator', {screen: 'Home'});
      } else {
        const timer = setTimeout(() => setShowSplash(false), 2000);
        return () => clearTimeout(timer);
      }
    };

    checkOnboarding();
  }, [navigation]);

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setCurrentIndex(index);
  };

  const goToSlide = index => {
    flatListRef.current?.scrollToIndex({index, animated: true});
  };

  const completeOnboarding = () => {
    storage.set('hasCompletedOnboarding', true);
    navigation.replace('MainTabNavigator', {screen: 'Home'});
  };

  if (hasCompletedOnboarding) return null;
  if (showSplash) return <SplashScreen />;

  return (
    <View style={{flex: 1}}>
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({item, index}) => (
          <View style={{width: screenWidth}}>
            <View style={styles.container}>
              {/* Header */}
              <View style={[commonStyles.rowSpaceBetween, styles.header]}>
                <View style={[commonStyles.row]}>
                  <View style={styles.activeProgress}>
                    <Text style={styles.progressText1}>{item.progress}</Text>
                  </View>
                  <View style={styles.inactiveProgress}>
                    <Text style={styles.progressText2}>/3</Text>
                  </View>
                </View>

                <TouchableOpacity onPress={completeOnboarding}>
                  <Text style={styles.skipButton}>Skip</Text>
                </TouchableOpacity>
              </View>

              {/* Content */}
              <View style={styles.content}>
                <FastImage
                  source={item.image}
                  style={styles.image}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>

              {/* Footer */}
              <View style={[commonStyles.rowSpaceBetween, styles.footer]}>
                <TouchableOpacity
                  style={[styles.prevButton, index === 0 && {opacity: 0}]}
                  onPress={() => goToSlide(index - 1)}>
                  <Text style={styles.prevButtonText}>Prev</Text>
                </TouchableOpacity>

                <View style={styles.dotsContainer}>
                  {slides.map((_, dotIndex) => (
                    <View
                      key={dotIndex}
                      style={
                        currentIndex === dotIndex
                          ? styles.activeDot
                          : styles.inactiveDot
                      }
                    />
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={
                    index === slides.length - 1
                      ? completeOnboarding
                      : () => goToSlide(index + 1)
                  }>
                  <Text style={styles.nextButtonText}>
                    {index === slides.length - 1 ? 'Get Started' : 'Next'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Onboarding;
