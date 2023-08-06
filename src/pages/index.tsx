import Head from 'next/head';

import { About, Footer, Header, HeroCarousel, Pricing, Reviews, ScrollToTop, Services, Team } from '../components';

export default function Home() {
  return (
    <>
      <Head>
        <title>ROY Barber shop</title>
        <meta
          name='description'
          content={`
          ROY Barber shop
        `}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <HeroCarousel />
      <About />
      <Services />
      <Team />
      <Reviews />
      <Pricing />
      <Footer />
      <ScrollToTop />
    </>
  );
}
