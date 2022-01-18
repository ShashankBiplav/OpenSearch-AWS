interface IScriptItems {
  drugCode?: string;
  drugName?: string;
}

export interface IScriptSearch {
  //used when record is stored in OpenSearch
  id?: string;
  nhsNumber?: string;
  fridgeItem?: number;
  cdItem?: number;
  patientName?: string;
  scriptItems?: number;
  items?: IScriptItems;
}

export interface IScriptResult {
  scripts?: IScriptSearch[];
}

export const scripts: IScriptSearch[] = [
  {
    id: "abc1",
    nhsNumber: "nhs1",
    fridgeItem: 101,
    cdItem: 1,
    patientName: "Shashank Biplav",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc2",
    nhsNumber: "nhs2",
    fridgeItem: 102,
    cdItem: 2,
    patientName: "Abcdefghig",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc3",
    nhsNumber: "nhs13",
    fridgeItem: 1003,
    cdItem: 13,
    patientName: "Shashank Biplav3",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc4",
    nhsNumber: "nhs4",
    fridgeItem: 104,
    cdItem: 4,
    patientName: "Shashank Bipla4",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc5",
    nhsNumber: "nhs5",
    fridgeItem: 105,
    cdItem: 5,
    patientName: "Shashank Bipla5",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc6",
    nhsNumber: "nhs6",
    fridgeItem: 106,
    cdItem: 6,
    patientName: "Shashank Bipla6",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc7",
    nhsNumber: "nhs7",
    fridgeItem: 1007,
    cdItem: 7,
    patientName: "Shashank Bipla7",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc8",
    nhsNumber: "nhs8",
    fridgeItem: 108,
    cdItem: 8,
    patientName: "Shashank Bipla8",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc9",
    nhsNumber: "nhs9",
    fridgeItem: 109,
    cdItem: 9,
    patientName: "Shashank Bipla9",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc10",
    nhsNumber: "nhs10",
    fridgeItem: 1010,
    cdItem: 10,
    patientName: "Shashank Bipla10",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc11",
    nhsNumber: "nhs11",
    fridgeItem: 1011,
    cdItem: 11,
    patientName: "Shashank Bipla11",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc12",
    nhsNumber: "nhs12",
    fridgeItem: 1002,
    cdItem: 12,
    patientName: "Shashank Biplav2",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc13",
    nhsNumber: "nhs13",
    fridgeItem: 1013,
    cdItem: 13,
    patientName: "Shashank Bipla13",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc14",
    nhsNumber: "nhs14",
    fridgeItem: 1014,
    cdItem: 14,
    patientName: "Shashank Bipla14",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc15",
    nhsNumber: "nhs15",
    fridgeItem: 1015,
    cdItem: 15,
    patientName: "Shashank Bipla15",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc16",
    nhsNumber: "nhs16",
    fridgeItem: 1016,
    cdItem: 16,
    patientName: "Shashank Bipla16",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc17",
    nhsNumber: "nhs17",
    fridgeItem: 1017,
    cdItem: 17,
    patientName: "Shashank Bipla17",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc18",
    nhsNumber: "nhs18",
    fridgeItem: 1018,
    cdItem: 18,
    patientName: "Shashank Bipla18",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc19",
    nhsNumber: "nhs19",
    fridgeItem: 1019,
    cdItem: 19,
    patientName: "Shashank Bipla19",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc20",
    nhsNumber: "nhs20",
    fridgeItem: 1020,
    cdItem: 20,
    patientName: "Shashank Bipla20",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
  {
    id: "abc21",
    nhsNumber: "nhs21",
    fridgeItem: 1021,
    cdItem: 21,
    patientName: "Shashank Bipla21",
    scriptItems: 3,
    items: {
      drugCode: "drgCd1",
      drugName: "Caffiene",
    },
  },
];
