import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

const REGION = "europe-central2";

/**
 * Callback request handler
 * Receives phone number and stores callback request
 */
export const callback = onRequest(
  { region: REGION, cors: true },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const { phone } = req.body;

      if (!phone) {
        res.status(400).json({ error: "Phone number is required" });
        return;
      }

      // Store callback request in Firestore
      await admin.firestore().collection("callbacks").add({
        phone,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        status: "pending",
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Callback error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

/**
 * Order submission handler
 */
export const orders = onRequest(
  { region: REGION, cors: true },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const orderData = req.body;

      if (!orderData.items || !orderData.customer) {
        res.status(400).json({ error: "Invalid order data" });
        return;
      }

      // Generate order number
      const orderNumber = `HY-${String(Date.now()).slice(-6)}`;

      // Store order in Firestore
      const orderRef = await admin.firestore().collection("orders").add({
        ...orderData,
        orderNumber,
        status: "pending",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.status(200).json({
        success: true,
        orderId: orderRef.id,
        orderNumber,
      });
    } catch (error) {
      console.error("Order error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
