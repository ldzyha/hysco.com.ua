import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

const REGION = "europe-central2";
const FALLBACK_RATE = 41.5;

/**
 * Get current USD/UAH exchange rate from Firestore cache
 */
export const getExchangeRate = onRequest(
  { region: REGION, cors: true },
  async (_req, res) => {
    try {
      const doc = await admin
        .firestore()
        .collection("config")
        .doc("exchangeRates")
        .get();

      if (doc.exists) {
        const data = doc.data();
        res.status(200).json({
          rate: data?.usdToUah || FALLBACK_RATE,
          updatedAt: data?.updatedAt?.toDate?.()?.toISOString() || null,
        });
      } else {
        res.status(200).json({
          rate: FALLBACK_RATE,
          updatedAt: null,
        });
      }
    } catch (error) {
      console.error("Exchange rate error:", error);
      res.status(200).json({
        rate: FALLBACK_RATE,
        updatedAt: null,
      });
    }
  }
);
