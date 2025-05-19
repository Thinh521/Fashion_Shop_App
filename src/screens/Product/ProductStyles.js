import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

export default StyleSheet.create({
  searchContainer: {
    marginBlock: scale(20),
  },

  searchInput: {
    height: scale(48),
    borderRadius: 10,
    backgroundColor: Colors.background,
  },

  sectionHeader: {
    marginBottom: scale(20),
  },

  sectionTitle: {
    fontWeight: FontWeights.bold,
    fontSize: FontSizes.semiLarge,
  },

  actionsContainer: {
    gap: scale(12),
    flexDirection: 'row',
  },

  actionButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: scale(6),
    paddingHorizontal: scale(10),
    backgroundColor: Colors.white,
    borderRadius: 6,
  },

  actionIcon: {
    width: scale(16),
    height: scale(16),
    marginLeft: scale(4),
  },

  actionText: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.medium,
  },
});
