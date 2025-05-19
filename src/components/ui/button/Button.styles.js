import {StyleSheet} from 'react-native';
import {Colors} from '../../../theme/theme';

export default StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },

  textButtonContainer: {
    backgroundColor: 'transparent',
    elevation: 0,
  },

  textButton: {
    color: Colors.primary,
  },

  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },

  disabledButton: {
    backgroundColor: '#E0E0E0',
  },

  disabledText: {
    color: '#9E9E9E',
  },
});
