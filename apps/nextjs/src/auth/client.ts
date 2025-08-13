import { createAuthClient } from "better-auth/react";
import { dodopaymentsClient } from "@dodopayments/better-auth/client";
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
