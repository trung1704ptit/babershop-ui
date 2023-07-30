import Head from 'next/head';

import { About, Footer, Header, HeroCarousel, Pricing, Reviews, ScrollToTop, Services, Team } from '../components';

export default function Home() {
  return (
    <>
      <Head>
        <title>Barbershop Quang hair</title>
        <meta
          name='description'
          content={`
          A ready-to-use starter template for building fast and modern web applications.
          Includes basic configurations and optimizations for
          optimal performance and development experience.
        `}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>
        {/* <Loading /> */}

        <Header />
        <HeroCarousel />
        <About />
        <Services />
        <Team />
        <Reviews />
        <Pricing />
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
