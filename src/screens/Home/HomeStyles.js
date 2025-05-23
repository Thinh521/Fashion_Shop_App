import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

const createStyles = theme =>
  StyleSheet.create({
    homeContainer: {
      padding: scale(16),
    },

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
      gap: scale(12),
      flexDirection: 'row',
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
  });

export default createStyles;
