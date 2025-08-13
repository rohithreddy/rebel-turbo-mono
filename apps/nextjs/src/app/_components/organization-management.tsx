"use client";

import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";
import { Label } from "@acme/ui/label";
import { useState, useEffect } from "react";
import { z } from "zod";

import { useSession, orgClient } from "@acme/auth/client";

const createOrgSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and dashes only"),
  maxMembers: z.number().min(1).max(100).optional(),
});

const inviteSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export function OrganizationManagement() {
  const { data: session, isLoading } = useSession();
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
      const result = await orgClient.list();
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
      const result = await orgClient.listMembers({ organizationId: orgId });
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

      const result = await orgClient.create({
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

      const result = await orgClient.inviteMember({
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
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Organization Management</h3>
          <p className="text-sm text-muted-foreground">Please sign in to manage organizations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Create Organization */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Create Organization</h3>
          <p className="text-sm text-muted-foreground">Start a new organization and invite team members</p>
        </div>
        <div className="p-6 pt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                value={orgForm.name}
                onChange={(e) => setOrgForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Acme Corp"
              />
            </div>
            <div>
              <Label htmlFor="orgSlug">Slug</Label>
              <Input
                id="orgSlug"
                value={orgForm.slug}
                onChange={(e) => setOrgForm(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="acme-corp"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="maxMembers">Maximum Members</Label>
            <Input
              id="maxMembers"
              type="number"
              min="1"
              max="100"
              value={orgForm.maxMembers}
              onChange={(e) => setOrgForm(prev => ({ ...prev, maxMembers: parseInt(e.target.value) }))}
            />
          </div>
          <Button onClick={createOrganization} disabled={createLoading}>
            {createLoading && (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
            )}
            Create Organization
          </Button>
        </div>
      </div>

      {/* Organizations List */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
            <span>👥</span>
            Your Organizations
          </h3>
          <p className="text-sm text-muted-foreground">Manage your organizations and members</p>
        </div>
        <div className="p-6 pt-0">
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
            </div>
          ) : organizations.length === 0 ? (
            <p className="text-muted-foreground">No organizations found. Create one above!</p>
          ) : (
            <div className="space-y-4">
              {organizations.map((org) => {
                const members = orgMembers[org.id] || [];
                const maxMembers = org.metadata?.maxMembers || 10;
                const isSelected = selectedOrg === org.id;

                return (
                  <div key={org.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          {org.name}
                          {org.role === 'owner' && <span className="text-yellow-500">👑</span>}
                        </h3>
                        <p className="text-sm text-muted-foreground">@{org.slug}</p>
                      </div>
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                        {members.length}/{maxMembers} members
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedOrg(null);
                          } else {
                            setSelectedOrg(org.id);
                            fetchOrgMembers(org.id);
                          }
                        }}
                      >
                        {isSelected ? "Hide Details" : "View Details"}
                      </Button>
                    </div>

                    {isSelected && (
                      <div className="mt-4 pt-4 border-t">
                        {/* Invite Member */}
                        {org.role === 'owner' && members.length < maxMembers && (
                          <div className="mb-4 p-3 bg-muted rounded">
                            <Label htmlFor={`invite-${org.id}`}>Invite New Member</Label>
                            <div className="flex gap-2 mt-1">
                              <Input
                                id={`invite-${org.id}`}
                                type="email"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                placeholder="user@example.com"
                                className="flex-1"
                              />
                              <Button size="sm" onClick={() => inviteMember(org.id)}>
                                <span className="mr-1">📧</span>
                                Invite
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Members List */}
                        <div>
                          <h4 className="font-medium mb-2">Members</h4>
                          {members.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No members found</p>
                          ) : (
                            <div className="space-y-2">
                              {members.map((member: any) => (
                                <div key={member.id} className="flex items-center justify-between text-sm">
                                  <div>
                                    <span className="font-medium">{member.user?.name || member.user?.email}</span>
                                    {member.user?.email && member.user?.name && (
                                      <span className="text-muted-foreground ml-2">({member.user.email})</span>
                                    )}
                                  </div>
                                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                                    member.role === 'owner' 
                                      ? 'bg-primary text-primary-foreground hover:bg-primary/80'
                                      : 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                  }`}>
                                    {member.role}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}