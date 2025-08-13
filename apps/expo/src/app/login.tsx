import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import { authClient } from "~/utils/auth";

export default function LoginScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await authClient.signIn.email({
        email: form.email,
        password: form.password,
      });

      if (result.error) {
        Alert.alert("Error", result.error.message || "Failed to sign in");
      } else {
        router.replace("/");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background justify-center px-4">
      <View className="bg-card rounded-lg p-6 shadow-sm">
        <Text className="text-2xl font-bold text-center mb-6 text-card-foreground">Sign In</Text>
        
        <View className="space-y-4">
          <View>
            <Text className="text-sm font-medium mb-1 text-card-foreground">Email</Text>
            <TextInput
              value={form.email}
              onChangeText={(text) => setForm(prev => ({ ...prev, email: text }))}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              className="border border-border rounded-md px-3 py-2 bg-background text-foreground"
            />
          </View>

          <View>
            <Text className="text-sm font-medium mb-1 text-card-foreground">Password</Text>
            <TextInput
              value={form.password}
              onChangeText={(text) => setForm(prev => ({ ...prev, password: text }))}
              placeholder="Enter your password"
              secureTextEntry
              className="border border-border rounded-md px-3 py-2 bg-background text-foreground"
            />
          </View>

          <Pressable
            onPress={handleLogin}
            disabled={loading}
            className={`rounded-lg px-6 py-3 mt-4 ${
              loading ? 'bg-muted' : 'bg-primary'
            }`}
          >
            <Text className={`text-center font-semibold ${
              loading ? 'text-muted-foreground' : 'text-primary-foreground'
            }`}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/signup")}
            className="mt-4"
          >
            <Text className="text-center text-primary">
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}