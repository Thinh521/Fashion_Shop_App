import {StyleSheet} from 'react-native';

const createStyles = theme =>
  StyleSheet.create({
    label: {
      fontSize: 14,
      color: theme.text,
      marginBottom: 8,
    },

    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      backgroundColor: theme.background,
    },

    readonlyField: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      paddingHorizontal: 12,
      backgroundColor: theme.background,
      justifyContent: 'flex-start',
    },

    readonlyText: {
      fontSize: 16,
      color: theme.text,
    },

    input: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
      paddingVertical: 0,
      height: '100%',
    },

    disabledContainer: {
      backgroundColor: theme.background,
    },

    leftIcon: {
      marginRight: 8,
    },

    rightContent: {
      marginLeft: 8,
    },

    eyeIcon: {
      width: 24,
      height: 24,
    },

    rightIcon: {
      width: 24,
      height: 24,
    },
  });

export default createStyles;
