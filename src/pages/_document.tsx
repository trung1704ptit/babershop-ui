import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="RoyBarbarshop không chỉ là một lần cắt tóc mà còn là một lần trải nghiệm thú vị" />
        <meta name="author" content="Roy Barber Shop" />
        <link rel="shortcut icon" type="image/x-icon" href="img/favicon.png" />
        <meta property="og:title" content="Roy Barber Shop" />
        <meta
          property="og:description"
          content="RoyBarbarshop không chỉ là một lần cắt tóc mà còn là một lần trải nghiệm thú vị"
        />
        <meta
          property="og:image"
          content="img/roybarbershop-preview.jpg"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
