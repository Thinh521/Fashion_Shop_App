import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CommonActions} from '@react-navigation/native';
import {FontSizes, FontWeights} from '../../theme/theme';

const CustomTabBar = ({state, descriptors, navigation, config = {}}) => {
  const insets = useSafeAreaInsets();
  const visible = useRef(new Animated.Value(1)).current;
  const iconScales = useRef(
    state.routes.map(() => new Animated.Value(1)),
  ).current;

  const [layoutHeight, setLayoutHeight] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [pointerEventsEnabled, setPointerEventsEnabled] = useState(true);

  const {
    activeColor = '#F83758',
    inactiveColor = '#000000',
    backgroundColor = '#FFFFFF',
    centerActiveColor = '#F83758',
    centerInactiveColor = '#FFFFFF',
    borderColor = '#E0E0E0',
    tabHeight = 76,
    centerButtonSize = 60,
    iconSize = 24,
    iconAnimationScale = 1.3,
    visibilityAnimationDuration = 300,
    shadowOpacity = 0.1,
    shadowRadius = 8,
    elevation = 5,
    tabBarPosition = 'bottom',
    hideOnKeyboard = true,
    onPress = () => {},
    onLongPress = () => {},
  } = config;

  const handleTabChange = newIndex => {
    const animations = state.routes.map((_, index) => {
      const toValue = index === newIndex ? iconAnimationScale : 1;
      return Animated.timing(iconScales[index], {
        toValue,
        duration: 150,
        useNativeDriver: true,
      });
    });

    Animated.parallel(animations).start();
  };

  // Hiệu ứng khi nhấn vào tab
  const handlePressIn = index => {
    Animated.timing(iconScales[index], {
      toValue: iconAnimationScale * 1.1,
      duration: 100, // Nhanh hơn khi nhấn
      useNativeDriver: true,
    }).start();
  };

  // Hiệu ứng khi thả ra
  const handlePressOut = (index, isFocused) => {
    Animated.timing(iconScales[index], {
      toValue: isFocused ? iconAnimationScale : 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    handleTabChange(state.index);
  }, [state.index]);

  useEffect(() => {
    const show =
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const hide =
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

    const showListener = Keyboard.addListener(show, () =>
      setKeyboardVisible(true),
    );
    const hideListener = Keyboard.addListener(hide, () =>
      setKeyboardVisible(false),
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  useEffect(() => {
    const toValue = hideOnKeyboard && isKeyboardVisible ? 0 : 1;

    Animated.timing(visible, {
      toValue,
      duration: visibilityAnimationDuration,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        setPointerEventsEnabled(toValue === 1);
      }
    });
  }, [isKeyboardVisible, hideOnKeyboard]);

  const handleLayout = e => {
    const {height} = e.nativeEvent.layout;
    if (height !== layoutHeight) {
      setLayoutHeight(height);
    }
  };

  const tabBarHeight =
    tabHeight + (tabBarPosition === 'top' ? insets.top : insets.bottom);

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: tabBarHeight,
      backgroundColor,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: borderColor,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: -2},
      shadowOpacity,
      shadowRadius,
      elevation,
      paddingBottom: insets.bottom,
      transform: [
        {
          translateY: visible.interpolate({
            inputRange: [0, 1],
            outputRange: [layoutHeight + insets.bottom, 0],
          }),
        },
      ],
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      flex: 1,
    },
    tabItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    tabLabel: {
      marginTop: 4,
      fontSize: FontSizes.small,
      fontWeight: FontWeights.medium,
      color: inactiveColor,
    },
    activeLabel: {
      color: activeColor,
    },
    centerButton: {
      position: 'absolute',
      top: -centerButtonSize / 1.4,
      alignSelf: 'center',
      width: centerButtonSize,
      height: centerButtonSize,
      borderRadius: centerButtonSize / 2,
      backgroundColor: centerInactiveColor,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 6,
    },
  });

  return (
    <Animated.View
      style={styles.container}
      onLayout={handleLayout}
      pointerEvents={pointerEventsEnabled ? 'auto' : 'none'}>
      <View style={styles.content} accessibilityRole="tablist">
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const descriptor = descriptors[route.key];
          const options = descriptor.options;
          const label = options.tabBarLabel ?? options.title ?? route.name;

          const Icon = options.tabBarCustomIcon || (() => null);
          const isCenter = index === Math.floor(state.routes.length / 2);

          const onPressTab = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.dispatch({
                ...CommonActions.navigate(route),
                target: state.key,
              });
            }

            onPress(index, route);
          };

          const onLongPressTab = () => {
            navigation.emit({type: 'tabLongPress', target: route.key});
            onLongPress(index, route);
          };

          const icon = (
            <Animated.View style={{transform: [{scale: iconScales[index]}]}}>
              <Icon
                focused={focused}
                color={
                  isCenter
                    ? focused
                      ? backgroundColor
                      : inactiveColor
                    : focused
                    ? activeColor
                    : inactiveColor
                }
                size={iconSize}
              />
            </Animated.View>
          );

          if (isCenter) {
            return (
              <View key={route.key} style={{flex: 1, alignItems: 'center'}}>
                <TouchableOpacity
                  style={[
                    styles.centerButton,
                    {
                      backgroundColor: focused
                        ? centerActiveColor
                        : centerInactiveColor,
                    },
                  ]}
                  onPress={onPressTab}
                  onPressIn={() => handlePressIn(index)}
                  onPressOut={() => handlePressOut(index, focused)}
                  onLongPress={onLongPressTab}
                  accessibilityRole="button"
                  accessibilityLabel={
                    options.tabBarAccessibilityLabel || `${label} tab`
                  }
                  activeOpacity={0.8}>
                  {icon}
                </TouchableOpacity>
              </View>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={onPressTab}
              onPressIn={() => handlePressIn(index)}
              onPressOut={() => handlePressOut(index, focused)}
              onLongPress={onLongPressTab}
              accessibilityRole="button"
              accessibilityLabel={
                options.tabBarAccessibilityLabel || `${label} tab`
              }
              activeOpacity={0.8}>
              {icon}
              {!!label && (
                <Text style={[styles.tabLabel, focused && styles.activeLabel]}>
                  {label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

export default CustomTabBar;
