import { usePLP } from "@faststore/core";

export interface CustomH1Props {
  title: string;
}

export default function CustomH1(props: CustomH1Props) {
  const context = usePLP();

  return (
    <section>
      <h1>Testando: {context.data?.collection?.seo?.title}!</h1>
    </section>
  );
}
