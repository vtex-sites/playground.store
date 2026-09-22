// EXPERIMENT (branch test/sort-by-specification): copy of @faststore/core's
// default _app.tsx, plus registerCustomSortKeys so the SDK's URL-state parser
// (parseSearchState) accepts `?sort=clothesSize_desc` instead of throwing.
// This is what lets the custom sort be tested visually via a real page load,
// not just via a raw GraphQL request.
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { registerCustomSortKeys, useSearch } from '@faststore/sdk'
import { UIProvider } from '@faststore/ui'

import { useReloadAfterLogoutReturn } from 'src/components/account/Drawer/OrganizationDrawer/useReloadAfterLogoutReturn'
import ThirdPartyScripts from 'src/components/ThirdPartyScripts'
import Layout from 'src/Layout'
import AnalyticsHandler from 'src/sdk/analytics'
import { DeliveryPromiseProvider } from 'src/sdk/deliveryPromise'
import ErrorBoundary from 'src/sdk/error/ErrorBoundary'
import useGeolocation from 'src/sdk/geolocation/useGeolocation'
import useScrollRestoration from 'src/sdk/ui/useScrollRestoration'

import storeConfig from 'discovery.config'
import SEO from 'next-seo.config'

// FastStore UI's base styles
import '../styles/main.scss'

import { ITEMS_PER_PAGE } from 'src/constants'
import { useLocalizationConfig } from 'src/sdk/localization/useLocalizationConfig'

registerCustomSortKeys(['clothesSize_desc'])

function LocalizationConfigUpdater() {
  // Update session with localization config
  useLocalizationConfig()
  return null
}

function App({ Component, pageProps }: AppProps) {
  useGeolocation()
  useReloadAfterLogoutReturn()
  storeConfig.experimental?.scrollRestoration && useScrollRestoration()
  const router = useRouter()
  const { start: startGlobalSearchState } = useSearch()

  // Initialize global Search state
  startGlobalSearchState(router.asPath, { itemsPerPage: ITEMS_PER_PAGE })

  return (
    <ErrorBoundary>
      {storeConfig.localization?.enabled && <LocalizationConfigUpdater />}
      <Head> {!process.env.DISABLE_3P_SCRIPTS && <ThirdPartyScripts />}</Head>
      <DefaultSeo {...SEO} />

      <AnalyticsHandler />

      <UIProvider>
        <DeliveryPromiseProvider>
          <Layout>
            <Component {...pageProps} key={pageProps?.key} />
          </Layout>
        </DeliveryPromiseProvider>
      </UIProvider>
    </ErrorBoundary>
  )
}

export default App
