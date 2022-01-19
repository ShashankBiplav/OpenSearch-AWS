import { client, scriptsIndex } from "../config";

export const getAllScripts = async () => {
  return await client.search({
    index: scriptsIndex,
  });
};

export const getPaginatedScripts = async (
  from: number,
  size: number,
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
    index: scriptsIndex,
    body,
    from: from,
    size: size,
  });
};

export const getDateFilteredPaginatedScripts = async (
  from: number,
  size: number,
  metric: string,
  field: string,
  startingDate: string,
  endingDate: string,
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
      bool: {
        //AND of two conditions (must)
        //OR of tow conditions (should)
        must: [
          {
            range: {
              prescriptionDate: {
                gte: startingDate,
                lte: endingDate,
              },
            },
          },
          {
            match: {
              [matchField]: matchValue,
            },
          },
        ],
      },
    },
  };
  return await client.search({
    index: scriptsIndex,
    body,
    from: from,
    size: size,
  });
};
