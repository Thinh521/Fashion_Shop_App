import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {Appearance} from 'react-native';
import { storage } from '../utils/storage';
import { Colors } from '../theme/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = storage.getString('darkMode');
    if (stored === 'true') return true;
    if (stored === 'false') return false;
    return Appearance.getColorScheme() === 'dark';
  });

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      storage.set('darkMode', String(newValue));
      return newValue;
    });
  }, []);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      const stored = storage.getString('darkMode');
      if (stored === null) {
        setIsDarkMode(colorScheme === 'dark');
      }
    });
    return () => subscription.remove();
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{theme, isDarkMode, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export const lightTheme = {
  mode: 'light',
  background: '#FFFFFF',
  text: '#000000',
  primary: Colors.primary,
  secondary: '#4392F9',
  card: '#F5F5F5',
  border: '#E0E0E0',
  icon: '#333333',
  shadow: 'rgba(0, 0, 0, 0.1)',
  loadingBackground: 'rgba(255,255,255,0.9)',
};

export const darkTheme = {
  mode: 'dark',
  background: '#121212',
  text: '#FFFFFF',
  primary: Colors.primary,
  secondary: '#4392F9',
  card: '#1E1E1E',
  border: '#333333',
  icon: '#FFFFFF',
  shadow: 'rgba(255, 255, 255, 0.1)',
  loadingBackground: 'rgba(0,0,0,0.8)',
};
