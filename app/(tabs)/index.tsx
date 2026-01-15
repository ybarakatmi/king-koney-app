import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from '@/contexts/CartContext';
import { Image as ExpoImage } from 'expo-image';
import { MapPin, Phone, Clock, Instagram } from 'lucide-react-native';
import * as Linking from 'expo-linking';
import { haptics } from '@/utils/haptics';

export default function HomeScreen() {
  const router = useRouter();
  const { cartCount } = useCart();

  const handlePhoneCall = () => {
    haptics.light();
    Linking.openURL('tel:+13137444564');
  };

  const handleInstagram = () => {
    haptics.light();
    Linking.openURL('https://www.instagram.com/kingkoneyconeyisland');
  };

  const handleMaps = () => {
    haptics.light();
    Linking.openURL('https://maps.google.com/?q=6211+W+Warren+Ave+Detroit+MI');
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary px-4 pt-12 pb-6">
        <Text className="text-white text-3xl font-bold mb-2">King Koney</Text>
        <Text className="text-white/90 text-base">Authentic Coney Island</Text>
      </View>

      {/* Hero Image */}
      <View className="h-64 bg-gray-200">
        <ExpoImage
          source={require('../../assets/images/hero.jpg')}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
        />
      </View>

      {/* Quick Actions */}
      <View className="px-4 py-6">
        <View className="flex-row justify-between mb-6">
          <TouchableOpacity
            onPress={() => {
              haptics.medium();
              router.push('/menu');
            }}
            className="flex-1 bg-primary rounded-lg p-4 mr-2 items-center"
          >
            <Text className="text-white text-lg font-semibold">Order Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              haptics.medium();
              router.push('/deals');
            }}
            className="flex-1 bg-secondary rounded-lg p-4 ml-2 items-center"
          >
            <Text className="text-white text-lg font-semibold">Deals</Text>
          </TouchableOpacity>
        </View>

        {/* Location Info */}
        <View className="bg-gray-50 rounded-lg p-4 mb-4">
          <View className="flex-row items-center mb-2">
            <MapPin color="#DC2626" size={20} />
            <Text className="ml-2 text-gray-900 font-semibold">Location</Text>
          </View>
          <TouchableOpacity onPress={handleMaps}>
            <Text className="ml-7 text-gray-700">6211 W Warren Ave, Detroit, MI</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-gray-50 rounded-lg p-4 mb-4">
          <View className="flex-row items-center mb-2">
            <Phone color="#DC2626" size={20} />
            <Text className="ml-2 text-gray-900 font-semibold">Call Us</Text>
          </View>
          <TouchableOpacity onPress={handlePhoneCall}>
            <Text className="ml-7 text-gray-700">(313) 744-4564</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-gray-50 rounded-lg p-4 mb-4">
          <View className="flex-row items-center mb-2">
            <Clock color="#DC2626" size={20} />
            <Text className="ml-2 text-gray-900 font-semibold">Hours</Text>
          </View>
          <Text className="ml-7 text-gray-700">Mon-Sun: 10:00 AM - 10:00 PM</Text>
        </View>

        <TouchableOpacity
          onPress={handleInstagram}
          className="bg-gray-50 rounded-lg p-4 flex-row items-center"
        >
          <Instagram color="#DC2626" size={20} />
          <Text className="ml-2 text-gray-700">Follow us on Instagram</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
