// Firebase imports
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Local imports
import { PriceConfig } from '../model/contracts/price-config.model';
import { PriceCalcReqs } from '../model/contracts/price-calc-reqs.model';

import { calculatePrice } from '../model/calculate-price';

export const calculatePriceOfProspect =
  // Registration
  functions.firestore
           .document('prospects/{prospectId}')
           .onUpdate(async (change, context) => {

      // Data
      const prospectData = change.after.data();

      // Guard
      if (prospectData.noTeachers && prospectData.noStudents) {

        console.log(`Detected change in Prospect. Calculating Price for prospect ${change.after.data().id}`);

        // Connect to Database
        const store = admin.firestore();

        // Get Database Configuration
        const pricingConfig = await store.collection('config').doc('pricing').get();

        // Calculate Pricing
        const price = calculatePrice(prospectData as PriceCalcReqs,  pricingConfig.data() as PriceConfig);

        // Final Action
        return change.after.ref.set({ price }, { merge: true });
      }
      else {
        console.log(`Detected change in Prospect. Waiting for noTeachers and noStudents to calculate price.`);
        return null;
      }
    });

