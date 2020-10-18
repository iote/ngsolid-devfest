import { FirestoreUpdateRegistrar, GCFunction, GUARDS } from "@ngfire/functions";
import { environment } from 'apps/ngsolid-devfest-functions/src/environments/environment.prod';

import { PriceCalcReqs } from '../../../model/contracts/price-calc-reqs.model';

import { CalculatePriceHandler } from './handlers/calculate-price.handler';

export const onUpdateCalculatePrice =
                // New Function / Takes care of all registration onto Google Cloud
                new GCFunction<PriceCalcReqs, number>(
                    // Function name
                    'onUpdateCalculatePrice',
                    // Function register (When / Scheduling)
                    new FirestoreUpdateRegistrar('prospects/{prospectId}'),
                    // Guards -> Required fields to be in data before executing
                    //           Guards can be anything. They are just conditions that need to be true
                    //           the functions can run e.g. UserIsLoggedInGuard
                    [new GUARDS.DataGuard(['noItemsCat1', 'noItemsCat2'])],
                    // Handler -> Logic Layer!
                    new CalculatePriceHandler(),
                    environment
                  );
