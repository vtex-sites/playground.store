import { usePDP } from "@faststore/core";
import { ProductJsonLd } from "next-seo";

export function CustomProductSEOSection() {
  // FastStore exposes the data that comes from FastStore API along with FastStore API Extensions inside a provider. Use the usePDP hook to access data from a Product Detail Page (PDP). Refer to: https://developers.vtex.com/docs/guides/faststore/api-extensions-consuming-api-extensions
  const context = usePDP();
  const product = context?.data?.product;
  const meta = product?.seo;

  return (
    <ProductJsonLd
      productName={meta.title}
      description={meta.description}
      brand={product.brand.name}
      sku="TESTSKU"
      gtin={product.gtin}
      images={product.image.map(
        (img: { url: string; alternateName: string }) => img.url
      )}
      releaseDate={product.releaseDate}
    />
  );
}

export default CustomProductSEOSection;
