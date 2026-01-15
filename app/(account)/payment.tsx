import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { CreditCard, Plus } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';
import { Alert } from 'react-native';

export default function PaymentScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <View className="items-center justify-center py-12">
          <CreditCard color="#9CA3AF" size={48} />
          <Text className="text-xl font-semibold text-gray-900 mt-4 mb-2">
            No payment methods
          </Text>
          <Text className="text-gray-600 text-center mb-6">
            Add a payment method to checkout faster
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            haptics.medium();
            Alert.alert('Coming Soon', 'Payment method management coming soon');
          }}
          className="bg-primary rounded-lg py-4 flex-row items-center justify-center"
        >
          <Plus color="#FFFFFF" size={20} />
          <Text className="text-white font-bold text-lg ml-2">Add Payment Method</Text>
        </TouchableOpacity>

        <View className="mt-6 p-4 bg-blue-50 rounded-lg">
          <Text className="text-sm text-blue-900">
            💳 Payment methods are securely stored and managed through Stripe. 
            Your card details are never stored on our servers.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
