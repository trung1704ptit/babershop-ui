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

import { IService } from '.';
import api from '../../utils/api';

interface IProps {
  callbackExit: () => void;
  serviceData: IService;
}

export default function DeleteServiceModal(props: IProps) {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  return (
    <Dialog
      open={true}
      onClose={props.callbackExit}
      PaperProps={{
        component: 'form',
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          try {
            setLoading(true);
            const res = await api.delete(
              `/api/services/${props.serviceData.id}`
            );
            if (res.status === 204) {
              setSuccess(true);
              setLoading(false);
            }
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
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
                Xóa dịch vụ thành công!
              </Typography>
            </div>
          ) : (
            <Typography variant='body1'>
              Xác nhận xóa dịch vụ <strong>{props?.serviceData?.name}</strong>?
            </Typography>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {success ? (
          <>
            <Button
              onClick={props.callbackExit}
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
              onClick={props.callbackExit}
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
