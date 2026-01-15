import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Phone, Mail } from 'lucide-react-native';
import * as Linking from 'expo-linking';
import { haptics } from '@/utils/haptics';

export default function CateringScreen() {
  const router = useRouter();

  const handlePhoneCall = () => {
    haptics.medium();
    Linking.openURL('tel:+13137444564');
  };

  const handleEmail = () => {
    haptics.medium();
    Linking.openURL('mailto:info@kingkoney.com?subject=Catering Inquiry');
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-3xl font-bold text-gray-900 mb-4">
          Catering Services
        </Text>
        <Text className="text-gray-700 text-lg mb-6">
          Planning a party, office event, or special occasion? Let King Koney cater your next event!
        </Text>

        <View className="bg-primary/10 rounded-lg p-6 mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            What We Offer
          </Text>
          <Text className="text-gray-700 mb-2">
            • Full catering menu available
          </Text>
          <Text className="text-gray-700 mb-2">
            • Customizable packages
          </Text>
          <Text className="text-gray-700 mb-2">
            • Delivery and setup available
          </Text>
          <Text className="text-gray-700">
            • Minimum order: $100
          </Text>
        </View>

        <View className="bg-gray-50 rounded-lg p-6 mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Contact Us
          </Text>
          <TouchableOpacity
            onPress={handlePhoneCall}
            className="flex-row items-center mb-4 bg-white rounded-lg p-4"
          >
            <Phone color="#DC2626" size={24} />
            <Text className="ml-3 text-gray-900 font-semibold text-lg">
              (313) 744-4564
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleEmail}
            className="flex-row items-center bg-white rounded-lg p-4"
          >
            <Mail color="#DC2626" size={24} />
            <Text className="ml-3 text-gray-900 font-semibold text-lg">
              info@kingkoney.com
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-600 text-center">
          Please call or email us at least 24 hours in advance for catering orders.
        </Text>
      </View>
    </ScrollView>
  );
}
