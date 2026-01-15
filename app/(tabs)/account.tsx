import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { User, Package, MapPin, CreditCard, Gift, LogOut, Settings } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';

export default function AccountScreen() {
  const router = useRouter();
  const { user, isAuthenticated, signOut } = useAuth();

  const handleSignOut = async () => {
    haptics.medium();
    await signOut();
    router.replace('/(auth)/login');
  };

  if (!isAuthenticated) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-4">
        <User color="#DC2626" size={64} />
        <Text className="text-2xl font-bold text-gray-900 mb-2 mt-4">
          Welcome to King Koney
        </Text>
        <Text className="text-gray-600 text-center mb-6">
          Sign in to access your account, orders, and rewards
        </Text>
        <TouchableOpacity
          onPress={() => {
            haptics.medium();
            router.push('/(auth)/login');
          }}
          className="bg-primary rounded-lg px-6 py-3 w-full mb-3"
        >
          <Text className="text-white font-semibold text-lg text-center">Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            haptics.medium();
            router.push('/(auth)/signup');
          }}
          className="bg-gray-100 rounded-lg px-6 py-3 w-full"
        >
          <Text className="text-gray-900 font-semibold text-lg text-center">Create Account</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* User Info */}
      <View className="bg-primary px-4 pt-12 pb-6">
        <View className="flex-row items-center">
          <View className="bg-white/20 rounded-full w-16 h-16 items-center justify-center">
            <User color="#FFFFFF" size={32} />
          </View>
          <View className="ml-4">
            <Text className="text-white text-xl font-bold">
              {user?.email?.split('@')[0] || 'User'}
            </Text>
            <Text className="text-white/80 text-sm">{user?.email}</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View className="px-4 py-4">
        <TouchableOpacity
          onPress={() => {
            haptics.medium();
            router.push('/(account)/orders');
          }}
          className="flex-row items-center bg-white rounded-lg p-4 mb-3 border border-gray-200"
        >
          <Package color="#DC2626" size={24} />
          <Text className="ml-4 text-lg font-semibold text-gray-900">Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            haptics.medium();
            router.push('/(account)/profile');
          }}
          className="flex-row items-center bg-white rounded-lg p-4 mb-3 border border-gray-200"
        >
          <User color="#DC2626" size={24} />
          <Text className="ml-4 text-lg font-semibold text-gray-900">Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            haptics.medium();
            router.push('/(account)/addresses');
          }}
          className="flex-row items-center bg-white rounded-lg p-4 mb-3 border border-gray-200"
        >
          <MapPin color="#DC2626" size={24} />
          <Text className="ml-4 text-lg font-semibold text-gray-900">Addresses</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            haptics.medium();
            router.push('/(account)/payment');
          }}
          className="flex-row items-center bg-white rounded-lg p-4 mb-3 border border-gray-200"
        >
          <CreditCard color="#DC2626" size={24} />
          <Text className="ml-4 text-lg font-semibold text-gray-900">Payment Methods</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            haptics.medium();
            router.push('/(account)/rewards');
          }}
          className="flex-row items-center bg-white rounded-lg p-4 mb-3 border border-gray-200"
        >
          <Gift color="#DC2626" size={24} />
          <Text className="ml-4 text-lg font-semibold text-gray-900">Rewards</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            haptics.medium();
            router.push('/about');
          }}
          className="flex-row items-center bg-white rounded-lg p-4 mb-3 border border-gray-200"
        >
          <Settings color="#DC2626" size={24} />
          <Text className="ml-4 text-lg font-semibold text-gray-900">About</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignOut}
          className="flex-row items-center bg-red-50 rounded-lg p-4 mt-4 border border-red-200"
        >
          <LogOut color="#DC2626" size={24} />
          <Text className="ml-4 text-lg font-semibold text-red-600">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
