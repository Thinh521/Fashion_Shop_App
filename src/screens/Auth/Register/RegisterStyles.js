import {StyleSheet} from 'react-native';
import {
  BorderRadius,
  Colors,
  FontSizes,
  FontWeights,
  Spacing,
} from '../../../theme/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 36,
    marginBlockEnd: Spacing.s20,
    fontWeight: FontWeights.bold,
  },

  inputContainer: {
    marginBlockEnd: Spacing.s20,
  },

  forgotPassword: {
    marginBlockEnd: 20,
  },

  forgotPasswordText: {
    color: '#676767',
    fontSize: FontSizes.small,
    marginBlockStart: Spacing.s10,
  },

  loginButton: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  dividerText: {
    color: '#575757',
    marginBottom: 20,
    fontSize: 12,
  },

  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },

  socialIcon: {
    marginHorizontal: 10,
    width: 56,
    height: 56,
    borderRadius: BorderRadius.rFull,
    borderWidth: 1,
    borderColor: '#F83758',
    backgroundColor: '#FCF3F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  socialIconImage: {
    width: 25,
    height: 25,
  },

  signUpButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },

  signUpText: {
    color: '#575757',
    fontSize: FontSizes.medium,
  },

  signUpTextLink: {
    color: Colors.primary,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
    textDecorationLine: 'underline',
  },

  box: {
    alignItems: 'center',
    marginBlockStart: 40,
  },

  errorText: {
    color: Colors.red,
  },
});
