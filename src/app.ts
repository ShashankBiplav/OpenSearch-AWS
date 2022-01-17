import express, { Application, RequestHandler } from "express";

import { Client } from "@opensearch-project/opensearch";

import routes from "./routes";

const app: Application = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", routes);

app.listen(3000, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
