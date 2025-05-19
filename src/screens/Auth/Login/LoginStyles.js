import {StyleSheet} from 'react-native';
import {
  BorderRadius,
  Colors,
  FontSizes,
  FontWeights,
} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';

export default StyleSheet.create({
  loginContainer: {
    flex: 1,
    padding: scale(20),
    justifyContent: 'center',
    backgroundColor: Colors.white,
    minHeight: '100%',
  },

  title: {
    fontSize: 36,
    marginBottom: scale(20),
    fontWeight: FontWeights.bold,
  },

  inputContainer: {
    marginBottom: scale(20),
  },

  errorText: {
    color: Colors.red,
    marginTop: 4,
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: scale(20),
  },

  forgotPasswordText: {
    color: Colors.primary,
    fontSize: FontSizes.small,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  loading: {
    width: scale(80),
    height: scale(80),
  },

  dividerText: {
    color: '#575757',
    fontSize: FontSizes.small,
    marginBottom: scale(20),
  },

  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: scale(20),
  },

  socialIcon: {
    marginHorizontal: 10,
    width: scale(56),
    height: scale(56),
    borderRadius: 9999,
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
    marginTop: scale(40),
    marginBottom: scale(20),
    alignItems: 'center',
  },
});
