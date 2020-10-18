import { PriceCalcReqs } from './model/price-calc-reqs.model';
import { PriceConfig } from './model/price-config.model';

export function calculatePrice(vars: PriceCalcReqs, pricingConfig: PriceConfig)
{
  const categoryConfig = pricingConfig.categories;

  // Step 1: Round off to categories
  const noTeachers = Math.ceil(vars.noTeachers / categoryConfig.teachersPerCat) * categoryConfig.teachersPerCat;
  const noStudents = Math.ceil(vars.noStudents / categoryConfig.studentsPerCat) * categoryConfig.studentsPerCat;

  const operations = pricingConfig.operations;
  // Step 2: Calc needed ETA/ETF
  const noEtf = Math.ceil(noTeachers / operations.teachersPerEtf);
  const noEta = Math.ceil(noStudents / operations.studentsPerEta);

  const studentResources = pricingConfig.studentResources;
  const teacherResources = pricingConfig.teacherResources;
  // Step 3: Calc the individual costs bound to the no students/teachers/eta/etf variables
  const etaCost = noEta * 4 * (operations.etaCostPerM + operations.tabletRentPerM + operations.internetPerM);
  const studentCost = noStudents * (studentResources.classMaterialsPerT + studentResources.softwarePerT);
  // Travel every two weeks
  const etfCost = noEtf * 4 * (operations.etfCostPerM + (2 * operations.etfTravelCost));
  const teacherCost = noTeachers * teacherResources.trainingMaterialsPerT;

  // Step 4: Calc cost
  const cost = (etaCost + studentCost + etfCost + teacherCost + operations.regionalContrPerT);
  const royalties = cost * (pricingConfig.config.r / 100);

  // Step 5: Calc margin
  const price = (cost + royalties) * (1 + (pricingConfig.config.m / 100));

  return Math.ceil(price / pricingConfig.rounding.price) * pricingConfig.rounding.price;

}
