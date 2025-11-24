import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './theme/ThemeProvider';
import RootNavigation from './navigation';
import { CartProvider } from './store/CartContext';

// PUBLIC_INTERFACE
export default function App() {
  /** Application root wiring theme, navigation, and cart store. */
  return (
    <ThemeProvider>
      <CartProvider>
        <RootNavigation />
        <StatusBar style="auto" />
      </CartProvider>
    </ThemeProvider>
  );
}
