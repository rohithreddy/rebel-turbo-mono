import { View, Text, Pressable, TextInput, ScrollView, Alert } from "react-native";
import { useState } from "react";
import {
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";

import type { RouterOutputs } from "@acme/api";
import { CreatePostSchema } from "@acme/db/schema";

import { trpc } from "~/utils/api";

export function CreatePostForm() {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const queryClient = useQueryClient();
  const createPost = useMutation(
    trpc.post.create.mutationOptions({
      onSuccess: async () => {
        setForm({ title: "", content: "" });
        setErrors({});
        await queryClient.invalidateQueries({ queryKey: [["post", "all"]] });
        Alert.alert("Success", "Post created successfully!");
      },
      onError: (err) => {
        const message = err.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to post"
          : "Failed to create post";
        Alert.alert("Error", message);
      },
    }),
  );

  const handleSubmit = () => {
    try {
      const validatedData = CreatePostSchema.parse(form);
      setErrors({});
      createPost.mutate(validatedData);
    } catch (error: any) {
      if (error.errors) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <View className="w-full max-w-2xl p-4 space-y-4">
      <View>
        <TextInput
          value={form.title}
          onChangeText={(text) => setForm(prev => ({ ...prev, title: text }))}
          placeholder="Title"
          className="border border-gray-300 rounded-md px-3 py-2 bg-white"
        />
        {errors.title && (
          <Text className="text-red-600 text-sm mt-1">{errors.title}</Text>
        )}
      </View>

      <View>
        <TextInput
          value={form.content}
          onChangeText={(text) => setForm(prev => ({ ...prev, content: text }))}
          placeholder="Content"
          multiline
          numberOfLines={4}
          className="border border-gray-300 rounded-md px-3 py-2 bg-white min-h-[100px]"
        />
        {errors.content && (
          <Text className="text-red-600 text-sm mt-1">{errors.content}</Text>
        )}
      </View>

      <Pressable
        onPress={handleSubmit}
        disabled={createPost.isPending}
        className={`rounded-md px-4 py-3 ${
          createPost.isPending ? 'bg-gray-400' : 'bg-blue-600'
        }`}
      >
        <Text className="text-white text-center font-medium">
          {createPost.isPending ? 'Creating...' : 'Create'}
        </Text>
      </Pressable>
    </View>
  );
}

export function PostList() {
  const { data: posts, isLoading, error } = useQuery(trpc.post.all.queryOptions());

  if (isLoading) {
    return (
      <View className="flex w-full flex-col gap-4 p-4">
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-red-600">Error loading posts</Text>
      </View>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <View className="relative flex w-full flex-col gap-4 p-4">
        <PostCardSkeleton pulse={false} />
        <PostCardSkeleton pulse={false} />
        <PostCardSkeleton pulse={false} />

        <View className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 rounded-lg">
          <Text className="text-2xl font-bold text-white">No posts yet</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1">
      <View className="flex w-full flex-col gap-4 p-4">
        {posts.map((p) => {
          return <PostCard key={p.id} post={p} />;
        })}
      </View>
    </ScrollView>
  );
}

export function PostCard(props: {
  post: RouterOutputs["post"]["all"][number];
}) {
  const queryClient = useQueryClient();
  const deletePost = useMutation(
    trpc.post.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: [["post", "all"]] });
        Alert.alert("Success", "Post deleted successfully!");
      },
      onError: (err) => {
        const message = err.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to delete a post"
          : "Failed to delete post";
        Alert.alert("Error", message);
      },
    }),
  );

  const handleDelete = () => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deletePost.mutate(props.post.id),
        },
      ]
    );
  };

  return (
    <View className="flex flex-row rounded-lg bg-gray-100 p-4">
      <View className="flex-grow">
        <Text className="text-2xl font-bold text-blue-600 mb-2">
          {props.post.title}
        </Text>
        <Text className="text-sm text-gray-700">{props.post.content}</Text>
      </View>
      <View className="ml-4">
        <Pressable
          onPress={handleDelete}
          disabled={deletePost.isPending}
          className="px-3 py-1"
        >
          <Text className={`text-sm font-bold uppercase ${
            deletePost.isPending ? 'text-gray-400' : 'text-red-600'
          }`}>
            {deletePost.isPending ? 'Deleting...' : 'Delete'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export function PostCardSkeleton(props: { pulse?: boolean }) {
  const { pulse = true } = props;
  return (
    <View className="flex flex-row rounded-lg bg-gray-100 p-4">
      <View className="flex-grow">
        <View
          className={`w-1/4 h-6 rounded bg-blue-600 mb-2 ${
            pulse ? 'opacity-50' : ''
          }`}
        />
        <View
          className={`w-1/3 h-4 rounded bg-gray-400 ${
            pulse ? 'opacity-50' : ''
          }`}
        />
      </View>
    </View>
  );
}