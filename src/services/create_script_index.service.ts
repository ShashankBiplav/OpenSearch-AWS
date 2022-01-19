import { client, scriptsIndex } from "../config";

export const createScriptIndexService = async () => {
  const indexVersion = `${scriptsIndex}_v1`;
  try {
    await client.indices.delete({ index: scriptsIndex }, { ignore: [404] });
  } catch (error) {
    console.log(`Error deleting index:${scriptsIndex} . ${error}`);
  }
  try {
    await client.indices.delete({ index: indexVersion }, { ignore: [404] });
  } catch (error) {
    console.log(`Error deleting index:${scriptsIndex} . ${error}`);
  }
  console.log(`Creating scripts index as: ${indexVersion}`);

  await client.indices.create({
    index: indexVersion,
    body: {
      mappings: {
        properties: {
          id: { type: "text" },
          nhsNumber: { type: "text" },
          fridgeItem: { type: "long" },
          cdItem: { type: "long" },
          patientName: { type: "text" },
          scriptItems: { type: "long" },
          prescriptionStatus: { type: "text" },
          prescriptionDate: { type: "date" },
          items: {
            type: "nested",
            properties: {
              drugCode: { type: "text" },
              drugName: { type: "text" },
            },
          },
        },
      },
    },
  });
  console.log(`Creating scripts index alias: ${scriptsIndex}`);
  await client.indices.putAlias({ index: indexVersion, name: scriptsIndex });
  console.log(`Finished creating scripts index`);
};
