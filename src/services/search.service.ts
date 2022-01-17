import { client, indexName as index } from "../config";

/**
 * Finding matches sorted by relevance (full-text query)
 * search match title "soups with beer and garlic"
 * search match title "pizza salad and cheese"
 */
export const match = async (field: string, query: string) => {
  const body = {
    query: {
      match: {
        [field]: {
          query,
        },
      },
    },
  };
  return await client.search({
    index,
    body,
  });
};

/**
 * Matching a phrase (full-text query)
 * search phrase title 'pasta with cheese'
 * search phrase title 'milk chocolate cake'
 */
export const phrase = async (field: string, query: string, slop: number) => {
  const body = {
    query: {
      match_phrase: {
        [field]: {
          query,
          slop,
        },
      },
    },
  };
  return await client.search({
    index,
    body,
  });
};

/**
 * Using special operators within a query string and a size parameter (full-text query)
 * search queryString title '+(dessert | cake) -garlic  (mango | caramel | cinnamon)'
 * search queryString title '+(salad | soup) -broccoli  (tomato | apple)'
 */
export const queryString = async (field: string, query: string) => {
  const body = {
    query: {
      query_string: {
        default_field: field,
        query,
      },
    },
  };
  return await client.search({
    index,
    body,
  });
};

/**
 * Searching for exact matches of a value in a field (term-level query)
 * search term sodium 0
 */
export const term = async (field: string, value: any) => {
  const body = {
    query: {
      term: {
        [field]: value,
      },
    },
  };
  return await client.search({
    index,
    body,
  });
};

/**
 * Searching for a range of values in a field (term-level query)
 * gt (greater than)
 * gte (greater than or equal to)
 * lt (less than)
 * lte (less than or equal to)
 * search range sodium 0 100
 */
export const range = async (field: string, gte: number, lte: number) => {
  const body = {
    query: {
      range: {
        [field]: {
          gte,
          lte,
        },
      },
    },
  };
  return await client.search({
    index,
    body,
  });
};

/**
 * Combining several queries together (boolean query)
 * search boolean
 */
export const booleanTermQuery = async () => {
  const body = {
    query: {
      bool: {
        filter: [{ range: { rating: { gte: 4 } } }],
        must: [
          { match: { categories: "Quick & Easy" } },
          { match: { title: "beer" } },
        ],
        should: [{ match: { categories: "Cocktails" } }],
        must_not: { match: { ingredients: "garlic" } },
      },
    },
  };
  return await client.search({
    index,
    body,
  });
};
