import { RequestHandler } from "express";
import { client, indexName } from "../config";

import { match } from "../services/search.service";

export const getIndices: RequestHandler = async (req, res, next) => {
  try {
    console.log(`Getting existing indices:`);
    const response = await client.cat.indices({ format: "json" });
    return res.status(200).json({ message: "Indices fetched", response });
  } catch (error) {
    console.log(error);
  }
};

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
