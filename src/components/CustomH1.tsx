import { usePLP } from '@faststore/core'

export default function CustomH1() {
  const context = usePLP()

  return (
    <section>
      <h1>Testing - {context.data?.collection?.seo?.title ?? 'PLP'}!</h1>
    </section>
  )
}
