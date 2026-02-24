/**
 * Google Chat notification card builders
 * 
 * Source of truth: /home/dzy/shared/src/firebase/google-chat.ts
 * This file is synced from the shared library.
 * Tests: /home/dzy/shared/src/firebase/google-chat.test.ts (38 tests)
 */

export interface SiteInfo {
  siteName: string;
  domain: string;
  orderPrefix: string;
  productUrlPattern: string;
}

export interface CallbackData {
  phone: string;
  productName?: string;
  productSlug?: string;
}

export interface OrderData {
  customer: { name: string; phone: string; email?: string };
  items: Array<{ name: string; quantity: number; slug?: string }>;
  subtotalUsdCents?: number;
  delivery?: { method: string; city?: string; warehouse?: string };
  comment?: string;
}

/**
 * Generate order number with site prefix
 * Format: PREFIX-XXXXXX (6-digit timestamp suffix)
 */
export function generateOrderNumber(prefix: string): string {
  return `${prefix}${String(Date.now()).slice(-6)}`;
}

/**
 * Build product URL from site config
 */
export function buildProductUrl(site: SiteInfo, slug: string): string {
  const path = site.productUrlPattern.replace(":slug", slug);
  return `https://${site.domain}${path}${path.endsWith("/") ? "" : "/"}`;
}

/**
 * Build Google Chat card for callback request
 */
export function buildCallbackCard(
  site: SiteInfo,
  data: CallbackData
): Record<string, unknown> {
  const timestamp = new Date().toLocaleString("uk-UA", {
    timeZone: "Europe/Kyiv",
  });

  const widgets: unknown[] = [
    {
      decoratedText: {
        topLabel: "Телефон",
        text: data.phone,
        icon: { knownIcon: "PHONE" },
        button: {
          text: "Подзвонити",
          onClick: {
            openLink: { url: `tel:${data.phone.replace(/\s/g, "")}` },
          },
        },
      },
    },
  ];

  if (data.productName && data.productSlug) {
    widgets.push({
      decoratedText: {
        topLabel: "Товар",
        text: data.productName,
        button: {
          text: "Переглянути",
          onClick: {
            openLink: { url: buildProductUrl(site, data.productSlug) },
          },
        },
      },
    });
  }

  widgets.push({
    decoratedText: { topLabel: "Сайт", text: site.domain },
  });

  return {
    cardsV2: [
      {
        cardId: `callback-${Date.now()}`,
        card: {
          header: {
            title: `📞 Зворотній дзвінок — ${site.siteName}`,
            subtitle: timestamp,
          },
          sections: [{ widgets }],
        },
      },
    ],
  };
}

/**
 * Build Google Chat card for order notification
 */
export function buildOrderCard(
  site: SiteInfo,
  orderNumber: string,
  data: OrderData
): Record<string, unknown> {
  const itemsText = data.items
    .map((item) => `📦 ${item.name} (${item.quantity} шт.)`)
    .join("\n");

  const subtotalText = data.subtotalUsdCents
    ? `$${(data.subtotalUsdCents / 100).toFixed(2)}`
    : "";

  const customerWidgets: unknown[] = [
    {
      decoratedText: {
        topLabel: "Ім'я",
        text: data.customer.name,
        icon: { knownIcon: "PERSON" },
      },
    },
    {
      decoratedText: {
        topLabel: "Телефон",
        text: data.customer.phone,
        icon: { knownIcon: "PHONE" },
        button: {
          text: "Подзвонити",
          onClick: {
            openLink: {
              url: `tel:${data.customer.phone.replace(/\s/g, "")}`,
            },
          },
        },
      },
    },
  ];

  const sections: unknown[] = [
    { header: "Клієнт", widgets: customerWidgets },
    { header: "Товари", widgets: [{ textParagraph: { text: itemsText } }] },
  ];

  if (data.delivery?.city) {
    sections.push({
      header: "Доставка",
      widgets: [
        {
          textParagraph: {
            text: [data.delivery.city, data.delivery.warehouse]
              .filter(Boolean)
              .join(", "),
          },
        },
      ],
    });
  }

  sections.push({
    widgets: [{ decoratedText: { topLabel: "Сайт", text: site.domain } }],
  });

  return {
    cardsV2: [
      {
        cardId: `order-${orderNumber}`,
        card: {
          header: {
            title: `🛒 Замовлення ${orderNumber} — ${site.siteName}`,
            subtitle: subtotalText,
          },
          sections,
        },
      },
    ],
  };
}

/**
 * Send notification to Google Chat webhook
 */
export async function sendGoogleChatNotification(
  payload: Record<string, unknown>,
  webhookUrl: string
): Promise<boolean> {
  if (!webhookUrl) {
    console.error("GOOGLE_CHAT_WEBHOOK_URL not configured");
    return false;
  }
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      console.error("Google Chat webhook failed:", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error sending to Google Chat:", error);
    return false;
  }
}
