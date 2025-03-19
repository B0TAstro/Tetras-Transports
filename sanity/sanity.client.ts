// sanity/sanity.client.ts

import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: "yukqhttc",
  dataset: "production",
  apiVersion: "2025-03-17",
  useCdn: false,
};

const client = createClient(config);

export default client;