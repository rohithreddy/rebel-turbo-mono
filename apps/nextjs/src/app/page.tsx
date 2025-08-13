import { Suspense } from "react";

import { HydrateClient, prefetch, trpc } from "~/trpc/server";
import { PaymentButtons, SubscriptionStatus } from "./_components/payment-buttons";
import { OrganizationManagement } from "./_components/organization-management";
import {
  CreatePostForm,
  PostCardSkeleton,
  PostList,
} from "./_components/posts";

export default function HomePage() {
  prefetch(trpc.post.all.queryOptions());

  return (
    <HydrateClient>
      <main className="container py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome to <span className="text-primary">TurboLearn</span>
            </h1>
            <p className="mt-2 text-muted-foreground">
              A modern learning platform built with the T3 stack
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Features</h2>
              <div className="space-y-4">
                <PaymentButtons />
                <SubscriptionStatus />
                <OrganizationManagement />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Posts</h2>
              <CreatePostForm />
              <div className="space-y-4">
                <Suspense
                  fallback={
                    <div className="flex w-full flex-col gap-4">
                      <PostCardSkeleton />
                      <PostCardSkeleton />
                      <PostCardSkeleton />
                    </div>
                  }
                >
                  <PostList />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
