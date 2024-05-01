/* eslint-disable @next/next/no-html-link-for-pages */
import { Button } from '@mui/material';
import cookie from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { IHeaderProps } from './types';
import api from '../../utils/api';

const Header = ({ position }: IHeaderProps) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<string | undefined>('');
  const router = useRouter();

  const handleClickHamberger = () => {
    setMobileMenu(!mobileMenu);
  };

  useEffect(() => {
    const loggedIn = cookie.get('logged_in');
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <header
      id='header'
      className={`header-section w-full ${position ? position : 'fixed'}`}
    >
      <div className='w-full flex positive px-3'>
        <nav className='navbar w-full'>
          <Link href='/' className='navbar-brand'>
            <img
              src='/img/logo-type1.png'
              alt='Barbershop'
              className='w-[250px]'
            />
          </Link>
          <div className='menu-wrap align-items-center'>
            <div id='mainmenu' className='mainmenu'>
              <ul className='nav'>
                {isLoggedIn ? (
                  <li>
                    <Link href='/quan-ly/tich-diem'>Quản lý</Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link className='nav-link active' href='/#gioi-thieu'>
                        Giới thiệu
                      </Link>
                    </li>
                    <li>
                      <a href='/#dich-vu'>Dịch vụ</a>
                    </li>
                    <li>
                      <a href='/#bang-gia'>Bảng giá</a>
                    </li>
                    <li>
                      <a href='/#san-pham'>Sản phẩm</a>
                    </li>
                    <li>
                      <a href='/#dia-chi'>Địa chỉ</a>
                    </li>
                  </>
                )}

                <li>
                  <Link href='/tich-diem' className='cursor-pointer rounded'>
                    Tích điểm
                  </Link>
                </li>
              </ul>
            </div>
            <Button
              variant='contained'
              onClick={() => {
                router.push('/dat-lich');
              }}
              className='text-white'
            >
              Đặt chỗ
            </Button>
            {isLoggedIn ? (
              <Button
                variant='outlined'
                className='ml-2 text-white'
                onClick={async () => {
                  await api.get('/api/auth/logout');
                  router.push('/');
                }}
              >
                Đăng xuất
              </Button>
            ) : (
              <Button
                variant='outlined'
                className='ml-2 text-white'
                onClick={() => {
                  router.push('/dang-nhap');
                }}
              >
                Đăng nhập
              </Button>
            )}
          </div>
        </nav>
        <div
          className='text-white cursor-pointer flex'
          onClick={handleClickHamberger}
        >
          {mobileMenu ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='md:hidden w-[36px] h-[36px] m-auto'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='md:hidden w-[36px] h-[36px] m-auto'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>
          )}
        </div>
        {mobileMenu && (
          <MobileMenu
            handleClick={() => setMobileMenu(false)}
            isLoggedIn={isLoggedIn}
          />
        )}
      </div>
    </header>
  );
};

export default Header;

interface IMobileProps {
  handleClick: () => void;
  isLoggedIn?: string | undefined;
}

const MobileMenu = (props: IMobileProps) => {
  const router = useRouter();
  return (
    <>
      <div className='bg-white absolute top-full left-0 w-full z-10 p-2 pb-4'>
        <ul className='text-black'>
          {props.isLoggedIn ? (
            <li>
              <Link href='/quan-ly/tich-diem' className='nav-link text-black'>
                Quản lý
              </Link>
            </li>
          ) : (
            <>
              <li onClick={props.handleClick}>
                <Link
                  className='nav-link active text-black'
                  href='/#gioi-thieu'
                >
                  Giới thiệu
                </Link>
              </li>
              <li onClick={props.handleClick}>
                <a href='/#dich-vu' className='nav-link text-black'>
                  Dịch vụ
                </a>
              </li>
              <li onClick={props.handleClick}>
                <a href='/#bang-gia' className='nav-link text-black'>
                  Bảng giá
                </a>
              </li>
              <li onClick={props.handleClick}>
                <a href='/#san-pham' className='nav-link text-black'>
                  Sản phẩm
                </a>
              </li>
              <li onClick={props.handleClick}>
                <a href='/#dia-chi' className='nav-link text-black'>
                  Địa chỉ
                </a>
              </li>
            </>
          )}

          <li>
            <a href='/tich-diem' className='nav-link text-black'>
              Tích điểm
            </a>
          </li>
        </ul>
        <div className='w-full p-3' onClick={props.handleClick}>
          <Link
            href='/dat-lich'
            className='block text-center text-white w-full border-0 py-1.5 px-4 focus:outline-none rounded text-lg bg-[#9f6e0dd4]'
          >
            Đặt chỗ{' '}
          </Link>
        </div>
        <div className='w-full pl-3 pr-3'>
          {props.isLoggedIn ? (
            <Button
              variant='outlined'
              className='w-full'
              onClick={async () => {
                await api.get('/api/auth/logout');
                router.push('/');
              }}
            >
              Đăng xuất
            </Button>
          ) : (
            <Button
              variant='outlined'
              className='w-full'
              onClick={() => {
                router.push('/dang-nhap');
              }}
            >
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
      <div
        className='absolute top-full left-0 h-screen w-screen opacity-70 bg-black'
        onClick={props.handleClick}
      ></div>
    </>
  );
};
