import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

// PUBLIC_INTERFACE
export const Card = ({ children, style, padded = true }) => {
  /** Themed card surface with rounded corners and subtle shadow. */
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface, shadowColor: colors.shadow, borderColor: colors.border }, padded && styles.padded, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  padded: {
    padding: 12
  }
});
