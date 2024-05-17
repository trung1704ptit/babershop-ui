import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { BookingEntrance, Header } from '../../components';
import { IBookingPage } from '../../interface/pages/booking';

export default function Booking({ phone }: IBookingPage) {
  return (
    <>
      <Head>
        <title>ROY Barber Shop - Đặt lịch</title>
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
      <div
        className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
        style={{
          background: 'url("/img/slide-1.jpg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <BookingEntrance phone={phone} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const phone = query?.phone || null;
  return {
    props: {
      phone,
    },
  };
};
