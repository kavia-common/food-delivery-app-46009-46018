import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Card } from '../components/ui/Card';

const mockOrders = [
  { id: 'o1', restaurant: 'Blue Ocean Sushi', total: 24.98, status: 'Delivered', date: '2024-11-01' },
  { id: 'o2', restaurant: 'Amber Flame Grill', total: 16.48, status: 'Delivered', date: '2024-10-15' }
];

export default function OrdersScreen() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        ListHeaderComponent={<Text style={{ fontSize: 20, fontWeight: '700', color: colors.text, margin: 16 }}>Orders</Text>}
        data={mockOrders}
        keyExtractor={(x) => x.id}
        renderItem={({ item }) => (
          <Card style={{ marginHorizontal: 16, marginBottom: 8 }}>
            <Text style={{ color: colors.text, fontWeight: '700' }}>{item.restaurant}</Text>
            <Text style={{ color: colors.muted, marginVertical: 4 }}>{item.date} • {item.status}</Text>
            <Text style={{ color: colors.text, fontWeight: '700' }}>${item.total.toFixed(2)}</Text>
          </Card>
        )}
      />
      <Text style={{ color: colors.muted, textAlign: 'center', marginBottom: 16 }}>Live order tracking coming soon</Text>
    </View>
  );
}
