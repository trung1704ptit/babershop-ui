'use client';
import { useRouter } from 'next/router';

import { Header } from '../components';
import AddNewUser from '../components/UserList/AddNewUser';

const Register = () => {
  const router = useRouter();
  return (
    <>
      <Header />
      <div
        className='w-100 p-2 justify-center items-center flex bg-no-repeat bg-cover bg-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none'
        style={{
          background: 'url("/img/slide-1.jpg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='bg-white p-7 rounded-md'>
          <AddNewUser guestMode={true} callbackExit={() => router.push('/')} />
        </div>
      </div>
    </>
  );
};

export default Register;
