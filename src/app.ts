import express, { Application, RequestHandler } from "express";

import { Client } from "@opensearch-project/opensearch";

const app: Application = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(3000, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
