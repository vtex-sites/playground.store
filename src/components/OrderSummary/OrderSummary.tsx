// A section that shows the signed-in shopper a summary of their own orders.
// The query it runs takes no arguments: the resolver identifies the shopper
// from the request, so the component cannot ask for anyone else's data.
// Refer to https://developers.vtex.com/docs/guides/faststore/api-extensions-authentication-in-api-extensions

import { gql } from "@faststore/core/api";

import {
  useQuery_unstable as useQuery,
  useSession_unstable as useSession,
} from "@faststore/core/experimental";

import styles from "./order-summary.module.scss";

export const query = gql(`
  query OrderSummaryQuery {
    orderSummary {
      totalOrders
      lastOrderDate
    }
  }
`);

type OrderSummaryData = {
  orderSummary: {
    totalOrders: number;
    lastOrderDate: string | null;
  } | null;
};

export const OrderSummary = () => {
  // `person` is only populated for a signed-in shopper.
  const { person } = useSession();
  const isSignedIn = Boolean(person?.id);

  // The resolver answers with a 401 for a signed-out visitor, so the query
  // only runs once there is a session to authenticate.
  const { data, error } = useQuery<OrderSummaryData>(
    query,
    {},
    { doNotRun: !isSignedIn }
  );

  if (!isSignedIn) {
    return (
      <section className={styles.section}>
        <p>Sign in to see your order summary.</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.section}>
        <p>We could not load your order summary. Please try again.</p>
      </section>
    );
  }

  if (!data?.orderSummary) {
    return null;
  }

  const { totalOrders, lastOrderDate } = data.orderSummary;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Your orders</h2>

      <p className={styles.count}>
        {totalOrders === 1 ? "1 order" : `${totalOrders} orders`}
      </p>

      {lastOrderDate && (
        <p className={styles.date}>
          Last order on {new Date(lastOrderDate).toLocaleDateString()}
        </p>
      )}
    </section>
  );
};

export default OrderSummary;
