import { Stack } from 'expo-router';

export default function AccountLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#DC2626' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="orders" options={{ title: 'Orders' }} />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
      <Stack.Screen name="addresses" options={{ title: 'Addresses' }} />
      <Stack.Screen name="payment" options={{ title: 'Payment Methods' }} />
      <Stack.Screen name="rewards" options={{ title: 'Rewards' }} />
    </Stack>
  );
}
