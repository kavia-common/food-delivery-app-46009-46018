# Food Delivery Native App (Expo)

Modern, minimal food delivery app scaffold using Expo (React Native) with Ocean Professional theme.

## Features
- Expo React Native scaffold
- Ocean Professional theme (primary #2563EB, secondary/success #F59E0B, error #EF4444, background #f9fafb, surface #ffffff, text #111827)
- Bottom tab navigation: Home, Search, Orders, Profile
- Stack navigation for Home/Search to Restaurant Details and Cart
- Screens: Home, Restaurant Details, Cart, Orders, Profile, Search
- Simple Cart context with totals (subtotal, delivery, tax)
- Mock restaurant/menu data
- Accessible components and responsive layout

## Run (local)
- Install dependencies: `npm install` (or `yarn`)
- Start development server: `npm run start`
- Use Expo Go app or emulator to preview

## Run in container
This repo provides a Dockerfile aimed at CI validation. To build:
```
./build-docker.sh
```
Note: The Dockerfile is minimal and does not run `expo start` in-container. Use local dev for interactive preview, or extend Dockerfile to include Android SDK and emulator if needed.

## Scripts
- `npm run start` - Expo Metro dev server
- `npm run android` - Build/run Android (requires local Android SDK)
- `npm run ios` - Build/run iOS (macOS)
- `npm run web` - Web preview

## Structure
```
src/
  App.js
  navigation/
  screens/
  theme/
  components/ui/
  store/
  data/
```

## Notes
- No backend is integrated yet; API calls will be added later.
- Assets are placeholders; images are represented by vector icons or shapes.

