import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { About, Contact, Footer, Header, HeroCarousel, Pricing, Products, Reviews, ScrollToTop, Services, Team } from '../components';
import { PRODUCTS_COLLECTION } from '../firebase/config';
import { getDocsByCollection } from '../firebase/getData';
import { IHomeProps } from '../interface/pages';

export default function Home(props: IHomeProps) {
  return (
    <>
      <Head>
        <title>ROY Barber Shop - Trang chủ</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <HeroCarousel />
      <About />
      <Services />
      <Team />
      <Pricing />
      <Products products={props.products} />
      <Reviews />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const productResults = await getDocsByCollection(PRODUCTS_COLLECTION);
    if (productResults.error) throw new Error();

    return {
      props: {
        products: productResults.result
      }
    }
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: {
          products: []
        }
      }
    }
  }
}