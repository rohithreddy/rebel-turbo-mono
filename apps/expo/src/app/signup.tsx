import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import { authClient } from "~/utils/auth";

export default function SignUpScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const result = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (result.error) {
        Alert.alert("Error", result.error.message || "Failed to sign up");
      } else {
        Alert.alert("Success", "Account created successfully!", [
          {
            text: "OK",
            onPress: () => router.replace("/"),
          },
        ]);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-50 justify-center px-4">
      <View className="bg-white rounded-lg p-6 shadow-sm">
        <Text className="text-2xl font-bold text-center mb-6">Sign Up</Text>
        
        <View className="space-y-4">
          <View>
            <Text className="text-sm font-medium mb-1">Name</Text>
            <TextInput
              value={form.name}
              onChangeText={(text) => setForm(prev => ({ ...prev, name: text }))}
              placeholder="Enter your name"
              className="border border-gray-300 rounded-md px-3 py-2 bg-white"
            />
          </View>

          <View>
            <Text className="text-sm font-medium mb-1">Email</Text>
            <TextInput
              value={form.email}
              onChangeText={(text) => setForm(prev => ({ ...prev, email: text }))}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              className="border border-gray-300 rounded-md px-3 py-2 bg-white"
            />
          </View>

          <View>
            <Text className="text-sm font-medium mb-1">Password</Text>
            <TextInput
              value={form.password}
              onChangeText={(text) => setForm(prev => ({ ...prev, password: text }))}
              placeholder="Enter your password"
              secureTextEntry
              className="border border-gray-300 rounded-md px-3 py-2 bg-white"
            />
          </View>

          <View>
            <Text className="text-sm font-medium mb-1">Confirm Password</Text>
            <TextInput
              value={form.confirmPassword}
              onChangeText={(text) => setForm(prev => ({ ...prev, confirmPassword: text }))}
              placeholder="Confirm your password"
              secureTextEntry
              className="border border-gray-300 rounded-md px-3 py-2 bg-white"
            />
          </View>

          <Pressable
            onPress={handleSignUp}
            disabled={loading}
            className={`rounded-md px-4 py-3 mt-4 ${
              loading ? 'bg-gray-400' : 'bg-blue-600'
            }`}
          >
            <Text className="text-white text-center font-medium">
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/login")}
            className="mt-4"
          >
            <Text className="text-center text-blue-600">
              Already have an account? Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}