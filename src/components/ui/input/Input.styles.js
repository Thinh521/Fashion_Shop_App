import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },

  readonlyField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-start',
  },

  readonlyText: {
    fontSize: 16,
    color: '#000',
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 0,
    height: '100%',
  },

  disabledContainer: {
    backgroundColor: '#f5f5f5',
  },

  leftIcon: {
    marginRight: 8,
  },

  rightContent: {
    marginLeft: 8,
  },

  eyeIcon: {
    width: 24,
    height: 24,
  },

  rightIcon: {
    width: 24,
    height: 24,
  },
});
