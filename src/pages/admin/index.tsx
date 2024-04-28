import { useRouter } from 'next/router';
import { useEffect } from 'react';

const BookingListPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/admin/tich-diem');
  }, [router]);

  return null;
};

export default BookingListPage;
