# King Koney App - Setup Guide

## Initial Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory with:
```
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

### 3. Required Assets
Place the following images in `assets/images/`:

- **icon.png** - 1024x1024 PNG (App icon, no transparency)
- **splash.png** - 1242x2436 PNG (Splash screen)
- **adaptive-icon.png** - 1024x1024 PNG (Android adaptive icon)
- **notification-icon.png** - 96x96 PNG (Notification icon)
- **hero.jpg** - Hero image for home screen (recommended: 1200x600)

### 4. Supabase Setup

#### Required Tables:
1. **menu_items**
   - id (uuid, primary key)
   - name (text)
   - description (text, nullable)
   - price (numeric)
   - image_url (text, nullable)
   - category (text)
   - modifiers (jsonb, nullable)
   - created_at (timestamp)

2. **orders**
   - id (uuid, primary key)
   - user_id (uuid, foreign key to auth.users)
   - items (jsonb)
   - total (numeric)
   - status (text)
   - created_at (timestamp)

3. **addresses**
   - id (uuid, primary key)
   - user_id (uuid, foreign key to auth.users)
   - name (text)
   - street (text)
   - city (text)
   - state (text)
   - zip (text)
   - is_default (boolean)

4. **customer_profiles**
   - id (uuid, primary key)
   - user_id (uuid, foreign key to auth.users)
   - full_name (text, nullable)
   - phone (text, nullable)
   - created_at (timestamp)
   - updated_at (timestamp)

5. **user_rewards**
   - id (uuid, primary key)
   - user_id (uuid, foreign key to auth.users)
   - points (integer, default 0)
   - updated_at (timestamp)

6. **user_push_tokens**
   - id (uuid, primary key)
   - user_id (uuid, foreign key to auth.users)
   - token (text)
   - platform (text)
   - created_at (timestamp)

#### Required Edge Functions:
1. **create-payment-intent**
   - Creates Stripe payment intent
   - Returns: { paymentIntent, ephemeralKey, customer }

### 5. Stripe Setup

1. Create a Stripe account
2. Get your publishable key
3. Set up webhook endpoints for order confirmation
4. Configure Apple Pay and Google Pay in Stripe dashboard

### 6. EAS Configuration

1. Install EAS CLI: `npm install -g eas-cli`
2. Login: `eas login`
3. Configure project: `eas build:configure`
4. Update `eas.json` with your:
   - Apple ID
   - App Store Connect App ID
   - Apple Team ID
   - Google Service Account key path

### 7. Run the App

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## Testing Checklist

- [ ] User authentication (sign up, sign in, sign out)
- [ ] Menu browsing and filtering
- [ ] Add items to cart
- [ ] Update cart quantities
- [ ] Remove items from cart
- [ ] Checkout flow
- [ ] Stripe payment integration
- [ ] Order confirmation
- [ ] Order history
- [ ] Profile management
- [ ] Address management
- [ ] Push notifications
- [ ] Haptic feedback
- [ ] Deep linking
- [ ] Error handling

## Common Issues

### Metro bundler cache issues
```bash
npx expo start --clear
```

### NativeWind not working
- Ensure `metro.config.js` is configured correctly
- Check that `global.css` is imported in `app/_layout.tsx`
- Verify `tailwind.config.js` paths are correct

### Supabase connection issues
- Verify environment variables are set correctly
- Check Supabase project is active
- Ensure RLS policies are configured

### Stripe payment issues
- Verify publishable key is correct
- Check Stripe account is in test mode (for development)
- Ensure Edge Function is deployed and working

## Next Steps

1. Add your app assets (icons, splash screens)
2. Configure Supabase database tables
3. Set up Stripe account and keys
4. Test on physical devices
5. Configure EAS for production builds
6. Submit to App Store and Google Play
