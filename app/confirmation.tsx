import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { CheckCircle } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';

export default function ConfirmationScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <CheckCircle color="#10B981" size={80} />
      <Text className="text-3xl font-bold text-gray-900 mt-6 mb-2">
        Order Confirmed!
      </Text>
      <Text className="text-gray-600 text-center mb-8">
        Your order has been placed successfully. You'll receive a confirmation email shortly.
      </Text>
      <TouchableOpacity
        onPress={() => {
          haptics.medium();
          router.replace('/(tabs)');
        }}
        className="bg-primary rounded-lg px-8 py-4"
      >
        <Text className="text-white font-bold text-lg">Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );
}
