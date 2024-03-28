import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta charSet='utf-8' />
        <meta name='author' content='Roy Barber Shop' />
        <link rel='shortcut icon' type='image/x-icon' href='img/favicon.png' />
        <meta property='og:title' content='Roy Barber Shop' />
        <meta
          name='description'
          content='Không chỉ là một lần cắt tóc mà còn là một lần trải nghiệm thú vị'
        />
        <meta property='og:url' content='https://www.roybarbershop.com' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Roy Barber Shop' />
        <meta property='og:type' content='barbershop' />
        <meta property='og:locale' content='vi_VN' />
        <meta
          property='og:description'
          content='Không chỉ là một lần cắt tóc mà còn là một lần trải nghiệm thú vị'
        />
        <meta
          property='og:image'
          content='https://roybarbershop.com/img/roybarbershop-preview.jpg'
        />
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content='roybarbershop.com' />
        <meta property='twitter:url' content='https://www.roybarbershop.com' />
        <meta name='twitter:title' content='Roy Barber Shop' />
        <meta
          name='twitter:description'
          content='Không chỉ là một lần cắt tóc mà còn là một lần trải nghiệm thú vị'
        />
        <meta
          name='twitter:image'
          content='https://roybarbershop.com/img/roybarbershop-preview.jpg'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
