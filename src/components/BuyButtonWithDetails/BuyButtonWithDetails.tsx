import { usePDP } from "@faststore/core";
import { ButtonProps, Button as UIButton } from "@faststore/ui";
import { priceFormatter } from "../../utils/priceFormatter";

import { useState } from "react";
import styles from "./buy-button-with-details.module.scss";

export function BuyButtonWithDetails(props: ButtonProps) {
  // FastStore exposes the data that comes from FastStore API along with FastStore API Extensions inside a provider. Use the usePDP hook to access data from a Product Detail Page (PDP). Refer to: https://developers.vtex.com/docs/guides/faststore/api-extensions-consuming-api-extensions
  const context = usePDP();
  const [counter, setCounter] = useState(0);

  console.log("🚀 ~ PDP context:", context);

  // We will show one of the installments option available if the product has interest free (You should go further and show all available installments options)
  const installment = context?.data?.product?.availableInstallments[0];
  const interestFree = installment.installmentInterest === 0 ?? false;

  return (
    <section className={styles.buyButtonWithDetails}>
      {interestFree && (
        <span>
          {`${installment.installmentNumber} interest-free installment(s)`}
          <br />
          {`of ${priceFormatter(installment.installmentValue)} with ${
            installment.installmentPaymentSystemName
          }`}
        </span>
      )}

      <div
        style={{ border: "2px solid green", padding: "10px", margin: "10px" }}
        onClick={() => setCounter(counter + 1)}
      >
        Click here to increment! Counter: {counter}
      </div>

      <UIButton {...props} variant="primary">
        Buy Button
      </UIButton>
    </section>
  );
}

export default BuyButtonWithDetails;
