'use client';
import { Header, Login } from '../components';

const LoginPage = () => {
  return (
    <>
      <Header />
      <div
        className='w-100 justify-center items-center flex bg-no-repeat bg-cover bg-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none'
        style={{
          background: 'url("/img/slide-1.jpg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Login />
      </div>
    </>
  );
};

export default LoginPage;
