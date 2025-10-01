import { getOverriddenSection, ProductDetailsSection } from "@faststore/core";
import { BuyButtonWithDetails } from "../../BuyButtonWithDetails/BuyButtonWithDetails";
import { ProductSEO } from "../../ProductSEO";

const CustomProductDetails = getOverriddenSection({
  Section: ProductDetailsSection,
  components: {
    BuyButton: { Component: BuyButtonWithDetails },
    __experimentalShippingSimulation: { Component: ProductSEO },
  },
});

export default CustomProductDetails;
