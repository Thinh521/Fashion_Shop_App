import {StyleSheet} from 'react-native';
import {Spacing} from '../theme/theme';
import {scale} from '../utils/scaling';

const commonStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: scale(80),
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fullWidth: {
    width: '100%',
  },
  rounded: {
    borderRadius: 8,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  mb16: {
    marginBottom: Spacing.medium,
  },
  pt20: {
    paddingTop: Spacing.large,
  },
});

export default commonStyles;
