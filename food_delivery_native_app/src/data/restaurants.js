export const categories = [
  'Pizza', 'Burgers', 'Sushi', 'Indian', 'Mexican', 'Chinese', 'Healthy', 'Desserts'
];

export const restaurants = [
  {
    id: 'r1',
    name: 'Blue Ocean Sushi',
    rating: 4.7,
    cuisine: 'Sushi',
    eta: '25-35 min',
    fee: 2.99,
    image: null,
    banner: 'Fresh seafood, crafted rolls, and bowls',
    menu: [
      { id: 'm1', section: 'Popular', name: 'Dragon Roll', price: 12.99, description: 'Tempura shrimp, avocado, eel sauce' },
      { id: 'm2', section: 'Popular', name: 'California Roll', price: 8.99, description: 'Crab, avocado, cucumber' },
      { id: 'm3', section: 'Bowls', name: 'Salmon Poke Bowl', price: 13.99, description: 'Marinated salmon with rice and veggies' }
    ]
  },
  {
    id: 'r2',
    name: 'Amber Flame Grill',
    rating: 4.5,
    cuisine: 'Burgers',
    eta: '20-30 min',
    fee: 1.99,
    image: null,
    banner: 'Smash burgers and crisp fries',
    menu: [
      { id: 'm4', section: 'Burgers', name: 'Classic Smash', price: 9.99, description: 'Cheddar, pickles, house sauce' },
      { id: 'm5', section: 'Burgers', name: 'Double Stack', price: 12.49, description: 'Double patty, American cheese' },
      { id: 'm6', section: 'Sides', name: 'Crispy Fries', price: 3.99, description: 'Sea salt fries' }
    ]
  },
  {
    id: 'r3',
    name: 'Spice Route Kitchen',
    rating: 4.8,
    cuisine: 'Indian',
    eta: '30-40 min',
    fee: 3.49,
    image: null,
    banner: 'Curries and tandoor specialties',
    menu: [
      { id: 'm7', section: 'Curries', name: 'Butter Chicken', price: 14.99, description: 'Creamy tomato sauce, tender chicken' },
      { id: 'm8', section: 'Curries', name: 'Chana Masala', price: 10.49, description: 'Chickpeas in spiced gravy' },
      { id: 'm9', section: 'Breads', name: 'Garlic Naan', price: 3.49, description: 'Tandoor-baked flatbread' }
    ]
  }
];
