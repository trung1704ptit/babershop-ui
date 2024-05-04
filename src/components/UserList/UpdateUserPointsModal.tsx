import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Divider, Typography } from '@mui/material';
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

  try {
    const userPoints =
      props?.userData?.points?.[props?.userData?.points?.length - 1]?.points ||
      0;

    const { services } = props.userData;
    const tenPlusService = services?.find((s) => s.name.includes('10+2'));
    const sHistoryList = props.userData.user_services_history;
    const lastHistoryCount = sHistoryList[sHistoryList.length - 1]?.count || 0;

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
              if (lastHistoryCount != 12 && lastHistoryCount != 11) {
                await api.post('/api/points', {
                  user_id: props.userData.id,
                });
              }

              if (tenPlusService && lastHistoryCount + 1 <= 12) {
                await api.post('/api/services/history', {
                  user_id: props.userData.id,
                  service_id: tenPlusService?.id,
                });
              }

              setLoading(false);
              setSuccess(true);
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
                  Cập nhật thành công
                </Typography>
                <Typography variant='body2'>
                  Ngày cập nhật {moment(new Date()).format('DD-MM-YYYY')}
                </Typography>
              </div>
            ) : (
              <>
                {lastHistoryCount + 1 >= 11 && (
                  <>
                    <Typography variant='body1'>
                      Cập nhật <span className='text-green-600'>+10 điểm</span>{' '}
                      cho tài khoản <strong>{props?.userData?.name}</strong>
                    </Typography>
                    <Typography variant='body1'>
                      Tổng điểm sẽ là: {userPoints + 10} điểm
                    </Typography>
                  </>
                )}

                {tenPlusService && (
                  <>
                    <Divider className='mt-4 mb-4' />
                    {lastHistoryCount + 1 > 12 ? (
                      <>
                        <Typography variant='body1'>
                          Gói cước 10+2 đã kết thúc
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography variant='body1'>
                          Cập nhật{' '}
                          <span className='text-green-600'>+1 lần cắt </span>cho
                          gói cưới 10+2
                        </Typography>

                        <Typography variant='body1'>
                          Số lần cắt sẽ là: {lastHistoryCount + 1}{' '}
                          {lastHistoryCount + 1 >= 11 ? '(Miễn phí)' : ''}
                        </Typography>
                      </>
                    )}
                  </>
                )}

                <Typography variant='body2' className='mt-3 italic'>
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
        <DialogActions className='p-3'>
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
  } catch (error) {
    console.log(error);
    return null;
  }
}
