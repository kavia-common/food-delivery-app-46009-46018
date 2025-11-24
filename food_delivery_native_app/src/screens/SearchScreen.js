import React, { useMemo, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { restaurants } from '../data/restaurants';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const RECENT = ['sushi', 'burger', 'indian'];

export default function SearchScreen({ navigation }) {
  const { colors } = useTheme();
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const f = q.trim().toLowerCase();
    if (!f) return restaurants;
    return restaurants.filter(r => r.name.toLowerCase().includes(f) || r.cuisine.toLowerCase().includes(f));
  }, [q]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: 16 }}>
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search restaurants or cuisines"
          placeholderTextColor={colors.muted}
          style={{ backgroundColor: colors.surface, color: colors.text, borderColor: colors.border, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12 }}
          accessibilityLabel="Search"
        />
        <FlatList
          data={RECENT}
          horizontal
          keyExtractor={(x) => x}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 8 }}
          renderItem={({ item }) => <Badge label={item} style={{ marginRight: 8 }} />}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(x) => x.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('RestaurantDetails', { id: item.id })}>
            <Card style={{ marginHorizontal: 16, marginBottom: 8 }}>
              <Text style={{ color: colors.text, fontWeight: '700' }}>{item.name}</Text>
              <Text style={{ color: colors.muted }}>{item.cuisine} • {item.eta}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
