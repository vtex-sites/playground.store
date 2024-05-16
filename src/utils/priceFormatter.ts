import FaststoreConfig from "../../faststore.config.js";

export const priceFormatter = (value: number) => {
  return value.toLocaleString(FaststoreConfig.session.locale, {
    style: "currency",
    currency: FaststoreConfig.session.currency.code,
  });
};
