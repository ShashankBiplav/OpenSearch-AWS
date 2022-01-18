import { client, scriptsIndex } from "../config";
import { IScriptSearch, scripts } from "../models";

export const seedScriptsToOpenSearch = async () => {
  //adding {_index: "string"} property to every object
  const body = scripts.flatMap((doc) => [
    { index: { _index: scriptsIndex } },
    doc,
  ]);
  console.log("Seeding scripts");

  const response = await client.bulk({
    refresh: true,
    body,
  });
  console.log("Seeding Succeeded");
  return response;
};
