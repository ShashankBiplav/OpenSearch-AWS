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
  paginatedAggregator,
  simpleAggregator,
  createScriptsIndex,
  seedScripts,
  getAllScriptsSearch,
  getpaginatedScriptsSearch,
  getPaginatedBooleanFilteredScripts,
  updateScriptDocument,
  customQuery,
} from "../controllers";

const router = express.Router();

router.get("/indices", getIndices);

router.get("/mapping", getMapping);

router.get("/create-scripts-index", createScriptsIndex);

router.get("/seed-scripts", seedScripts);

router.get("/all-scripts", getAllScriptsSearch);

router.post("/paginated-scripts", getpaginatedScriptsSearch);

router.post("/match-query", matchQuery);

router.post("/phrase-query", phraseQuery);

router.post("/query-string", queryStrQuery);

router.post("/term-query", termQuery);

router.post("/range-query", rangeQuery);

router.post("/boolean-query", booleanQuery);

router.post("/metric-aggregator", metricAggregator);

router.post("/histogram-aggregator", histogramAggregator);

router.post("/date-histogram-aggregator", metricAggregator);

router.post("/paginated-aggregator", paginatedAggregator);

router.post("/simple-aggregator", simpleAggregator);

router.post("/filter-scripts", getPaginatedBooleanFilteredScripts);

router.post("/update", updateScriptDocument);

router.post("/delete", deleteIndex);

router.post("/custom-query", customQuery);

export default router;
