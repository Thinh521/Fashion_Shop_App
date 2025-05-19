import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

export default StyleSheet.create({
  profileContainer: {
    paddingBlockStart: 16,
  },

  profileHeader: {
    marginBottom: scale(20),
  },

  avatarWrapper: {
    alignItems: 'center',
    marginBottom: scale(10),
    position: 'relative',
  },

  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 9999,
    backgroundColor: Colors.lightGray,
    overflow: 'hidden',
  },

  avatar: {
    width: '100%',
    height: '100%',
  },

  editIconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#4392F9',
    width: 32,
    height: 32,
    borderWidth: 3,
    borderColor: Colors.white,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileName: {
    textAlign: 'center',
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
  },

  sectionTitle: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    marginBottom: 15,
  },

  divider: {
    height: 1,
    backgroundColor: '#C4C4C4',
    marginBlock: 20,
  },

  inputContainer: {
    borderWidth: 1,
    borderColor: '#C8C8C8',
    marginBottom: 15,
  },

  changePassword: {
    alignSelf: 'flex-end',
  },

  changePasswordText: {
    color: Colors.primary,
    fontSize: FontSizes.medium,
  },

  primaryButton: {
    width: '100%',
    backgroundColor: Colors.primary,
    marginBottom: 10,
  },

  authContainer: {
    paddingBlockStart: 16,
  },
});
