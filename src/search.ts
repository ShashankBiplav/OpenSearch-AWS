import { client, indexName as index } from "./config";
import { logTitles } from "./helpers";

/**
 * Finding matches sorted by relevance (full-text query)
 * search match title "soups with beer and garlic"
 * search match title "pizza salad and cheese"
 */
export const match = (field: string, query: any) => {
  const body = {
    query: {
      match: {
        [field]: {
          query,
        },
      },
    },
  };
  client.search(
    {
      index,
      body,
    },
    logTitles
  );
};

/**
 * Matching a phrase (full-text query)
 * search phrase title 'pasta with cheese'
 * search phrase title 'milk chocolate cake'
 */
export const phrase = (field: string, query: any, slop: any) => {
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
  client.search(
    {
      index,
      body,
    },
    logTitles
  );
};

/**
 * Using special operators within a query string and a size parameter (full-text query)
 * search queryString title '+(dessert | cake) -garlic  (mango | caramel | cinnamon)'
 * search queryString title '+(salad | soup) -broccoli  (tomato | apple)'
 */
export const queryString = (field: string, query: any) => {
  const body = {
    query: {
      query_string: {
        default_field: field,
        query,
      },
    },
  };
  client.search(
    {
      index,
      body,
    },
    logTitles
  );
};

/**
 * Searching for exact matches of a value in a field (term-level query)
 * search term sodium 0
 */
export const term = (field: string, value: any) => {
  const body = {
    query: {
      term: {
        [field]: value,
      },
    },
  };
  client.search(
    {
      index,
      body,
    },
    logTitles
  );
};

/**
 * Searching for a range of values in a field (term-level query)
 * gt (greater than)
 * gte (greater than or equal to)
 * lt (less than)
 * lte (less than or equal to)
 * search range sodium 0 100
 */
export const range = (field: string, gte: number, lte: number) => {
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
  client.search(
    {
      index,
      body,
    },
    logTitles
  );
};

/**
 * Combining several queries together (boolean query)
 * search boolean
 */
export const boolean = () => {
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
  client.search(
    {
      index,
      body,
    },
    logTitles
  );
};
