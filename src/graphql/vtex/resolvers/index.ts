import { default as StoreProductResolver } from "./product";
import { default as OrderSummaryResolver } from "./orderSummary";

const resolvers = {
  ...StoreProductResolver,
  // Each resolver file contributes its own root types. Spreading two files
  // that both define `Query` would overwrite it, so merge the roots instead.
  Query: {
    ...OrderSummaryResolver.Query,
  },
};

export default resolvers;
