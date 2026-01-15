import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { AlertCircle } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <AlertCircle color="#9CA3AF" size={64} />
      <Text className="text-2xl font-bold text-gray-900 mt-6 mb-2">
        Page Not Found
      </Text>
      <Text className="text-gray-600 text-center mb-8">
        The page you're looking for doesn't exist.
      </Text>
      <TouchableOpacity
        onPress={() => {
          haptics.medium();
          router.replace('/(tabs)');
        }}
        className="bg-primary rounded-lg px-8 py-4"
      >
        <Text className="text-white font-bold text-lg">Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}
