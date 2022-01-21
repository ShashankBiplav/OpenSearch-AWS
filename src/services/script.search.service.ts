import { client, scriptsIndex } from "../config";
import { I2ScriptSearch } from "../models";

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

export const updateScript = async (id: string, body: any) => {
  return await client.update({
    id,
    index: scriptsIndex,
    body,
  });
};

export const customSearch = async () => {
  const expiryDate = new Date();
  const prescriptionDate = new Date();
  let reqBody = {};
  const body: I2ScriptSearch = {
    limit: 2,
    expiryDate: {
      to: "2022-01-18T09:09:57.390Z",
      from: "2022-01-11T09:09:57.390Z",
    },
    showScriptForLastXDays: 7,
    prescriptionStatus: [0, 1, 2],
  };
  if (
    body.prescriptionStatus ||
    body.expiringInNextXDays ||
    body.expiryDate ||
    body.showScriptDate ||
    body.showScriptForLastXDays
  ) {
    const shouldMatch: Object[] = [];
    const mustMatch: Object[] = [];
    if (body.prescriptionStatus && body.prescriptionStatus.length > 0) {
      body.prescriptionStatus.forEach((element) => {
        shouldMatch.push({
          match: {
            prescriptionStatus: element,
          },
        });
      });
    }
    if (body.expiringInNextXDays && !body.expiryDate) {
      mustMatch.push({
        range: {
          prescriptionDate: {
            gte: expiryDate.toISOString(),
            lte: expiryDate.setDate(
              expiryDate.getDate() + body.expiringInNextXDays
            ),
          },
        },
      });
    }
    if (body.expiryDate && !body.expiringInNextXDays) {
      mustMatch.push({
        range: {
          prescriptionDate: {
            gte: body.expiryDate.from,
            lte: body.expiryDate.to,
          },
        },
      });
    }
    if (body.showScriptDate && !body.showScriptForLastXDays) {
      mustMatch.push({
        range: {
          prescriptionDate: {
            gte: body.showScriptDate.from,
            lte: body.showScriptDate.to,
          },
        },
      });
    }
    if (body.showScriptForLastXDays && !body.showScriptDate) {
      prescriptionDate.setDate(
        prescriptionDate.getDate() - body.showScriptForLastXDays
      );
      mustMatch.push({
        range: {
          prescriptionDate: {
            gte: prescriptionDate.toISOString(),
            lte: new Date().toISOString(),
          },
        },
      });
    }
    reqBody = {
      query: {
        bool: {
          should: shouldMatch,
          must: mustMatch,
        },
      },
    };
  }

  return await client.search({
    index: scriptsIndex,
    body: reqBody,
    from: 0,
    size: 5,
  });
};
