import { client, indexName as index } from "../config";
import { logAggs } from "../helpers/helpers";

/**
 * Get metric aggregations for the field
 * Examples: stats, extended_stats, percentiles, terms
 * example: avg rating
 */
export const metricAggr = async (
  metric: string,
  field: string,
  matchField: string,
  matchValue: string
) => {
  const body = {
    aggs: {
      [`aggs-for-${field}`]: {
        //aggregation name
        [metric]: {
          // aggregation type
          field,
        },
      },
    },
    query: {
      match: {
        [matchField]: matchValue,
      },
    },
  };
  return await client.search({
    index,
    body,
    size: 0, //not interested in the amount of hits
  });
};

/**
 * Histogram with interval
 * rating 1
 */
export const histogramAggr = async (field: string, interval: number) => {
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
 * date year
 */
export const dateHistogramAggr = (field: string, interval: any) => {
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
