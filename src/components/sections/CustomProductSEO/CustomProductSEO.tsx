import { usePDP } from "@faststore/core";
import { ProductJsonLd } from "next-seo";

export function CustomProductSEOSection() {
  // FastStore exposes the data that comes from FastStore API along with FastStore API Extensions inside a provider. Use the usePDP hook to access data from a Product Detail Page (PDP). Refer to: https://developers.vtex.com/docs/guides/faststore/api-extensions-consuming-api-extensions
  const context = usePDP();
  const product = context?.data?.product;
  const meta = product?.seo;

  return (
    <section>
      <ProductJsonLd
        productName={meta.title}
        description={meta.description}
        brand={product.brand.name}
        sku="TESTSKU"
        gtin={product.gtin}
        releaseDate={product.releaseDate}
      />
    </section>
  );
}

export default CustomProductSEOSection;
