import * as admin from "firebase-admin";

admin.initializeApp();

export { callback, orders } from "./api";
export { getExchangeRate } from "./exchangeRate";
