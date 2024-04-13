import { Sidebar } from './Sidebar';
import { Footer } from '..';
import Header from '../Header';

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const Layout = (props: Props) => {
  return (
    <>
      <Header position='relative' />
      <div className='flex min-h-[calc(100vh-80px)]'>
        <Sidebar />
        <main className='rounded w-full h-full p-2'>{props.children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
