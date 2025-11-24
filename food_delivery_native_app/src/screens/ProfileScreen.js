import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Card } from '../components/ui/Card';

export default function ProfileScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text, margin: 16 }}>Profile</Text>
      <Card style={{ marginHorizontal: 16, marginBottom: 8 }}>
        <Text style={{ color: colors.text, fontWeight: '700' }}>John Doe</Text>
        <Text style={{ color: colors.muted }}>johndoe@example.com</Text>
      </Card>
      <Card style={{ marginHorizontal: 16, marginBottom: 8 }}>
        <Text style={{ color: colors.text, fontWeight: '700', marginBottom: 8 }}>Settings</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6 }}>
          <Text style={{ color: colors.text }}>Dark mode</Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>
        <View style={{ height: 8 }} />
        <Text style={{ color: colors.muted }}>Address management coming soon…</Text>
      </Card>
    </View>
  );
}
