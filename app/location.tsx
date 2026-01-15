import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react-native';
import * as Linking from 'expo-linking';
import { haptics } from '@/utils/haptics';

export default function LocationScreen() {
  const handleMaps = () => {
    haptics.medium();
    Linking.openURL('https://maps.google.com/?q=6211+W+Warren+Ave+Detroit+MI');
  };

  const handlePhoneCall = () => {
    haptics.medium();
    Linking.openURL('tel:+13137444564');
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <View className="bg-gray-50 rounded-lg p-6 mb-4">
          <View className="flex-row items-center mb-4">
            <MapPin color="#DC2626" size={24} />
            <Text className="ml-3 text-xl font-bold text-gray-900">Address</Text>
          </View>
          <Text className="text-gray-700 text-lg mb-4">
            6211 W Warren Ave{'\n'}
            Detroit, MI 48210
          </Text>
          <TouchableOpacity
            onPress={handleMaps}
            className="bg-primary rounded-lg py-3 flex-row items-center justify-center"
          >
            <Navigation color="#FFFFFF" size={20} />
            <Text className="text-white font-semibold text-lg ml-2">
              Open in Maps
            </Text>
          </TouchableOpacity>
        </View>

        <View className="bg-gray-50 rounded-lg p-6 mb-4">
          <View className="flex-row items-center mb-4">
            <Phone color="#DC2626" size={24} />
            <Text className="ml-3 text-xl font-bold text-gray-900">Contact</Text>
          </View>
          <TouchableOpacity onPress={handlePhoneCall}>
            <Text className="text-gray-700 text-lg">(313) 744-4564</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-gray-50 rounded-lg p-6">
          <View className="flex-row items-center mb-4">
            <Clock color="#DC2626" size={24} />
            <Text className="ml-3 text-xl font-bold text-gray-900">Hours</Text>
          </View>
          <Text className="text-gray-700 text-lg mb-2">Monday - Sunday</Text>
          <Text className="text-gray-700 text-lg">10:00 AM - 10:00 PM</Text>
        </View>
      </View>
    </ScrollView>
  );
}
