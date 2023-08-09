import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { BookingEntrance, Header } from '../components';
import { IBookingPage } from '../interface/pages/booking';


export default function Booking({ phone, name }: IBookingPage) {
  return (
    <>
      <Head>
        <title>ROY Barber shop - Đặt lịch</title>
        <meta
          name='description'
          content={`
          ROY Barber shop - Đặt lịch giữ chỗ chỉ trong 30s
        `}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div><BookingEntrance phone={phone} name={name} />
      </div>
    </>
  );
}


export const getServerSideProps: GetServerSideProps = async (args) => {
  const phone = args.query?.phone || null;
  const name = args.query?.name || null;

  return {
    props: {
      phone,
      name
    }
  }
} 