import { Tabs } from 'expo-router';
import { Home, UtensilsCrossed, ShoppingCart, User } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';
import { View, Text } from 'react-native';

export default function TabLayout() {
  const { cartCount } = useCart();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#DC2626',
        tabBarInactiveTintColor: '#6B7280',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, size }) => <UtensilsCrossed color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <View>
              <ShoppingCart color={color} size={size} />
              {cartCount > 0 && (
                <View className="absolute -top-1 -right-2 bg-red-600 rounded-full w-5 h-5 items-center justify-center">
                  <Text className="text-white text-xs font-bold">{cartCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
