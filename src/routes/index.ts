import express from "express";

import {
  getIndices,
  getMapping,
  deleteIndex,
  matchQuery,
} from "../controllers";

const router = express.Router();

router.get("/indices", getIndices);

router.get("/mapping", getMapping);

router.post("/match-query", matchQuery);

router.post("/delete", deleteIndex);

export default router;
