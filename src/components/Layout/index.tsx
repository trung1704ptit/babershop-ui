'use client';

import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { useState } from 'react';

import MobileSideBar from './MobileSidebar';
import { Sidebar } from './Sidebar';
import { Footer } from '..';
import Header from '../Header';
import useMobile from '../../hooks/useMobile';

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const Layout = (props: Props) => {
  const [openDrawer, setOpenDrawser] = useState(false);
  const { isMobile } = useMobile();

  return (
    <>
      <Header position='relative' />
      <div className='flex min-h-[calc(100vh-80px)]'>
        {!isMobile && <Sidebar />}
        <main className='rounded w-full h-full p-2'>
          <div>
            {isMobile && openDrawer && (
              <MobileSideBar toggleDrawer={() => setOpenDrawser(!openDrawer)} />
            )}
            {isMobile && (
              <Button
                variant='contained'
                onClick={() => setOpenDrawser(!openDrawer)}
                startIcon={<MenuIcon />}
              >
                Menu
              </Button>
            )}
          </div>
          {props.children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
