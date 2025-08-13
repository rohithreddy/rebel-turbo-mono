export async function processPaymentSucceeded(payload: any) {
  console.log("Processing payment succeeded:", payload);
}

export async function processPaymentFailed(payload: any) {
  console.log("Processing payment failed:", payload);
}

export async function processSubscriptionActive(payload: any) {
  console.log("Processing subscription active:", payload);
}

export async function processSubscriptionCancelled(payload: any) {
  console.log("Processing subscription cancelled:", payload);
}

export async function processRefundSucceeded(payload: any) {
  console.log("Processing refund succeeded:", payload);
}

export async function processDisputeOpened(payload: any) {
  console.log("Processing dispute opened:", payload);
}

export async function processLicenseKeyCreated(payload: any) {
  console.log("Processing license key created:", payload);
}

export async function processWebhookPayload(payload: any) {
  console.log("Processing generic webhook payload:", payload);
  
  try {
    switch (payload.type) {
      case "payment.succeeded":
        await processPaymentSucceeded(payload);
        break;
      case "payment.failed":
        await processPaymentFailed(payload);
        break;
      case "subscription.active":
        await processSubscriptionActive(payload);
        break;
      case "subscription.cancelled":
        await processSubscriptionCancelled(payload);
        break;
      case "refund.succeeded":
        await processRefundSucceeded(payload);
        break;
      case "dispute.opened":
        await processDisputeOpened(payload);
        break;
      case "license_key.created":
        await processLicenseKeyCreated(payload);
        break;
      default:
        console.log("Unhandled webhook event type:", payload.type);
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    throw error;
  }
}