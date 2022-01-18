import dotenv from "dotenv";

dotenv.config();

import { Client } from "@opensearch-project/opensearch";

export const client = new Client({
  node: process.env.SERVICE_URI,
});

export const recipesIndex = "recipes";
export const scriptsIndex = "scripts";
