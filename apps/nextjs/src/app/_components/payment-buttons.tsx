"use client";

import { Button } from "@acme/ui/button";
import { useState } from "react";

import { createAndRedirectToCheckoutSession, redirectToCustomerPortal, useSession, authClient } from "@acme/auth/client";

export function PaymentButtons() {
  const { data: session, isLoading } = useSession();
  const [loadingCheckout, setLoadingCheckout] = useState<string | null>(null);
  const [loadingPortal, setLoadingPortal] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Payment Options</h3>
          <p className="text-sm text-muted-foreground">Please sign in to access payment features</p>
        </div>
      </div>
    );
  }

  const handleCheckout = async (productSlug: string) => {
    setLoadingCheckout(productSlug);
    try {
      const { error } = await createAndRedirectToCheckoutSession(productSlug);
      if (error) {
        console.error("Checkout error:", error);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoadingCheckout(null);
    }
  };

  const handleCustomerPortal = async () => {
    setLoadingPortal(true);
    try {
      const { error } = await redirectToCustomerPortal();
      if (error) {
        console.error("Customer portal error:", error);
      }
    } catch (error) {
      console.error("Customer portal error:", error);
    } finally {
      setLoadingPortal(false);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Premium Plan</h3>
          <p className="text-sm text-muted-foreground">Get access to premium features</p>
        </div>
        <div className="p-6 pt-0">
          <Button
            onClick={() => handleCheckout("premium-plan")}
            disabled={loadingCheckout === "premium-plan"}
            className="w-full"
          >
            {loadingCheckout === "premium-plan" && (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
            )}
            Subscribe to Premium
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Basic Plan</h3>
          <p className="text-sm text-muted-foreground">Get started with basic features</p>
        </div>
        <div className="p-6 pt-0">
          <Button
            onClick={() => handleCheckout("basic-plan")}
            disabled={loadingCheckout === "basic-plan"}
            variant="outline"
            className="w-full"
          >
            {loadingCheckout === "basic-plan" && (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
            )}
            Subscribe to Basic
          </Button>
        </div>
      </div>

      <div className="md:col-span-2 rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Customer Portal</h3>
          <p className="text-sm text-muted-foreground">Manage your subscriptions and billing</p>
        </div>
        <div className="p-6 pt-0">
          <Button
            onClick={handleCustomerPortal}
            disabled={loadingPortal}
            variant="secondary"
            className="w-full"
          >
            {loadingPortal && (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
            )}
            Open Customer Portal
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SubscriptionStatus() {
  const { data: session } = useSession();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSubscriptions = async () => {
    if (!session) return;
    
    setLoading(true);
    try {
      const { data: result, error } = await authClient.dodopayments.customer.subscriptions.list({
        query: {
          limit: 10,
          page: 1,
          active: true,
        },
      });
      if (error) {
        console.error("Error fetching subscriptions:", error);
      } else {
        setSubscriptions(result || []);
      }
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Your Subscriptions</h3>
        <p className="text-sm text-muted-foreground">Current active subscriptions</p>
      </div>
      <div className="p-6 pt-0">
        <Button onClick={fetchSubscriptions} disabled={loading}>
          {loading && (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
          )}
          Load Subscriptions
        </Button>
        
        {subscriptions.length > 0 && (
          <div className="mt-4 space-y-2">
            {subscriptions.map((sub: any) => (
              <div key={sub.id} className="rounded border p-3">
                <p className="font-medium">{sub.product?.name}</p>
                <p className="text-sm text-muted-foreground">Status: {sub.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}