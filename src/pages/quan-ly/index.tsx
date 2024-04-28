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