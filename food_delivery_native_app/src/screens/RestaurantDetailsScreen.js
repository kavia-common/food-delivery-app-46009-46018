import React, { useMemo } from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { restaurants } from '../data/restaurants';
import { AppBar } from '../components/ui/AppBar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useCart } from '../store/CartContext';

export default function RestaurantDetailsScreen({ route, navigation }) {
  const { id } = route.params || {};
  const restaurant = restaurants.find(r => r.id === id) || restaurants[0];
  const { colors } = useTheme();
  const { add } = useCart();

  const sections = useMemo(() => {
    const map = {};
    restaurant.menu.forEach(m => {
      if (!map[m.section]) map[m.section] = [];
      map[m.section].push(m);
    });
    return Object.keys(map).map(k => ({ title: k, data: map[k] }));
  }, [restaurant]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <AppBar title={restaurant.name} onBack={() => navigation.goBack()} />
      <Card style={{ margin: 16 }}>
        <Text style={{ color: colors.muted, marginBottom: 4 }}>{restaurant.banner}</Text>
        <Text style={{ color: colors.muted }}>{restaurant.cuisine} • {restaurant.eta} • ${restaurant.fee.toFixed(2)} fee</Text>
      </Card>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ marginTop: 8, marginHorizontal: 16, marginBottom: 8, color: colors.text, fontSize: 18, fontWeight: '700' }}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <Card style={{ marginHorizontal: 16, marginBottom: 8 }}>
            <Text style={{ color: colors.text, fontWeight: '700', fontSize: 16 }}>{item.name}</Text>
            <Text style={{ color: colors.muted, marginVertical: 4 }}>{item.description}</Text>
            <View style={styles.row}>
              <Text style={{ color: colors.text, fontWeight: '700' }}>${item.price.toFixed(2)}</Text>
              <Button title="Add" onPress={() => add(restaurant, item)} />
            </View>
          </Card>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }
});
