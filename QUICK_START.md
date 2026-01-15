# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file:
```env
EXPO_PUBLIC_SUPABASE_URL=your-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-key
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-key
```

### 3. Start Development Server
```bash
npm start
```

### 4. Run on Device/Simulator
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

## 📁 Project Structure

```
app/
  (tabs)/          # Main tab screens (Home, Menu, Cart, Account)
  (auth)/          # Authentication screens
  (account)/       # Account management screens
  checkout.tsx     # Checkout flow
  confirmation.tsx # Order confirmation
  ...

contexts/          # React Context providers
hooks/             # Custom hooks
lib/               # Third-party configs (Supabase, etc.)
utils/             # Utility functions
```

## 🔑 Key Files

- `app/_layout.tsx` - Root layout with providers
- `app/(tabs)/_layout.tsx` - Tab navigation
- `contexts/CartContext.tsx` - Shopping cart state
- `hooks/useAuth.ts` - Authentication logic
- `lib/supabase.ts` - Supabase client

## 🛠️ Common Commands

```bash
# Development
npm start              # Start Expo dev server
npm run ios           # Run on iOS simulator
npm run android       # Run on Android emulator

# Building
eas build:configure   # Configure EAS
eas build --platform ios
eas build --platform android

# Submitting
eas submit --platform ios
eas submit --platform android
```

## 📝 Next Steps

1. Add your app assets to `assets/images/`
2. Set up Supabase database tables (see SETUP.md)
3. Configure Stripe account
4. Test on physical devices
5. Build for production

For detailed setup, see `SETUP.md`.
