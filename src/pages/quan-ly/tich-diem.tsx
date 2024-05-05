import { NextApiRequest } from 'next';

import { Layout } from '../../components';
import UserList from '../../components/UserList';

const BookingListPage = () => {
  return (
    <Layout>
      <UserList />
    </Layout>
  );
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
