# King Koney Mobile App

Native mobile app for King Koney restaurant built with Expo and React Native.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Expo CLI installed globally: `npm install -g expo-cli`
- iOS Simulator (for Mac) or Android Emulator
- Expo Go app on your physical device (optional)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase and Stripe keys:
```
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

3. Start the development server:
```bash
npm start
```

## 📱 Running on Devices

### iOS Simulator
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

### Physical Device
1. Install Expo Go from App Store or Google Play
2. Scan the QR code from the terminal
3. The app will load on your device

## 🏗️ Building for Production

### Install EAS CLI
```bash
npm install -g eas-cli
```

### Login to Expo
```bash
eas login
```

### Configure Project
```bash
eas build:configure
```

### Build for iOS
```bash
eas build --platform ios --profile production
```

### Build for Android
```bash
eas build --platform android --profile production
```

### Submit to App Stores
```bash
# iOS
eas submit --platform ios --profile production

# Android
eas submit --platform android --profile production
```

## 📁 Project Structure

```
king-koney-app/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigator screens
│   ├── (auth)/            # Authentication screens
│   ├── (account)/         # Account management screens
│   └── ...
├── components/            # Reusable components
├── contexts/              # React Context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Library configurations
├── utils/                 # Utility functions
└── constants/             # App constants
```

## 🛠️ Tech Stack

- **Framework**: Expo SDK 52+ with React Native
- **Routing**: Expo Router (file-based)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Backend**: Supabase
- **Payments**: Stripe React Native SDK
- **State Management**: React Context
- **Animations**: React Native Reanimated
- **Icons**: Lucide React Native

## 📝 Key Features

- ✅ User authentication (Supabase Auth)
- ✅ Menu browsing and ordering
- ✅ Shopping cart management
- ✅ Stripe payment integration
- ✅ Order history
- ✅ Push notifications
- ✅ Haptic feedback
- ✅ Native navigation

## 🔧 Configuration

### App Configuration
Edit `app.json` to customize:
- App name and slug
- Bundle identifiers
- Icons and splash screens
- Permissions

### EAS Build Configuration
Edit `eas.json` to configure:
- Build profiles
- App Store submission settings
- Android Play Store settings

## 📦 Dependencies

See `package.json` for a complete list of dependencies.

## 🐛 Troubleshooting

### Metro bundler issues
```bash
npx expo start --clear
```

### iOS build issues
```bash
cd ios && pod install && cd ..
```

### Android build issues
```bash
cd android && ./gradlew clean && cd ..
```

## 📄 License

Copyright © 2024 King Koney. All rights reserved.
