import Head from 'next/head'
import Script from 'next/script'
import '/styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import ThemeContextProvider from '@/context/theme-context'
import ThemeSwitch from '@/components/ThemeSwitch'
import ChangeLanguage from '@/components/ChangeLanguage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Blocklet Profile</title>
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
        <meta name='theme-color' content='#4F6AF5' />
        <meta name='description' content='My first blocklet app, I hope you like it' />
      </Head>
      <Script src='__blocklet__.js' />
      <ThemeContextProvider>
        <div className='flex items-center fixed top-4 right-4'>
          <ChangeLanguage />
          <ThemeSwitch />
        </div>
        <Component {...pageProps} />
      </ThemeContextProvider>
    </>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}

export default appWithTranslation(App)
