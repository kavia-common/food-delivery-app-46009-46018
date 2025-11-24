import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { AppBar } from '../components/ui/AppBar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useCart } from '../store/CartContext';

export default function CartScreen({ navigation }) {
  const { colors } = useTheme();
  const { items, increment, decrement, remove, totals, clear } = useCart();
  const data = Object.values(items);

  const Row = ({ id, item, qty }) => (
    <Card style={{ marginHorizontal: 16, marginBottom: 8 }}>
      <Text style={{ fontWeight: '700', fontSize: 16, color: colors.text }}>{item.name}</Text>
      <Text style={{ color: colors.muted }}>${item.price.toFixed(2)} • Qty: {qty}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
        <Button title="-" variant="outline" onPress={() => decrement(id)} style={{ marginRight: 8 }} />
        <Button title="+" onPress={() => increment(id)} style={{ marginRight: 8 }} />
        <Button title="Remove" variant="ghost" onPress={() => remove(id)} />
      </View>
    </Card>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <AppBar title="Your Cart" onBack={() => navigation.goBack()} />
      <FlatList
        data={data}
        keyExtractor={(x) => x.item.id}
        renderItem={({ item: x }) => <Row id={x.item.id} item={x.item} qty={x.qty} />}
        ListEmptyComponent={
          <Text style={{ color: colors.muted, textAlign: 'center', marginTop: 48 }}>Your cart is empty</Text>
        }
        ListFooterComponent={
          <View>
            <Card style={{ marginHorizontal: 16, marginTop: 8 }}>
              <View style={styles.row}><Text style={{ color: colors.muted }}>Subtotal</Text><Text style={{ color: colors.text }}>${totals.subtotal.toFixed(2)}</Text></View>
              <View style={styles.row}><Text style={{ color: colors.muted }}>Delivery</Text><Text style={{ color: colors.text }}>${totals.delivery.toFixed(2)}</Text></View>
              <View style={styles.row}><Text style={{ color: colors.muted }}>Tax</Text><Text style={{ color: colors.text }}>${totals.tax.toFixed(2)}</Text></View>
              <View style={[styles.row, { marginTop: 8 }]}><Text style={{ color: colors.text, fontWeight: '700' }}>Total</Text><Text style={{ color: colors.text, fontWeight: '700' }}>${totals.total.toFixed(2)}</Text></View>
            </Card>
            <View style={{ padding: 16 }}>
              <Button title="Checkout" onPress={() => { clear(); alert('Order placed (mock)!'); }} />
            </View>
          </View>
        }
      />
    </View>
  );
}

const styles = {
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 }
};
