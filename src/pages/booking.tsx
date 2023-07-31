import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { BookingEntrance, Header } from '../components';
import { IBookingPage } from '../interface/pages/booking';


export default function Booking({ phone }: IBookingPage) {
  return (
    <>
      <Head>
        <title>ROY Barber shop Booking</title>
        <meta
          name='description'
          content={`
          ROY Barber shop booking
        `}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <BookingEntrance phone={phone} />
    </>
  );
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const phone = query?.phone || null;
  console.log(query)
  return {
    props: {
      phone
    }
  }
} 