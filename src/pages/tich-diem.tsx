import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Button, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import Head from 'next/head';
import { ChangeEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { Header } from '../components';
import { MESSAGES } from '../utils/constants';

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
      {showAddUser && <AddNewUser />}

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

interface INewUserProps {
  name: string;
  phone: string;
  birthday: string;
  email?: string;
  password: string;
  passwordConfirm: string;
}

function AddNewUser() {
  const [formData, setFormData] = useState<INewUserProps>({
    name: '',
    email: '',
    birthday: '',
    phone: '',
    password: 'guest@babershop.com',
    passwordConfirm: 'guest@babershop.com',
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData?.email) {
      formData.email = `${new Date().getTime()}@gmail.com`;
    }
    axios
      .post(`http://localhost:8000/api/auth/register`, formData)
      .then((res) => {
        console.log(res);
        if (res?.data?.status === 'success') {
          toast.success(MESSAGES.REGISTER_USER_SUCCESS_VI, {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
          });
        }
      })
      .catch((error) => {
        let errorMessage = MESSAGES.COMMON_ERROR_VI;
        if (
          error?.response?.data?.message == MESSAGES.REGISTER_USER_EXISTS_EN
        ) {
          errorMessage = MESSAGES.REGISTER_USER_EXISTS_VI;
        }

        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });

        console.log(error);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (newdate: any) => {
    console.log(newdate);
    setFormData((prevData) => ({
      ...prevData,
      birthday: newdate.$d.toISOString(),
    }));
  };

  return (
    <div className='ml-auto mr-auto mt-[100px] text-center max-w-sm min-h-[80vh]'>
      <Typography variant='h5' gutterBottom className='mb-3'>
        Thêm mới khách hàng và tích điểm
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          id='outlined-basic'
          label='Tên khách hàng'
          variant='outlined'
          className='w-full mb-3'
          required
          name='name'
          onChange={handleChange}
        />
        <TextField
          id='outlined-basic'
          label='Số điện thoại'
          variant='outlined'
          className='w-full mb-3'
          type='number'
          required
          name='phone'
          onChange={handleChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className='w-full mb-3'
            label='Ngày sinh'
            onChange={handleDateChange}
            format='DD/MM/YYYY'
          />
        </LocalizationProvider>
        <TextField
          id='outlined-basic'
          label='Email (Nếu có)'
          variant='outlined'
          className='w-full mb-3'
          type='email'
          name='email'
          onChange={handleChange}
        />
        <Button
          variant='contained'
          className='w-100'
          size='large'
          type='submit'
        >
          Thêm mới
        </Button>
      </form>
    </div>
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
