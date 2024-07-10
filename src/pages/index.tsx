import Head from 'next/head';

import {
  About,
  Contact,
  Footer,
  Header,
  HeroCarousel,
  Pricing,
  Products,
  Reviews,
  Services,
  Team,
} from '../components';
import ImagesGallery from '../components/ImagesGallery';
import { PRODUCTS_COLLECTION } from '../firebase/config';
import { getDocsByCollection } from '../firebase/getData';
import { IHomeProps } from '../interface/pages';
import api from '../utils/api';

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
      <ImagesGallery galleries={props.galleries} />
      <Services />
      <Team barbers={props.barbers} />
      <Pricing services={props.services} />
      <Products products={props.products} />
      <Reviews />
      <Contact />
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  try {
    const productResults = await getDocsByCollection(PRODUCTS_COLLECTION);
    const barbersRes = await api.get('/api/users?role=barber');
    const servicesRes = await api.get('/api/services');
    const galleriesRes = await api.get('/api/galleries');

    if (productResults.error) throw new Error();

    return {
      props: {
        products: productResults.result,
        barbers: barbersRes.data.data,
        services: servicesRes.data.data,
        galleries: galleriesRes.data.data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: {
          products: [],
        },
      },
      revalidate: 259200,
    };
  }
};
