import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Button, Typography } from '@mui/material';
import Head from 'next/head';
import { useRef, useState } from 'react';

import { Header } from '../components';
import AddNewUser from '../components/UserList/AddNewUser';

interface IUser {
  name: string;
  phone: string;
  email?: string;
  birthday?: string;
}

export default function LinkPointHistory() {
  const phoneRef = useRef<HTMLInputElement>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userData, setUserData] = useState<IUser>();
  const [loadingUser, setLoadingUser] = useState(false);

  const checkUser = () => {
    if (phoneRef?.current?.value) {
      setLoadingUser(true);
      setTimeout(() => {
        setShowAddUser(false);
        setSubmitted(true);
        setUserData({
          name: 'ABC',
          birthday: '20-03-1993',
          email: 'abc@gmail.com',
          phone: '0965813633',
        });
      }, 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key === 'Enter') {
      if (phoneRef?.current?.value) {
        checkUser();
      }
    }
  };

  const handleClickAddUser = () => {
    setShowAddUser(true);
    setSubmitted(true);
  };

  const handleExitAddUser = () => {
    setShowAddUser(false);
    setSubmitted(false);
  };

  return (
    <>
      <Head>
        <title>ROY Barber Shop - Tích điểm</title>
        <meta
          name='description'
          content={`
          ROY Barber shop - Kiểm tra lịch sử cắt tóc và điểm tích lũy
        `}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      {showAddUser && <AddNewUser callbackExit={handleExitAddUser} />}

      {userData && <HairCutTimeline />}

      {!submitted && (
        <div
          className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
          style={{
            background: 'url("/img/slide-1.jpg")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div
            className='min-w-[400px] px-3 md:px-5 md:py-24 mx-auto flex text-gray-600 body-font relative'
            id='booking-box'
          >
            <div className=' max-w-md bg-white rounded-lg p-8 md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md mx-auto'>
              <h2 className='text-gray-900 text-xl font-semibold title-font text-center'>
                KIỂM TRA ĐIỂM TÍCH LŨY
              </h2>

              <div>
                <Typography className='text-slate-500 text-lg leading-relaxed mb-4 text-center'>
                  Nhập SĐT để kiểm tra ngay
                </Typography>
                <div className='relative mb-4'>
                  <input
                    type='number'
                    required
                    ref={phoneRef}
                    onKeyDown={handleKeyDown}
                    maxLength={10}
                    placeholder='Nhập SĐT để kiểm tra'
                    name='phone'
                    className='w-full bg-white rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  />
                </div>

                <Button
                  variant='contained'
                  size='large'
                  className='w-100 mb-2'
                  onClick={() => checkUser()}
                  disabled={loadingUser}
                >
                  {loadingUser ? 'Đang kiểm tra' : 'KIỂM TRA'}
                </Button>

                <Typography className='text-center mb-2'>Hoặc</Typography>

                <Button
                  variant='outlined'
                  size='large'
                  className='w-100'
                  onClick={handleClickAddUser}
                >
                  Đăng ký thành viên
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function HairCutTimeline() {
  return (
    <div className='text-center max-w-xl ml-auto mr-auto mt-[100px]'>
      <h2 className='text-gray-900 text-xl font-semibold title-font text-center'>
        KIỂM TRA ĐIỂM TÍCH LŨY
      </h2>
      <div className='mt-30 mb-30'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-2'>
          <div className='bg-[#0fad78] p-4 rounded-md text-white m-auto'>
            <Typography className='text-2xl'>Tổng điểm:</Typography>
            <Typography className='text-2xl'>40 điểm</Typography>
            <br />
            <Typography variant='body2'>
              Sử dụng điểm để mua các mặt hàng
            </Typography>
          </div>

          <div className='bg-[#ff5370] p-4 rounded-md text-white m-auto'>
            <Typography className='text-2xl'>Gói cước 10+2:</Typography>
            <Typography className='text-2xl'>4 lần</Typography>
            <br />
            <Typography variant='body2'>
              Cần thêm 6 lần cắt nữa để có 2 lượt cắt miễn phí.
            </Typography>
          </div>
        </div>
      </div>

      <Typography variant='body1' gutterBottom className='italic'>
        Mốc thời gian cắt tóc
      </Typography>
      <Timeline position='alternate-reverse'>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='success' />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            20-03-2021
            <br />
            <span>
              Lần 1, <span className='text-green-600'>+10 điểm</span>
            </span>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='success' />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            04-02-2022
            <br />
            <span>
              Lần 2, <span className='text-green-600'>+10 điểm</span>
            </span>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='success' />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            02-01-2023
            <br />
            <span>
              Lần 3, <span className='text-green-600'>+10 điểm</span>
            </span>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='success' />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            20-03-2021
            <br />
            <span>
              Lần 4, <span className='text-green-600'>+10 điểm</span>
            </span>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='success' />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            20-03-2021
            <br />
            <span>
              Lần 5, <span className='text-green-600'>+10 điểm</span>
            </span>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='success' />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            20-03-2021
            <br />
            <span>
              Lần 6, <span className='text-green-600'>+10 điểm</span>
            </span>
          </TimelineContent>
        </TimelineItem>{' '}
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='success' />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            20-03-2021
            <br />
            <span>
              Lần 7, <span className='text-green-600'>+10 điểm</span>
            </span>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='success' />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            20-03-2021
            <br />
            <span>
              Lần 8, <span className='text-green-600'>+10 điểm</span>
            </span>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='success' />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            20-03-2021
            <br />
            <span>
              Lần 9, <span className='text-green-600'>+10 điểm</span>
            </span>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='success' />
          </TimelineSeparator>
          <TimelineContent>
            09-02-2024
            <br />
            <span>
              Lần 10, <span className='text-green-600'>+10 điểm</span>
            </span>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
