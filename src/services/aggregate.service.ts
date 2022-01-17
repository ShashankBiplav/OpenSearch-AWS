import { client, indexName as index } from "../config";
import { logAggs } from "../helpers/helpers";

/**
 * Get metric aggregations for the field
 * Examples: stats, extended_stats, percentiles, terms
 * run-func aggregate metric avg rating
 */
export const metric = (metric: any, field: any) => {
  const body = {
    aggs: {
      [`aggs-for-${field}`]: {
        //aggs name
        [metric]: {
          // aggregation type
          field,
        },
      },
    },
    // query: {
    //     match: {
    //         [matchField]: matchValue
    //     }
    // },
  };
  client.search(
    {
      index,
      body,
      size: 0, // we're not interested in `hits`
    },
    logAggs.bind(this, `aggs-for-${field}`)
  );
};

/**
 * Histogram with interval
 * run-func aggregate histogram rating 1
 */
export const histogram = (field: string, interval: any) => {
  const body = {
    aggs: {
      [`aggs-for-${field}`]: {
        histogram: {
          // aggregation type
          field,
          interval,
        },
      },
    },
  };
  client.search(
    {
      index,
      body,
      size: 0,
    },
    logAggs.bind(this, `aggs-for-${field}`)
  );
};

/**
 * Date histogram with interval
 * run-func aggregate dateHistogram date year
 */
export const dateHistogram = (field: string, interval: any) => {
  const body = {
    aggs: {
      [`aggs-for-${field}`]: {
        date_histogram: {
          field,
          interval,
        },
      },
    },
  };
  client.search(
    {
      index,
      body,
      size: 0,
    },
    logAggs.bind(this, `aggs-for-${field}`)
  );
};

/**
 * Date histogram with number of buckets
 * run-func aggregate autoDateHistogram date 3
 */
export const autoDateHistogram = (field: string, buckets: number) => {
  const body = {
    aggs: {
      [`aggs-for-${field}`]: {
        auto_date_histogram: {
          field,
          buckets,
        },
      },
    },
  };
  client.search(
    {
      index,
      body,
      size: 0,
    },
    logAggs.bind(this, `aggs-for-${field}`)
  );
};
