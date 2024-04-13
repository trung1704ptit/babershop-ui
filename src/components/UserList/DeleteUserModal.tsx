import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

import { IUserData } from '.';

interface IProps {
  handleClose: () => void;
  userData: IUserData;
}

export default function DeleteUserModal(props: IProps) {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  return (
    <Dialog
      open={true}
      onClose={props.handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setSuccess(true);
          }, 500);
        },
      }}
    >
      <DialogTitle>Xóa tài khoản</DialogTitle>
      <DialogContent style={{ minWidth: '320px' }}>
        <DialogContentText>
          {success ? (
            <div className='justify-center text-center'>
              <CheckCircleIcon className='text-green-600 h-[100px] w-[100px]'></CheckCircleIcon>
              <Typography variant='body1' gutterBottom>
                Xóa tài khoản thành công!
              </Typography>
            </div>
          ) : (
            <Typography variant='body1'>
              Xác nhận xóa tài khoản{' '}
              <Typography variant='subtitle2'>
                {props?.userData?.name}?
              </Typography>
            </Typography>
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
              color='error'
              disabled={loading}
              startIcon={<DeleteIcon />}
            >
              Xác nhận Xóa
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
