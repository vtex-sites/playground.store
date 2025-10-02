import { getOverriddenSection, ProductDetailsSection } from "@faststore/core";
import { BuyButtonWithDetails } from "../../BuyButtonWithDetails/BuyButtonWithDetails";
import { CustomProductSEO } from "../../ProductSEO";

const CustomProductDetails = getOverriddenSection({
  Section: ProductDetailsSection,
  components: {
    BuyButton: { Component: BuyButtonWithDetails },
    __experimentalShippingSimulation: { Component: CustomProductSEO },
  },
});

export default CustomProductDetails;
