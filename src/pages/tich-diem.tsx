import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { size } from 'lodash';
import moment from 'moment';
import Head from 'next/head';
import { ChangeEvent, useState } from 'react';

import { Header } from '../components';
import { IUserData } from '../components/UserList';
import AddNewUser from '../components/UserList/AddNewUser';
import api from '../utils/api';
import { getLastPoint } from '../utils/helper';

export default function LinkPointHistory() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userData, setUserData] = useState<IUserData>();
  const [loadingUser, setLoadingUser] = useState(false);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const getUserProfile = async () => {
    if (phone) {
      try {
        setLoadingUser(true);
        const res = await api.get(`/api/users/${phone}`);
        if (res?.status === 200) {
          const { data } = res.data;
          setShowAddUser(false);
          setUserData(data);
          setSubmitted(true);
          setLoadingUser(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error?.response?.status === 404) {
          setError(error.response.data.message);
          setLoadingUser(false);
        }
        console.log('error:', error);
        setLoadingUser(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key === 'Enter') {
      if (phone) {
        getUserProfile();
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

  const handleOnChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getUserProfile();
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
      {showAddUser && (
        <div className='mt-[100px]'>
          <AddNewUser callbackExit={handleExitAddUser} />
        </div>
      )}

      {userData && <HairCutTimeline userData={userData} />}

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
                <form onSubmit={onSubmit}>
                  <div className='relative mb-4'>
                    <TextField
                      type='number'
                      size='medium'
                      required
                      value={phone}
                      onKeyDown={handleKeyDown}
                      onChange={handleOnChangePhone}
                      placeholder='Nhập SĐT để kiểm tra'
                      name='phone'
                      className='w-full'
                    />

                    <Typography
                      variant='body2'
                      color='secondary'
                      className='mt-1'
                    >
                      {error}
                    </Typography>
                  </div>

                  <Button
                    variant='contained'
                    size='large'
                    type='submit'
                    className='w-100 mb-2'
                    onClick={() => getUserProfile()}
                    disabled={loadingUser}
                  >
                    {loadingUser ? 'Đang kiểm tra' : 'KIỂM TRA'}
                  </Button>
                </form>

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

interface IPropsTimeline {
  userData: IUserData;
}

function HairCutTimeline(props: IPropsTimeline) {
  const { userData } = props;
  const currentPoints = getLastPoint(userData);

  return (
    <div className='text-center max-w-xl ml-auto mr-auto mt-[100px]'>
      <h2 className='text-gray-900 text-xl font-semibold title-font text-center'>
        KIỂM TRA ĐIỂM TÍCH LŨY
      </h2>
      <div className='mt-30 mb-30'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-2'>
          <div className='bg-[#0fad78] p-4 rounded-md text-white m-auto w-100'>
            <Typography className='text-2xl'>Tổng điểm:</Typography>
            <Typography className='text-2xl'>{currentPoints} điểm</Typography>
            <br />
            <Typography variant='body2'>
              Sử dụng điểm để mua các mặt hàng
            </Typography>
          </div>

          <div className='bg-[#ff5370] p-4 rounded-md text-white m-auto w-100'>
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
        {userData &&
          userData.points &&
          userData?.points?.map((p, index) => {
            if (index === size(userData.points) - 1) {
              return (
                <TimelineItem key={p.id}>
                  <TimelineSeparator>
                    <TimelineDot color='success' />
                  </TimelineSeparator>
                  <TimelineContent>
                    {moment(p.created_at).format('DD-MM-YYYY')}
                    <br />
                    <span>
                      Lần {index + 1},{' '}
                      <span className='text-green-600'>+10 điểm</span>
                    </span>
                  </TimelineContent>
                </TimelineItem>
              );
            }

            return (
              <TimelineItem key={p.id}>
                <TimelineSeparator>
                  <TimelineDot color='success' />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  {moment(p.created_at).format('DD-MM-YYYY')}
                  <br />
                  <span>
                    Lần {index + 1},{' '}
                    <span className='text-green-600'>+10 điểm</span>
                  </span>
                </TimelineContent>
              </TimelineItem>
            );
          })}
      </Timeline>
    </div>
  );
}
