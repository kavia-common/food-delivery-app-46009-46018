import React, { createContext, useMemo, useState, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { Colors as Base } from './colors';

// PUBLIC_INTERFACE
export const useTheme = () => {
  /** Hook to access themed colors and sizes. */
  return useContext(ThemeContext);
};

const ThemeContext = createContext({
  colors: Base,
  isDark: false,
  toggleTheme: () => {}
});

const darkColors = {
  ...Base,
  background: '#0f172a',
  surface: '#111827',
  text: '#f9fafb',
  muted: '#94a3b8',
  border: '#1f2937',
  shadow: 'rgba(0,0,0,0.4)'
};

// PUBLIC_INTERFACE
export const ThemeProvider = ({ children }) => {
  /** Theme provider that switches with device appearance and allows manual toggle. */
  const scheme = useColorScheme?.() || 'light';
  const [manualDark, setManualDark] = useState(null);
  const isDark = (manualDark === null ? scheme === 'dark' : manualDark);

  const colors = useMemo(() => (isDark ? darkColors : Base), [isDark]);

  const value = useMemo(() => ({
    colors,
    isDark,
    toggleTheme: () => setManualDark(v => (v === null ? !isDark : !v))
  }), [colors, isDark]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
