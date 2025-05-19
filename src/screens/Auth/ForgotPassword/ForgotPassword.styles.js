import {StyleSheet} from 'react-native';
import {FontWeights, Spacing} from '../../../theme/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    marginBlockEnd: Spacing.s20,
    fontWeight: FontWeights.bold,
  },
});
