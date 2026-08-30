import { createHash } from "node:crypto";

type LeadPayload = Record<string, unknown>;

const DEDUPE_WINDOW_MS = 30_000;

declare global {
  var __redPowerLeadCache: Map<string, number> | undefined;
}

function getCache() {
  if (!global.__redPowerLeadCache) {
    global.__redPowerLeadCache = new Map<string, number>();
  }

  return global.__redPowerLeadCache;
}

export function isDuplicateLead(keyParts: string[]) {
  const cache = getCache();
  const now = Date.now();
  const key = createHash("sha1").update(keyParts.join("|")).digest("hex");
  const previous = cache.get(key);

  for (const [entry, timestamp] of cache.entries()) {
    if (now - timestamp > DEDUPE_WINDOW_MS) {
      cache.delete(entry);
    }
  }

  if (previous && now - previous < DEDUPE_WINDOW_MS) {
    return true;
  }

  cache.set(key, now);
  return false;
}

export async function deliverLead(
  webhookUrl: string | undefined,
  payload: LeadPayload
) {
  if (!webhookUrl) {
    return { delivered: false as const, mode: "local-preview" as const };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook delivery failed with status ${response.status}`);
  }

  return { delivered: true as const, mode: "webhook" as const };
}
