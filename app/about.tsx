import { View, Text, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-3xl font-bold text-gray-900 mb-4">
          About King Koney
        </Text>
        <Text className="text-gray-700 text-lg mb-6 leading-6">
          King Koney has been serving authentic Coney Island cuisine in Detroit since 1985. 
          We're proud to bring you the best hot dogs, coney dogs, and classic American comfort food 
          in the Motor City.
        </Text>

        <View className="bg-gray-50 rounded-lg p-6 mb-6">
          <Text className="text-xl font-semibold text-gray-900 mb-3">
            Our Story
          </Text>
          <Text className="text-gray-700 leading-6">
            Founded with a passion for authentic flavors and community, King Koney has become 
            a beloved Detroit institution. We source the finest ingredients and prepare every 
            dish with care, just like we've been doing for over three decades.
          </Text>
        </View>

        <View className="bg-gray-50 rounded-lg p-6">
          <Text className="text-xl font-semibold text-gray-900 mb-3">
            Our Mission
          </Text>
          <Text className="text-gray-700 leading-6">
            To serve delicious, authentic Coney Island cuisine while providing exceptional 
            service to our community. Every order is prepared fresh, with quality ingredients, 
            and delivered with a smile.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
