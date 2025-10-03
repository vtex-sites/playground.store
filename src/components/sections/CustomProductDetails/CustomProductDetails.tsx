import { getOverriddenSection, ProductDetailsSection } from "@faststore/core";
import { BuyButtonWithDetails } from "../../BuyButtonWithDetails/BuyButtonWithDetails";

const CustomProductDetails = getOverriddenSection({
  Section: ProductDetailsSection,
  components: {
    BuyButton: { Component: BuyButtonWithDetails },
  },
});

export default CustomProductDetails;
