import { usePDP } from "@faststore/core";
import { Button as UIButton, ButtonProps } from "@faststore/ui";

export function BuyButtonWithDetails(props: ButtonProps) {
  // FastStore exposes the data that comes from FastStore API along with FastStore API Extensions inside a provider. Use the usePDP hook to access data from a Product Detail Page (PDP). Refer to: https://developers.vtex.com/docs/guides/faststore/api-extensions-consuming-api-extensions
  const context = usePDP();

  console.log("🚀 ~ PDP context:", context);

  // We will show one of the installments option available if the product has interest free
  return (
    <section>
      <UIButton {...props} variant="primary">
        New Buy Button
      </UIButton>
    </section>
  );
}

export default BuyButtonWithDetails;
