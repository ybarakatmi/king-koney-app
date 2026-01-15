import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StripeProvider } from '@stripe/stripe-react-native';
import { CartProvider } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import * as SplashScreen from 'expo-splash-screen';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  const stripePublishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!stripePublishableKey) {
    console.warn('Stripe publishable key not found');
  }

  return (
    <StripeProvider
      publishableKey={stripePublishableKey || ''}
      merchantIdentifier="merchant.com.kingkoney"
    >
      <CartProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" options={{ presentation: 'modal' }} />
          <Stack.Screen name="checkout" />
          <Stack.Screen name="confirmation" />
          <Stack.Screen name="location" />
          <Stack.Screen name="catering" />
          <Stack.Screen name="about" />
          <Stack.Screen name="privacy" />
          <Stack.Screen name="deals" />
          <Stack.Screen name="success" />
          <Stack.Screen name="(account)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </CartProvider>
    </StripeProvider>
  );
}
