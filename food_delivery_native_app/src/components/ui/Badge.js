import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

// PUBLIC_INTERFACE
export const Badge = ({ label, color = 'primary', style }) => {
  /** Small rounded tag for categories and statuses. */
  const { colors } = useTheme();
  const map = {
    primary: { bg: colors.primary + '20', text: colors.primary },
    secondary: { bg: colors.secondary + '20', text: colors.secondary },
    success: { bg: colors.success + '20', text: colors.success },
    error: { bg: colors.error + '20', text: colors.error }
  };
  const c = map[color] || map.primary;
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }, style]}>
      <Text style={[styles.text, { color: c.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: 'flex-start'
  },
  text: {
    fontSize: 12,
    fontWeight: '600'
  }
});
