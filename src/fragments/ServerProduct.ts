// This file name should match the name of the query you want to extend.

import { gql } from "@faststore/core/api";

// Define the GraphQL fragment corresponding to the new fields you want to retrieve

export const fragment = gql(`
  fragment ServerProduct on Query {
    product(locator: $locator) {
      availableInstallments {
        installmentPaymentSystemName
        installmentValue
        installmentInterest
        installmentNumber
      }
    }
  }
`);

// Refer to docs to see the list of FS Extendable queries: https://developers.vtex.com/docs/guides/faststore/api-extensions-extending-queries-using-fragments
