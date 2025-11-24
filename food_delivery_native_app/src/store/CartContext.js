import React, { createContext, useContext, useMemo, useState } from 'react';

// PUBLIC_INTERFACE
export const useCart = () => {
  /** Access the cart state and operations. */
  return useContext(CartContext);
};

const CartContext = createContext({
  items: {},
  add: () => {},
  remove: () => {},
  increment: () => {},
  decrement: () => {},
  clear: () => {},
  totals: { items: 0, subtotal: 0, delivery: 0, tax: 0, total: 0 },
  restaurantId: null
});

const DELIVERY_FEE = 2.99;
const TAX_RATE = 0.08;

// PUBLIC_INTERFACE
export const CartProvider = ({ children }) => {
  /** Minimal cart provider with single-restaurant constraint. */
  const [items, setItems] = useState({});
  const [restaurantId, setRestaurantId] = useState(null);

  const add = (restaurant, item) => {
    setItems(prev => {
      if (restaurantId && restaurantId !== restaurant.id) {
        // Reset if switching restaurants
        return { [item.id]: { item, qty: 1 } };
      }
      setRestaurantId(restaurant.id);
      const cur = prev[item.id]?.qty || 0;
      return { ...prev, [item.id]: { item, qty: cur + 1 } };
    });
  };

  const remove = (id) => {
    setItems(prev => {
      const n = { ...prev };
      delete n[id];
      return n;
    });
  };

  const increment = (id) => setItems(prev => ({ ...prev, [id]: { ...prev[id], qty: prev[id].qty + 1 } }));
  const decrement = (id) => setItems(prev => {
    const itm = prev[id];
    if (!itm) return prev;
    const qty = itm.qty - 1;
    const n = { ...prev };
    if (qty <= 0) delete n[id];
    else n[id] = { ...itm, qty };
    return n;
  });
  const clear = () => { setItems({}); setRestaurantId(null); };

  const totals = useMemo(() => {
    const entries = Object.values(items);
    const subtotal = entries.reduce((sum, x) => sum + x.item.price * x.qty, 0);
    const delivery = entries.length > 0 ? DELIVERY_FEE : 0;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + delivery + tax;
    const count = entries.reduce((sum, x) => sum + x.qty, 0);
    return { items: count, subtotal, delivery, tax, total };
  }, [items]);

  const value = useMemo(() => ({ items, add, remove, increment, decrement, clear, totals, restaurantId }), [items, totals, restaurantId]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
