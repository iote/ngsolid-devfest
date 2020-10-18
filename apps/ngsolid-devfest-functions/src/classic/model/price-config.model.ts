import { IObject } from "@iote/bricks";

export interface PriceConfig extends IObject
{
  config: {
    m: number;
    r: number;
  };

  categories: {
    studentsPerCat: number;
    teachersPerCat: number;
  };

  operations: {
    studentsPerEta: number;
    teachersPerEtf: number;

    etaCostPerM: number;
    etfCostPerM: number;
    internetPerM: number;
    tabletRentPerM: number;

    etfTravelCost: number;

    regionalContrPerT: number;
  };

  rounding: {
    price: number;
  };

  studentResources: {
    classMaterialsPerT: number;
    softwarePerT: number;
  };

  teacherResources: {
    trainingMaterialsPerT: number;
  };

}
