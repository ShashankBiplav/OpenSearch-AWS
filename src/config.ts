import dotenv from "dotenv";

import { Client } from "@opensearch-project/opensearch";

export const client = new Client({
  node: process.env.SERVICE_URI,
});

export const indexName = "recipes";
