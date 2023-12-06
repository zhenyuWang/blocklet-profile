import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='bg-gradient-to-r from-blue-400 to-purple-400 bg-red'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
