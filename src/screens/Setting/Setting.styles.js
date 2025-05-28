import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileHeaderWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      elevation: 4,
      shadowColor: theme.shadow,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 3,
      backgroundColor: theme.card,
    },
    profileHeader: {
      paddingHorizontal: scale(16),
      paddingVertical: scale(12),
    },
    headerText: {
      fontSize: FontSizes.regular,
      fontWeight: FontWeights.bold,
    },
    profileHeaderRight: {
      gap: scale(20),
    },
    profileShop: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(8),
    },
    scrollContent: {
      paddingTop: scale(64),
      paddingBottom: scale(20),
    },
    profileContainer: {
      backgroundColor: 'transparent',
    },
    profileInfo: {
      alignItems: 'center',
      marginBottom: scale(20),
    },
    avatarWrapper: {
      position: 'relative',
      marginBottom: scale(12),
    },
    avatarCircle: {
      width: scale(80),
      height: scale(80),
      borderRadius: scale(40),
      overflow: 'hidden',
      borderWidth: 1,
      elevation: 4,
      shadowColor: theme.shadow,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    avatar: {
      width: '100%',
      height: '100%',
    },
    editIconWrapper: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      borderWidth: 2,
      borderColor: theme.border,
      backgroundColor: theme.secondary,
      borderRadius: scale(20),
      padding: scale(6),
      elevation: 4,
      shadowColor: theme.shadow,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    profileName: {
      fontSize: FontSizes.large,
      fontWeight: FontWeights.bold,
    },
    primaryButton: {
      marginTop: scale(20),
      borderRadius: 8,
    },
    box: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 12,
      borderRadius: 10,
      borderWidth: 1,
      elevation: 2,
      shadowColor: theme.shadow,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    badge: {
      position: 'absolute',
      right: scale(-8),
      top: scale(-6),
      backgroundColor: '#FF3D00',
      borderRadius: 12,
      minWidth: scale(18),
      paddingHorizontal: scale(4),
      paddingVertical: scale(2),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#fff',
    },
    badgeText: {
      textAlign: 'center',
      color: Colors.white,
      fontSize: FontSizes.xsmall - 2,
      fontWeight: FontWeights.bold,
    },
    label: {
      textAlign: 'center',
      marginTop: scale(6),
      fontSize: FontSizes.xsmall,
      fontWeight: FontWeights.regular,
    },
    profileTitle: {
      fontSize: 18,
      fontWeight: '600',
    },
    supportItemsContainer: {
      borderRadius: scale(12),
      borderWidth: 1,
      elevation: 2,
      shadowColor: theme.shadow,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    supportItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: scale(16),
      paddingHorizontal: scale(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    lastItem: {
      borderBottomWidth: 0,
    },
    itemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    iconContainer: {
      width: scale(32),
      height: scale(32),
      borderRadius: scale(16),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: scale(8),
    },
    itemText: {
      fontSize: scale(15),
      fontWeight: '400',
    },
    rightIcon: {
      width: scale(16),
      height: scale(16),
      color: theme.icon,
    },
    icon: {
      color: theme.icon,
    },
  });

export default createStyles;
