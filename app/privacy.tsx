import { View, Text, ScrollView } from 'react-native';

export default function PrivacyScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-3xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </Text>
        <Text className="text-gray-600 text-sm mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </Text>

        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-900 mb-3">
            Information We Collect
          </Text>
          <Text className="text-gray-700 leading-6 mb-4">
            We collect information you provide directly to us, such as when you create an account, 
            place an order, or contact us for support.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-900 mb-3">
            How We Use Your Information
          </Text>
          <Text className="text-gray-700 leading-6 mb-2">
            • To process and fulfill your orders
          </Text>
          <Text className="text-gray-700 leading-6 mb-2">
            • To communicate with you about your orders
          </Text>
          <Text className="text-gray-700 leading-6 mb-2">
            • To send you promotional offers (with your consent)
          </Text>
          <Text className="text-gray-700 leading-6">
            • To improve our services
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-900 mb-3">
            Payment Information
          </Text>
          <Text className="text-gray-700 leading-6">
            All payment information is securely processed through Stripe. We do not store 
            your credit card information on our servers.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-900 mb-3">
            Contact Us
          </Text>
          <Text className="text-gray-700 leading-6">
            If you have questions about this Privacy Policy, please contact us at 
            info@kingkoney.com
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
