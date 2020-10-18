import { HandlerTools } from '@iote/cqrs';
import { FunctionContext, FunctionHandler } from '@ngfire/functions';

import { PriceCalcReqs  } from '../../../../model/contracts/price-calc-reqs.model';
import { PriceConfig    } from '../../../../model/contracts/price-config.model';
import { calculatePrice } from '../../../../model/calculate-price';

export class CalculatePriceHandler extends FunctionHandler<PriceCalcReqs, number>
{

  public async execute(data: PriceCalcReqs, context: FunctionContext, tools: HandlerTools): Promise<number>
  {
    // 1) Our own data layer, not coupled to a specific database.
    const pricingRepo = tools.getRepository<PriceConfig>('config');

    const config = await pricingRepo.getDocumentById('pricing');

    return calculatePrice(data, config);
  }

}
