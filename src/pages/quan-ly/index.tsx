import { NextApiRequest } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const BookingListPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/quan-ly/tich-diem');
  }, [router]);

  return null;
};

export default BookingListPage;

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
  const token = req.cookies.logged_in; // or however you get the token from the request

  if (!token) {
    return {
      redirect: {
        destination: '/dang-nhap',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // Will be passed to the page component as props
  };
};
