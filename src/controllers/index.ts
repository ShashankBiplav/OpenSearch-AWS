import { RequestHandler } from "express";
import { client, indexName } from "../config";

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
} from "../services/aggregate.service";

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
    console.log(`Retrieving mapping for the index with name ${indexName}`);

    const response = await client.indices.getMapping({ index: indexName });
    return res.status(200).json({
      message: `Retrieving mapping for the index with name ${indexName}`,
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
 * deletes the given index
 */
export const deleteIndex: RequestHandler = async (req, res, next) => {
  try {
    const { index }: { index: string } = req.body;
    const response = await client.indices.delete({
      index: index || indexName,
    });
    return res.status(200).json({
      message: `Deleted the index: ${index} successfully`,
      response,
    });
  } catch (error) {
    console.log(error);
  }
};
