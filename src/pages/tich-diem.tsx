import DoneIcon from '@mui/icons-material/Done';
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
        <div className='mt-[100px] min-h-[80vh]'>
          <AddNewUser callbackExit={handleExitAddUser} guestMode={true} />
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
              <Typography variant='h6' className='title-font mb-2 text-center'>
                KIỂM TRA ĐIỂM TÍCH LŨY
              </Typography>

              <div>
                <Typography
                  className='text-slate-500 text-lg leading-relaxed mb-4 text-center'
                  variant='body2'
                >
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
                    className='w-100 mb-3'
                    onClick={() => getUserProfile()}
                    disabled={loadingUser}
                  >
                    {loadingUser ? 'Đang kiểm tra' : 'KIỂM TRA'}
                  </Button>
                </form>

                <Typography className='text-center mb-3'>hoặc</Typography>

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
  const [activeView, setActiveView] = useState('');

  const sHistory = userData.services_history;

  return (
    <div className='text-center max-w-xl ml-auto mr-auto mt-[100px]'>
      <Typography variant='h6' className='title-font mb-2 text-center'>
        KIỂM TRA GÓI CƯỚC & LỊCH SỬ CẮT
      </Typography>
      <div className='mt-30 mb-30'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-2'>
          <div className='bg-[#0fad78] p-4 rounded-md text-white m-auto w-100 h-full min-h-[160px]'>
            <Typography className='text-2xl'>Tổng điểm:</Typography>
            <Typography className='text-2xl'>{currentPoints} điểm</Typography>
            <br />
            <Typography variant='body2' className='mb-3 min-h-[40px]'>
              Sử dụng điểm để mua các mặt hàng
            </Typography>
            <Button
              size='medium'
              variant='outlined'
              className='text-white border-white w-100'
              onClick={() => setActiveView('history')}
            >
              Xem lịch sử tích điểm
            </Button>
          </div>

          <div className='bg-[#ff5370] p-4 rounded-md text-white m-auto w-100 h-full min-h-[160px]'>
            {userData.services && size(userData.services) > 0 ? (
              <>
                <Typography className='text-2xl'>Gói cước 10+2:</Typography>
                <Typography className='text-2xl'>
                  {size(userData.services_history)} lần
                </Typography>
                <br />
                <Typography variant='body2' className='mb-3 min-h-[40px]'>
                  {size(userData.services_history) >= 10
                    ? 'Gói cước 10+2 đã kết thúc'
                    : ` Cần thêm ${
                        10 - size(userData.services_history)
                      } lần cắt nữa để
                  có 2 lượt cắt miễn phí.`}
                </Typography>
                <Button
                  size='medium'
                  variant='outlined'
                  className='text-white border-white w-100'
                  onClick={() => setActiveView('10+2')}
                >
                  Xem lịch sử gói 10+2
                </Button>
              </>
            ) : (
              <Typography className=''>Chưa đăng ký gói dịch vụ nào</Typography>
            )}
          </div>
        </div>
      </div>

      {activeView === 'history' && (
        <>
          <Typography variant='body1' gutterBottom>
            Lịch sử tích điểm
          </Typography>
          {userData && userData.points && size(userData.points) > 0 ? (
            <Timeline position='alternate-reverse'>
              {userData?.points?.map((p, index) => {
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
                          <span className='text-green-600'>
                            Tổng điểm: {p.points}
                          </span>
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
                        <span className='text-green-600'>
                          Tổng điểm: {p.points}
                        </span>
                      </span>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </Timeline>
          ) : (
            <Typography>Bạn hiện chưa có lần cắt nào</Typography>
          )}
        </>
      )}

      {activeView === '10+2' && (
        <>
          <Typography variant='body1' gutterBottom>
            Lịch sử cắt gói 10+2
          </Typography>
          {userData && sHistory && size(sHistory) > 0 ? (
            <Timeline position='alternate-reverse'>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => {
                if (index == 11) {
                  return (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot
                          color={
                            sHistory[index]?.created_at ? `success` : 'grey'
                          }
                        >
                          <DoneIcon />
                        </TimelineDot>
                      </TimelineSeparator>
                      <TimelineContent>
                        {sHistory.length > index
                          ? moment(sHistory[index]?.created_at).format(
                              'DD-MM-YYYY'
                            )
                          : ''}
                        <br />
                        <span>
                          Lần {index + 1},{' '}
                          <span>
                            {sHistory[index]?.created_at ? '+1' : 'Chưa cắt'}
                          </span>
                          <br />
                          <span className='text-green-600'>Miễn phí</span>
                        </span>
                      </TimelineContent>
                    </TimelineItem>
                  );
                }
                return (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot
                        color={sHistory[index]?.created_at ? `success` : 'grey'}
                      >
                        <DoneIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      {sHistory.length > index
                        ? moment(sHistory[index]?.created_at).format(
                            'DD-MM-YYYY'
                          )
                        : ''}
                      <br />
                      <span>
                        Lần {index + 1},
                        <span>
                          {sHistory[index]?.created_at
                            ? ' Đã cắt'
                            : ' Chưa cắt'}
                        </span>
                        {index == 10 && (
                          <>
                            <br />
                            <span className='text-green-600'>Miễn phí</span>
                          </>
                        )}
                      </span>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </Timeline>
          ) : (
            <Typography>Bạn hiện chưa có lần cắt nào</Typography>
          )}
        </>
      )}
    </div>
  );
}
