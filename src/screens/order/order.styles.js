import {StyleSheet} from 'react-native';
import {FontSizes, FontWeights} from '../../theme/theme';

const createStyles = theme =>
  StyleSheet.create({
    listContainer: {
      padding: 16,
      paddingBottom: 20,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 8,
      shadowOffset: {width: 0, height: 2},
      elevation: 5,
      borderWidth: 1,
      borderColor: theme.border || '#e0e0e0',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    orderId: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
    },
    status: {
      fontSize: 14,
      fontWeight: '600',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: theme.background,
    },
    divider: {
      height: 1,
      backgroundColor: theme.border || '#e0e0e0',
      marginVertical: 12,
    },
    orderBox: {
      gap: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 12,
      marginBottom: 0,
    },
    detailRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    detailName: {
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.medium,
    },
    detailText: {
      fontSize: 14,
      color: theme.text,
      marginLeft: 8,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyIcon: {
      marginBottom: 12,
    },
    emptyText: {
      fontSize: 16,
      color: theme.text,
      textAlign: 'center',
    },
  });

export default createStyles;
