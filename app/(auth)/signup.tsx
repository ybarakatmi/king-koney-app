import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { haptics } from '@/utils/haptics';

export default function SignupScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    haptics.medium();
    setLoading(true);

    try {
      const { error } = await signUp(email, password);
      if (error) {
        Alert.alert('Signup Failed', error.message);
        haptics.error();
      } else {
        haptics.success();
        Alert.alert('Success', 'Account created! Please check your email to verify your account.');
        router.replace('/(tabs)');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
      haptics.error();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 px-6 py-12">
        <Text className="text-3xl font-bold text-gray-900 mb-2">Create Account</Text>
        <Text className="text-gray-600 mb-8">Sign up to get started</Text>

        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg px-4 py-3 text-base"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            className="border border-gray-300 rounded-lg px-4 py-3 text-base"
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Confirm Password</Text>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
            className="border border-gray-300 rounded-lg px-4 py-3 text-base"
          />
        </View>

        <TouchableOpacity
          onPress={handleSignup}
          disabled={loading}
          className={`bg-primary rounded-lg py-4 items-center mb-4 ${
            loading ? 'opacity-50' : ''
          }`}
        >
          <Text className="text-white font-bold text-lg">
            {loading ? 'Creating account...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/(auth)/login')}
          className="items-center"
        >
          <Text className="text-gray-600">
            Already have an account?{' '}
            <Text className="text-primary font-semibold">Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
