import express from "express";

import {
  getIndices,
  getMapping,
  deleteIndex,
  matchQuery,
  phraseQuery,
  queryStrQuery,
  termQuery,
  rangeQuery,
  booleanQuery,
  metricAggregator,
  histogramAggregator,
} from "../controllers";

const router = express.Router();

router.get("/indices", getIndices);

router.get("/mapping", getMapping);

router.post("/match-query", matchQuery);

router.post("/phrase-query", phraseQuery);

router.post("/query-string", queryStrQuery);

router.post("/term-query", termQuery);

router.post("/range-query", rangeQuery);

router.post("/boolean-query", booleanQuery);

router.post("/metric-aggregator", metricAggregator);

router.post("/histogram-aggregator", histogramAggregator);

router.post("/date-histogram-aggregator", metricAggregator);

router.post("/delete", deleteIndex);

export default router;
