import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { categories, restaurants } from '../data/restaurants';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();

  const Promo = () => (
    <Card style={[styles.promo, { backgroundColor: colors.surface }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.promoTitle, { color: colors.text }]}>Free Delivery on orders over $20</Text>
        <Text style={{ color: colors.muted, marginTop: 4 }}>Use code OCEAN20 at checkout</Text>
      </View>
      <Ionicons name="bicycle" size={36} color={colors.primary} />
    </Card>
  );

  const renderRestaurant = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('RestaurantDetails', { id: item.id })} accessibilityRole="button">
      <Card style={styles.restaurantCard} padded={false}>
        <View style={{ height: 130, backgroundColor: colors.background, borderTopLeftRadius: 16, borderTopRightRadius: 16, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="image" size={40} color={colors.muted} />
        </View>
        <View style={{ padding: 12 }}>
          <View style={styles.row}>
            <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
            <View style={styles.row}>
              <Ionicons name="star" color={colors.secondary} size={16} />
              <Text style={{ marginLeft: 4, color: colors.text, fontWeight: '600' }}>{item.rating}</Text>
            </View>
          </View>
          <Text style={{ color: colors.muted, marginTop: 2 }}>{item.cuisine} • {item.eta} • ${item.fee.toFixed(2)} fee</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <FlatList
      ListHeaderComponent={
        <View style={{ paddingHorizontal: 16 }}>
          <Promo />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 8 }}>
            {categories.map((c) => (
              <Badge key={c} label={c} style={{ marginRight: 8 }} />
            ))}
          </ScrollView>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 8 }}>Featured</Text>
        </View>
      }
      data={restaurants}
      keyExtractor={(item) => item.id}
      renderItem={renderRestaurant}
      contentContainerStyle={{ paddingBottom: 24 }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      style={{ backgroundColor: colors.background }}
    />
  );
}

const styles = StyleSheet.create({
  promo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginVertical: 12
  },
  restaurantCard: {
    marginHorizontal: 16
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { fontSize: 16, fontWeight: '700' }
});
