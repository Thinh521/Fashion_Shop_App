import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: scale(20),
    width: '100%',
  },

  header: {
    paddingTop: scale(50),
  },

  activeProgress: {
    color: Colors.black,
  },

  inactiveProgress: {
    color: '#A0A0A1',
  },

  progressText1: {
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.semiBold,
  },

  progressText2: {
    color: '#A0A0A1',
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.semiBold,
  },

  skipButton: {
    color: Colors.black,
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.semiBold,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '80%',
    height: 300,
    marginBottom: scale(10),
  },

  title: {
    fontSize: FontSizes.xxlarge,
    fontWeight: FontWeights.bold,
    marginBottom: scale(15),
    textAlign: 'center',
  },

  description: {
    fontSize: FontSizes.regular,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: scale(30),
    lineHeight: scale(24),
  },

  footer: {
    paddingBlockEnd: 40,
  },

  dotsContainer: {
    flexDirection: 'row',
  },

  activeDot: {
    width: 40,
    height: 8,
    borderRadius: 9999,
    backgroundColor: Colors.black,
    marginHorizontal: 5,
  },

  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 9999,
    backgroundColor: '#17223B33',
    marginHorizontal: 5,
  },

  prevButton: {
    paddingVertical: scale(12),
    borderRadius: 25,
  },

  prevButtonText: {
    color: '#C4C4C4',
    fontWeight: FontWeights.bold,
    fontSize: FontSizes.semiLarge,
  },

  nextButton: {
    paddingVertical: scale(12),
    borderRadius: 25,
  },

  nextButtonText: {
    color: Colors.primary,
    fontWeight: FontWeights.bold,
    fontSize: FontSizes.semiLarge,
  },
});
