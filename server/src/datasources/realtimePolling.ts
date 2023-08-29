async function fetchFromAT(url) {
  const res = await fetch(url, {
    headers: { "Ocp-Apim-Subscription-Key": env.AUCKLAND_TRANSPORT_KEY },
  });
  if (res.status !== 200) {
    throw new Error(`Got status ${res.status} from ${url}`);
  }
  const json = await res.json;
  return json.response.entity;
}

export async function checkForRealtimeUpdates() {
  try {
  } catch (err) {
    console.error("Error checking realtime updates", err);
  }
}
