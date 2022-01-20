import { RequestHandler } from "express";
import { client, recipesIndex } from "../config";

import {
  booleanTermQuery,
  match,
  phrase,
  queryString,
  range,
  term,
} from "../services/search.service";

import {
  dateHistogramAggr,
  histogramAggr,
  metricAggr,
  paginatedAggr,
  simpleAggr,
} from "../services/aggregate.service";

import { createScriptIndexService } from "../services/create_script_index.service";
import {
  getAllScripts,
  getDateFilteredPaginatedScripts,
  getPaginatedScripts,
  updateScript,
} from "../services/script.search.service";
import { seedScriptsToOpenSearch } from "../services/seed.scripts.service";

/**
 * Creates the scripts index
 */
export const createScriptsIndex: RequestHandler = async (req, res, next) => {
  try {
    await createScriptIndexService();
    res.status(200).json({ message: "Scripts index has been successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const seedScripts: RequestHandler = async (req, res, next) => {
  try {
    const response = await seedScriptsToOpenSearch();
    return res.status(200).json({ message: "Seeding succeeded", response });
  } catch (error) {
    console.log(error);
  }
};

export const getAllScriptsSearch: RequestHandler = async (req, res, next) => {
  try {
    const response = await getAllScripts();
    return res.status(200).json({
      message: "All scripts fetched",
      scripts: response,
      // scripts: response.body.hits.hits,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getpaginatedScriptsSearch: RequestHandler = async (
  req,
  res,
  next
) => {
  const {
    from,
    size,
    metric,
    field,
    matchField,
    matchValue,
  }: {
    from: number;
    size: number;
    metric: string;
    field: string;
    matchField: string;
    matchValue: string;
  } = req.body;
  try {
    const scripts = await getPaginatedScripts(
      from,
      size,
      metric,
      field,
      matchField,
      matchValue
    );
    return res.status(200).json({
      message: `All paginated scripts fetched matching conditions: from: ${from},size: ${size},metric: ${metric},field: ${field},matchField: ${matchField},matchValue: ${matchValue}`,
      scripts,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @returns all the available indices
 */
export const getIndices: RequestHandler = async (req, res, next) => {
  try {
    console.log(`Getting existing indices:`);
    const response = await client.cat.indices({ format: "json" });
    return res.status(200).json({ message: "Indices fetched", response });
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @returns the mapping of the index
 */

export const getMapping: RequestHandler = async (req, res, next) => {
  try {
    console.log(`Retrieving mapping for the index with name ${recipesIndex}`);

    const response = await client.indices.getMapping({ index: recipesIndex });
    return res.status(200).json({
      message: `Retrieving mapping for the index with name ${recipesIndex}`,
      response: response.body.recipes.mappings.properties,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * Full text Query
 * @returns matches sorted by relevance
 */
export const matchQuery: RequestHandler = async (req, res, next) => {
  const { field, query }: { field: string; query: string } = req.body;
  try {
    const response = await match(field, query);
    return res.status(200).json({
      message: `Search results for field:${field} & query:${query}`,
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * full text query
 * @returns a phrase match
 */
export const phraseQuery: RequestHandler = async (req, res, next) => {
  const { field, query, slop }: { field: string; query: string; slop: number } =
    req.body;
  try {
    const response = await phrase(field, query, slop);
    return res.status(200).json({
      message: `Search results for field:${field} & query:${query} & slop:${slop}`,
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Full text query
 * Use special operators in the query string
 * example: +(salad | soup) -broccoli  (tomato | apple)'
 * @returns results based on queryString
 */
export const queryStrQuery: RequestHandler = async (req, res, next) => {
  const { field, query }: { field: string; query: string } = req.body;
  try {
    const response = await queryString(field, query);
    return res.status(200).json({
      message: `Search results for field:${field} & queryString:${query}`,
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Term level query
 * @returns the exact mateches of a value in a field
 */
export const termQuery: RequestHandler = async (req, res, next) => {
  const { field, value }: { field: string; value: any } = req.body;
  try {
    const response = await term(field, value);
    return res.status(200).json({
      message: `Search results for field:${field} & value:${value}`,
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Term level Query
 * @returns the search results for a range of values in a field
 */
export const rangeQuery: RequestHandler = async (req, res, next) => {
  const { field, gte, lte }: { field: string; gte: number; lte: number } =
    req.body;
  try {
    const response = await range(field, gte, lte);
    return res.status(200).json({
      message: `Search results for field:${field} & range: gte${gte} , lte:${lte}`,
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Combines several queries together
 * @returns the search results of boolean query
 */
export const booleanQuery: RequestHandler = async (req, res, next) => {
  try {
    const response = await booleanTermQuery();
    return res.status(200).json({
      message: `Search results for boolean query`,
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * metric aggregator
 * @returns
 */
export const metricAggregator: RequestHandler = async (req, res, next) => {
  const {
    metric,
    field,
    matchField,
    matchValue,
  }: {
    metric: string;
    field: string;
    matchField: string;
    matchValue: string;
  } = req.body;
  try {
    const response = await metricAggr(metric, field, matchField, matchValue);
    return res.status(200).json({
      message: `Aggregation results`,
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * histogram aggregator
 */
export const histogramAggregator: RequestHandler = async (req, res, next) => {
  const { field, interval }: { field: string; interval: number } = req.body;
  try {
    const response = await histogramAggr(field, interval);
    return res.status(200).json({
      message: `Aggregation results for histogram aggregator`,
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * date histogram aggregator
 */
export const dateHistogramAggregator: RequestHandler = async (
  req,
  res,
  next
) => {
  const { field, interval }: { field: string; interval: number } = req.body;
  try {
    const response = await dateHistogramAggr(field, interval);
    return res.status(200).json({
      message: `Aggregation results for date histogram aggregator`,
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Paginated Aggregator
 * @returns the filtered paginated content
 */
export const paginatedAggregator: RequestHandler = async (req, res, next) => {
  const {
    from,
    size,
    metric,
    field,
    matchField,
    matchValue,
  }: {
    from: number;
    size: number;
    metric: string;
    field: string;
    matchField: string;
    matchValue: string;
  } = req.body;
  try {
    const response = await paginatedAggr(
      from,
      size,
      metric,
      field,
      matchField,
      matchValue
    );
    return res.status(200).json({
      message: `Aggregation results for paginated aggregator`,
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Simple Aggregator that returns only the aggregation results
 * @returns only the aggregation results not the amount of hits
 */
export const simpleAggregator: RequestHandler = async (req, res, next) => {
  const {
    metric,
    field,
    matchField,
    matchValue,
  }: {
    metric: string;
    field: string;
    matchField: string;
    matchValue: string;
  } = req.body;
  try {
    const response = await simpleAggr(metric, field, matchField, matchValue);
    return res.status(200).json({
      message: `Aggregation results for simple aggregator`,
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPaginatedBooleanFilteredScripts: RequestHandler = async (
  req,
  res,
  next
) => {
  const {
    from,
    size,
    metric,
    field,
    startingDate,
    endingDate,
    matchField,
    matchValue,
  }: {
    from: number;
    size: number;
    metric: string;
    field: string;
    startingDate: string;
    endingDate: string;
    matchField: string;
    matchValue: string;
  } = req.body;
  try {
    const response = await getDateFilteredPaginatedScripts(
      from,
      size,
      metric,
      field,
      startingDate,
      endingDate,
      matchField,
      matchValue
    );
    return res.status(200).json({
      message: `All paginated scripts fetched matching conditions: from: ${from},size: ${size},metric: ${metric},field: ${field},startingDate: ${startingDate}, endingDate: ${endingDate}, matchField: ${matchField},matchValue: ${matchValue}`,
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Update a document in a given index
 * @returns the response data if document update succeeds
 */
export const updateScriptDocument: RequestHandler = async (req, res, next) => {
  const { id, body }: { id: string; body: any } = req.body;
  try {
    const response = await updateScript(id, body);
    return res.status(201).json({
      message: `Document with id: ${id} updated successfully`,
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * deletes the given index
 */
export const deleteIndex: RequestHandler = async (req, res, next) => {
  try {
    const { index }: { index: string } = req.body;
    const response = await client.indices.delete({
      index: index,
    });
    return res.status(200).json({
      message: `Deleted the index: ${index} successfully`,
      response,
    });
  } catch (error) {
    console.log(error);
  }
};
