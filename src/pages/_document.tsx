import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="BarberShop & Hair Salon" />
        <meta name="author" content="" />
        <link rel="shortcut icon" type="image/x-icon" href="img/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
