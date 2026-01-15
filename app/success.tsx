import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { CheckCircle } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <CheckCircle color="#10B981" size={80} />
      <Text className="text-3xl font-bold text-gray-900 mt-6 mb-2">
        Success!
      </Text>
      <Text className="text-gray-600 text-center mb-8">
        Your action was completed successfully.
      </Text>
      <TouchableOpacity
        onPress={() => {
          haptics.medium();
          router.back();
        }}
        className="bg-primary rounded-lg px-8 py-4"
      >
        <Text className="text-white font-bold text-lg">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
