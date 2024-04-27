import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment';
import * as React from 'react';

import { IUserData } from '.';
import api from '../../utils/api';

interface IProps {
  handleClose: () => void;
  userData: IUserData;
}

export default function UpdateUserPointsModal(props: IProps) {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const userPoints =
    props?.userData?.points?.[props?.userData?.points?.length - 1]?.points || 0;

  return (
    <Dialog
      open={true}
      onClose={props.handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          try {
            setLoading(true);
            setError(false);
            const res = await api.post('/api/points', {
              user_id: props.userData.id,
            });
            console.log(res);
            if (res?.status === 201) {
              setLoading(false);
              setSuccess(true);
            }
          } catch (error) {
            setLoading(false);
            console.log(error);
            setError(true);
          }
        },
      }}
    >
      <DialogTitle>Tích điểm</DialogTitle>
      <DialogContent style={{ minWidth: '320px' }}>
        <DialogContentText>
          {success ? (
            <div className='justify-center text-center'>
              <CheckCircleIcon className='text-green-600 text-8xl'></CheckCircleIcon>
              <Typography variant='body1' gutterBottom>
                Tích điểm thành công! Số điểm{' '}
                <strong>{props?.userData?.name}</strong> hiện tại là{' '}
                {userPoints + 10} điểm
              </Typography>
              <Typography variant='body2' gutterBottom>
                Ngày cập nhật {moment(new Date()).format('DD-MM-YYYY')}
              </Typography>
            </div>
          ) : (
            <>
              <Typography variant='body1'>
                Xác nhận cập nhật{' '}
                <span className='text-green-600'>+10 điểm</span> cho{' '}
                <strong>{props?.userData?.name}</strong>?
              </Typography>

              <Typography variant='body2' className='mt-3'>
                Ngày cập nhật: {moment(new Date()).format('DD-MM-YYYY')}
              </Typography>
              {error && (
                <Typography
                  variant='body2'
                  className='mt-3'
                  color='secondary.light'
                >
                  Đã xảy ra lỗi, vui lòng thử lại sau!
                </Typography>
              )}
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {success ? (
          <>
            <Button
              onClick={props.handleClose}
              variant='contained'
              size='small'
              startIcon={<CloseIcon />}
            >
              Thoát
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={props.handleClose}
              variant='outlined'
              size='small'
              startIcon={<CloseIcon />}
            >
              Hủy bỏ
            </Button>
            <Button
              type='submit'
              variant='contained'
              size='small'
              disabled={loading}
              startIcon={<SaveIcon />}
            >
              Cập nhật
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
