import { View, Text, Pressable, TextInput, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import { z } from "zod";

import { authClient } from "~/utils/auth";

const createOrgSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and dashes only"),
  maxMembers: z.number().min(1).max(100).optional(),
});

const inviteSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export function OrganizationManagement() {
  const { data: session, isLoading } = authClient.useSession();
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [orgForm, setOrgForm] = useState({
    name: "",
    slug: "",
    maxMembers: 10,
  });

  const [inviteEmail, setInviteEmail] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [orgMembers, setOrgMembers] = useState<Record<string, any[]>>({});

  useEffect(() => {
    if (session) {
      fetchOrganizations();
    }
  }, [session]);

  const fetchOrganizations = async () => {
    setLoading(true);
    try {
      const result = await authClient.organization.list();
      setOrganizations(result.data || []);
    } catch (error) {
      console.error("Error fetching organizations:", error);
      setError("Failed to load organizations");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrgMembers = async (orgId: string) => {
    try {
      const result = await authClient.organization.listMembers({ organizationId: orgId });
      setOrgMembers(prev => ({ ...prev, [orgId]: result.data || [] }));
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const createOrganization = async () => {
    try {
      const validatedData = createOrgSchema.parse(orgForm);
      setCreateLoading(true);
      setError(null);

      const result = await authClient.organization.create({
        name: validatedData.name,
        slug: validatedData.slug,
        metadata: validatedData.maxMembers ? { maxMembers: validatedData.maxMembers } : undefined,
      });

      if (result.data) {
        setOrganizations(prev => [...prev, result.data]);
        setOrgForm({ name: "", slug: "", maxMembers: 10 });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0]?.message || "Validation error");
      } else {
        setError(error.message || "Failed to create organization");
      }
    } finally {
      setCreateLoading(false);
    }
  };

  const inviteMember = async (orgId: string) => {
    try {
      const validatedData = inviteSchema.parse({ email: inviteEmail });
      setError(null);

      const org = organizations.find(o => o.id === orgId);
      const currentMembers = orgMembers[orgId] || [];
      const maxMembers = org?.metadata?.maxMembers || 10;

      if (currentMembers.length >= maxMembers) {
        setError(`Cannot invite more members. Limit of ${maxMembers} reached.`);
        return;
      }

      const result = await authClient.organization.inviteMember({
        organizationId: orgId,
        email: validatedData.email,
      });

      if (result.data) {
        setInviteEmail("");
        await fetchOrgMembers(orgId);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0]?.message || "Validation error");
      } else {
        setError(error.message || "Failed to invite member");
      }
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!session) {
    return (
      <View className="rounded-lg border border-gray-200 bg-white shadow-sm m-4">
        <View className="p-6">
          <Text className="text-2xl font-semibold mb-2">Organization Management</Text>
          <Text className="text-sm text-gray-600">Please sign in to manage organizations</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4 space-y-6">
        {error && (
          <View className="rounded-lg border border-red-300 bg-red-50 p-4">
            <Text className="text-sm text-red-800">{error}</Text>
          </View>
        )}

        {/* Create Organization */}
        <View className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <View className="p-6">
            <Text className="text-2xl font-semibold mb-2">Create Organization</Text>
            <Text className="text-sm text-gray-600 mb-4">Start a new organization and invite team members</Text>
            
            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium mb-1">Organization Name</Text>
                <TextInput
                  value={orgForm.name}
                  onChangeText={(text) => setOrgForm(prev => ({ ...prev, name: text }))}
                  placeholder="Acme Corp"
                  className="border border-gray-300 rounded-md px-3 py-2 bg-white"
                />
              </View>
              
              <View>
                <Text className="text-sm font-medium mb-1">Slug</Text>
                <TextInput
                  value={orgForm.slug}
                  onChangeText={(text) => setOrgForm(prev => ({ ...prev, slug: text }))}
                  placeholder="acme-corp"
                  className="border border-gray-300 rounded-md px-3 py-2 bg-white"
                />
              </View>
              
              <View>
                <Text className="text-sm font-medium mb-1">Maximum Members</Text>
                <TextInput
                  value={orgForm.maxMembers.toString()}
                  onChangeText={(text) => setOrgForm(prev => ({ ...prev, maxMembers: parseInt(text) || 10 }))}
                  placeholder="10"
                  keyboardType="numeric"
                  className="border border-gray-300 rounded-md px-3 py-2 bg-white"
                />
              </View>
              
              <Pressable
                onPress={createOrganization}
                disabled={createLoading}
                className={`rounded-md px-4 py-2 ${createLoading ? 'bg-gray-400' : 'bg-blue-600'}`}
              >
                <Text className="text-white text-center font-medium">
                  {createLoading ? 'Creating...' : 'Create Organization'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Organizations List */}
        <View className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <View className="p-6">
            <Text className="text-2xl font-semibold mb-2">👥 Your Organizations</Text>
            <Text className="text-sm text-gray-600 mb-4">Manage your organizations and members</Text>
            
            {loading ? (
              <View className="flex items-center justify-center p-4">
                <Text>Loading organizations...</Text>
              </View>
            ) : organizations.length === 0 ? (
              <Text className="text-gray-600">No organizations found. Create one above!</Text>
            ) : (
              <View className="space-y-4">
                {organizations.map((org) => {
                  const members = orgMembers[org.id] || [];
                  const maxMembers = org.metadata?.maxMembers || 10;
                  const isSelected = selectedOrg === org.id;

                  return (
                    <View key={org.id} className="border border-gray-200 rounded-lg p-4">
                      <View className="flex flex-row items-center justify-between mb-2">
                        <View className="flex-1">
                          <Text className="font-semibold text-lg">
                            {org.name} {org.role === 'owner' && '👑'}
                          </Text>
                          <Text className="text-sm text-gray-600">@{org.slug}</Text>
                        </View>
                        <View className="bg-gray-100 rounded-full px-3 py-1">
                          <Text className="text-xs font-semibold">
                            {members.length}/{maxMembers} members
                          </Text>
                        </View>
                      </View>

                      <Pressable
                        onPress={() => {
                          if (isSelected) {
                            setSelectedOrg(null);
                          } else {
                            setSelectedOrg(org.id);
                            fetchOrgMembers(org.id);
                          }
                        }}
                        className="border border-gray-300 rounded-md px-3 py-2 mt-2"
                      >
                        <Text className="text-center text-sm">
                          {isSelected ? "Hide Details" : "View Details"}
                        </Text>
                      </Pressable>

                      {isSelected && (
                        <View className="mt-4 pt-4 border-t border-gray-200">
                          {/* Invite Member */}
                          {org.role === 'owner' && members.length < maxMembers && (
                            <View className="mb-4 p-3 bg-gray-50 rounded">
                              <Text className="text-sm font-medium mb-2">Invite New Member</Text>
                              <View className="flex flex-row gap-2">
                                <TextInput
                                  value={inviteEmail}
                                  onChangeText={setInviteEmail}
                                  placeholder="user@example.com"
                                  keyboardType="email-address"
                                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-white"
                                />
                                <Pressable
                                  onPress={() => inviteMember(org.id)}
                                  className="bg-blue-600 rounded-md px-3 py-2"
                                >
                                  <Text className="text-white text-sm">📧 Invite</Text>
                                </Pressable>
                              </View>
                            </View>
                          )}

                          {/* Members List */}
                          <View>
                            <Text className="font-medium mb-2">Members</Text>
                            {members.length === 0 ? (
                              <Text className="text-sm text-gray-600">No members found</Text>
                            ) : (
                              <View className="space-y-2">
                                {members.map((member: any) => (
                                  <View key={member.id} className="flex flex-row items-center justify-between">
                                    <View className="flex-1">
                                      <Text className="font-medium">
                                        {member.user?.name || member.user?.email}
                                      </Text>
                                      {member.user?.email && member.user?.name && (
                                        <Text className="text-gray-600 text-sm">
                                          ({member.user.email})
                                        </Text>
                                      )}
                                    </View>
                                    <View className={`px-2 py-1 rounded-full ${
                                      member.role === 'owner' 
                                        ? 'bg-blue-100' 
                                        : 'bg-gray-100'
                                    }`}>
                                      <Text className="text-xs font-semibold">
                                        {member.role}
                                      </Text>
                                    </View>
                                  </View>
                                ))}
                              </View>
                            )}
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}