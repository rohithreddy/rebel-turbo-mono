import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";
import { dodopaymentsClient } from "@dodopayments/better-auth";

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
