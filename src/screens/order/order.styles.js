import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights, Shadows} from '../../theme/theme';
import {scale} from '../../utils/scaling';

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
      borderWidth: 1,
      borderColor: theme.border || '#e0e0e0',
      ...Shadows.medium,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    orderId: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
    },
    status: {
      fontSize: 14,
      fontWeight: '600',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.background,
    },
    divider: {
      height: 1,
      backgroundColor: theme.border,
      marginVertical: 6,
    },
    orderBox: {
      gap: 12,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: scale(10),
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
      marginLeft: 8,
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
    deleteButton: {
      width: 80,
      height: '93.5%',
      backgroundColor: Colors.red,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    deleteText: {
      color: Colors.white,
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.semiBold,
    },
    cardFooter: {
      gap: scale(10),
      flexDirection: 'row',
    },
    buttonFooter: {
      flex: 1,
      height: 40,
      borderRadius: 10,
    },
    buttonFooterLine: {
      borderWidth: 1,
      backgroundColor: 'transparent',
      borderColor: Colors.primary,
    },
    buttonText: {
      fontSize: FontSizes.small,
    },
    orderTab: {
      paddingVertical: 8,
      paddingHorizontal: 4,
      marginHorizontal: 8,
      borderBottomColor: Colors.primary,
      marginRight: 12,
    },
  });

export default createStyles;
