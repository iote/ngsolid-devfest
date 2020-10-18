import { FirestoreUpdateRegistrar, GCFunction, GUARDS, RestRegistrar } from "@ngfire/functions";
import { environment } from 'apps/ngsolid-devfest-functions/src/environments/environment.prod';

import { PriceCalcReqs } from '../../../model/contracts/price-calc-reqs.model';

import { CalculatePriceHandler } from './handlers/calculate-price.handler';

export const onHttpCalculatePrice =
                new GCFunction<PriceCalcReqs, number>(
                    'onHttpCalculatePrice',
                    // Only thing needed to turn this function into HTTP endpoint
                    new RestRegistrar(),
                    [new GUARDS.DataGuard(['noItemsCat1', 'noItemsCat2'])],
                    new CalculatePriceHandler(),
                    environment
                  );
