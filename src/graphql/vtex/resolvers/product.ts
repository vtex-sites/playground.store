import type { StoreProductRoot } from "@faststore/core/api";

const productResolver = {
  StoreProduct: {
    // We will add a resolver to get the installments of a product, fetch only the data you need (https://developers.vtex.com/docs/guides/faststore/api-extensions-overview#best-practices-for-fetching-data)
    availableInstallments: (root: StoreProductRoot) => {
      const installments = root.sellers?.[0]?.commertialOffer?.Installments;

      if (!installments.length) {
        return [];
      }

      return installments.map((installment) => ({
        installmentPaymentSystemName: installment.PaymentSystemName,
        installmentValue: installment.Value,
        installmentInterest: installment.InterestRate,
        installmentNumber: installment.NumberOfInstallments,
      }));
    },
  },
};

export default productResolver;
