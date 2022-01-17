/**
 * Logging result body, used in callbacks.
 */
export const logBody = (error: any, result: any) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result.body);
  }
};

/**
 * Parsing and logging list of titles from the result, used in callbacks.
 */
export const logTitles = (error: any, result: any) => {
  if (error) {
    console.error(error);
  } else {
    const hits = result.body.hits.hits;
    console.log(hits.map((hit: any) => hit._source.title));
  }
};

export const logAggs = (field: any, error: any, result: any) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result.body.aggregations[field]);
  }
};

export const logResultBody = (error: any, result: any) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result.body);
  }
};
