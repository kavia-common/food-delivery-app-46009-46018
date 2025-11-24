import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

// PUBLIC_INTERFACE
export const Button = ({ title, onPress, variant = 'primary', loading = false, disabled = false, style, icon }) => {
  /** Themed button supporting primary, outline, and ghost variants. */
  const { colors } = useTheme();
  const variants = {
    primary: {
      container: { backgroundColor: colors.primary },
      text: { color: '#fff' }
    },
    outline: {
      container: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary },
      text: { color: colors.primary }
    },
    ghost: {
      container: { backgroundColor: 'transparent' },
      text: { color: colors.text }
    }
  };
  const v = variants[variant] || variants.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled || loading}
      style={[styles.container, { backgroundColor: colors.surface, shadowColor: colors.shadow }, v.container, style]}
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator color={v.text.color || colors.text} />
      ) : (
        <View style={styles.content}>
          {icon ? <View style={{ marginRight: 8 }}>{icon}</View> : null}
          <Text style={[styles.text, { color: colors.text }, v.text]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    minHeight: 44
  },
  text: {
    fontSize: 16,
    fontWeight: '600'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
