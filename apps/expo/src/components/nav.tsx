import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { authClient } from "~/utils/auth";

export function Nav() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <View className="border-b border-gray-200 bg-white/95">
      <View className="flex h-14 max-w-screen-2xl flex-row items-center px-4">
        <View className="mr-4 flex">
          <Link href="/" asChild>
            <Pressable className="mr-6 flex flex-row items-center">
              <Text className="font-bold text-lg">TurboLearn</Text>
            </Pressable>
          </Link>
        </View>
        <View className="flex flex-1 flex-row items-center justify-between">
          <View className="flex-1">
            {/* Add search or other nav items here */}
          </View>
          <View className="flex flex-row items-center gap-2">
            {session ? (
              <View className="flex flex-row items-center gap-4">
                <Text className="text-sm">Welcome, {session.user.name}</Text>
                <Pressable
                  className="border border-gray-300 rounded-md px-3 py-1.5 bg-white"
                  onPress={handleSignOut}
                >
                  <Text className="text-sm">Sign Out</Text>
                </Pressable>
              </View>
            ) : (
              <View className="flex flex-row items-center gap-2">
                <Pressable 
                  className="px-3 py-1.5 rounded-md"
                  onPress={() => router.push("/login")}
                >
                  <Text className="text-sm">Sign In</Text>
                </Pressable>
                <Pressable 
                  className="bg-blue-600 px-3 py-1.5 rounded-md"
                  onPress={() => router.push("/signup")}
                >
                  <Text className="text-sm text-white">Sign Up</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}