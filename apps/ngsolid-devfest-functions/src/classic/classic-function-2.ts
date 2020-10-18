// Firebase imports
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Local imports
import { PriceConfig } from './model/price-config.model';
import { calculatePrice } from './calculate-price';

export const calcPriceHttp =
  // Registration
  functions.https.onCall(
    // Data
    async (data, context) => {

      // Guard
      if (data.noTeachers && data.noStudents)
      {
        console.log(`Request for Price Calculation. Calculating Base Price for data.`);

        // Connect to Database
        const store = admin.firestore();

        // Get Database Configuration
        const pricingConfig = await store.collection('config').doc('pricing').get();

        // Final action
        return { price: calculatePrice(data, pricingConfig.data() as PriceConfig) }
      }
      else {
        console.log(`Request for Price Calculation. Insufficient data since noTeachers or noStudents is null.`);

        return new Error('Insufficient data.');
      }
    });


