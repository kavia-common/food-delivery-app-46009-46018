import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

// PUBLIC_INTERFACE
export const AppBar = ({ title, onBack, right, style }) => {
  /** Simple top app bar with back button and optional right content. */
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderBottomColor: colors.border }, style]}>
      <View style={styles.left}>
        {onBack ? (
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go back" onPress={onBack} style={styles.iconBtn}>
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>
        ) : null}
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>{title}</Text>
      </View>
      <View style={styles.right}>{right}</View>
    </View>
  );
};

// PUBLIC_INTERFACE
export const IconButton = ({ name = 'ellipse', size = 22, color, onPress, accessibilityLabel }) => {
  /** Minimal icon button */
  const { colors } = useTheme();
  return (
    <TouchableOpacity accessibilityRole="button" accessibilityLabel={accessibilityLabel} onPress={onPress} style={styles.iconBtn}>
      <Ionicons name={name} size={size} color={color || colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 4,
    flex: 1
  },
  right: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: {
    padding: 8,
    borderRadius: 999
  }
});
