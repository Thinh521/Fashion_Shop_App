// context/ThemeContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {Appearance} from 'react-native';
import {storage} from '../utils/storage';
import {Colors} from '../theme/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const stored = storage.getString('darkMode');
      if (stored === 'true') return true;
      if (stored === 'false') return false;
    } catch (err) {
      console.warn('Error loading darkMode from storage', err);
    }
    return Appearance.getColorScheme() === 'dark';
  });

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      try {
        storage.set('darkMode', String(newValue));
      } catch (err) {
        console.warn('Error saving darkMode:', err);
      }
      return newValue;
    });
  }, []);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      try {
        const stored = storage.getString('darkMode');
        if (stored == null) {
          setIsDarkMode(colorScheme === 'dark');
        }
      } catch (err) {
        console.warn('Error checking darkMode in listener', err);
      }
    });
    return () => subscription.remove();
  }, []);

  const theme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode],
  );

  const value = useMemo(
    () => ({theme, isDarkMode, toggleTheme}),
    [theme, isDarkMode, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

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
