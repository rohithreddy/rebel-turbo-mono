import { createAuthClient } from "better-auth/react";
import { dodopaymentsClient } from "@dodopayments/better-auth";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [dodopaymentsClient(), organizationClient()],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  organization: orgClient,
} = authClient;

// Helper functions for payments
export async function redirectToCustomerPortal() {
  try {
    const { data: customerPortal, error } = await authClient.dodopayments.customer.portal();
    if (customerPortal && customerPortal.url) {
      if (typeof globalThis !== "undefined" && "window" in globalThis) {
        (globalThis as any).window.location.href = customerPortal.url;
      }
    }
    return { data: customerPortal, error };
  } catch (error) {
    console.error("Error redirecting to customer portal:", error);
    return { data: null, error };
  }
}

export async function createAndRedirectToCheckoutSession(slug: string, options?: {
  customer?: {
    email?: string;
    name?: string;
  };
  billing?: {
    city?: string;
    country?: string;
    state?: string;
    street?: string;
    zipcode?: string;
  };
  referenceId?: string;
}) {
  try {
    const { data: checkout, error } = await authClient.dodopayments.checkout({
      slug,
      ...options,
    });
    if (checkout && checkout.url) {
      if (typeof globalThis !== "undefined" && "window" in globalThis) {
        (globalThis as any).window.location.href = checkout.url;
      }
    }
    return { data: checkout, error };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return { data: null, error };
  }
}