import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

const createStyles = theme =>
  StyleSheet.create({
    searchContainer: {
      marginBottom: scale(20),
    },
    searchInput: {
      height: scale(48),
      borderRadius: 10,
    },
    sectionHeader: {
      marginBottom: scale(20),
    },
    sectionTitle: {
      color: theme.text,
      fontWeight: FontWeights.bold,
      fontSize: FontSizes.semiLarge,
    },
    actionsContainer: {
      flexDirection: 'row',
      gap: scale(12),
    },
    actionButton: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme.border,
      paddingVertical: scale(6),
      paddingHorizontal: scale(10),
      backgroundColor: theme.card,
      borderRadius: 6,
    },
    actionIcon: {
      width: scale(16),
      height: scale(16),
      marginLeft: scale(4),
      color: theme.icon,
    },
    actionText: {
      color: theme.text,
      fontSize: FontSizes.small,
      fontWeight: FontWeights.medium,
    },
    filterModalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    filterModalOverlay: {
      flex: 1,
    },
    filterContainer: {
      backgroundColor: theme.background,
      padding: scale(15),
      paddingTop: scale(30),
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: '50%',
    },
    filterSection: {
      marginBottom: scale(15),
    },
    title: {
      color: theme.text,
      fontSize: FontSizes.semiLarge,
      fontWeight: 'bold',
      marginBottom: scale(10),
    },
    label: {
      color: theme.text,
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.medium,
      marginBottom: scale(10),
    },
    typeButton: {
      height: 50,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 5,
      justifyContent: 'center',
      paddingHorizontal: 16,
      backgroundColor: theme.card,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      width: '80%',
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.card,
      borderRadius: 10,
      maxHeight: '60%',
    },
    modalItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    modalItemText: {
      color: theme.text,
      fontSize: FontSizes.medium,
    },
    selectedSortItem: {
      backgroundColor: Colors.primaryLight,
    },
    selectedSortText: {
      color: Colors.primary,
      fontWeight: FontWeights.bold,
    },
    priceInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    priceInput: {
      flex: 1,
      height: 50,
      borderColor: theme.border,
      borderWidth: 1,
      paddingHorizontal: 16,
      backgroundColor: theme.card,
      borderRadius: 5,
    },
    priceSeparator: {
      marginHorizontal: 10,
      fontSize: 16,
    },
    buttonContainer: {
      gap: scale(15),
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: scale(10),
    },
    buttonfilter: {
      flex: 1,
      paddingVertical: scale(10),
      borderRadius: 5,
      alignItems: 'center',
    },
    closeButton: {
      backgroundColor: Colors.gray,
    },
    buttonText: {
      color: Colors.white,
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.bold,
    },
    noResultText: {
      textAlign: 'center',
      fontSize: FontSizes.medium,
      color: Colors.gray,
      padding: scale(20),
    },
  });

export default createStyles;
