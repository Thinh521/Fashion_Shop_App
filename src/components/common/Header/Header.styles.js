import {StyleSheet} from 'react-native';

const createStyles = theme =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      height: 60,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },

    menuButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.border,
      alignItems: 'center',
      justifyContent: 'center',
    },

    logoContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    logo: {
      width: 112,
      height: 32,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 999,
    },
  });

export default createStyles;
