import AddIcon from '@mui/icons-material/Add';
import AddLinkIcon from '@mui/icons-material/AddLink';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { useEffect, useState } from 'react';

import AddNewUser from './AddNewUser';
import DeleteUserModal from './DeleteUserModal';
import UpdateUserInfo from './UpdateUserInfo';
import UpdateUserPointsModal from './UpdateUserPointsModal';
import api from '../../utils/api';

interface Column {
  id:
    | 'name'
    | 'phone'
    | 'points'
    | 'email'
    | 'birthday'
    | 'action'
    | 'services';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: any) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Tên', minWidth: 170 },
  { id: 'phone', label: 'Số Điện Thoại', minWidth: 100 },
  {
    id: 'birthday',
    label: 'Ngày sinh',
    minWidth: 100,
  },
  {
    id: 'points',
    label: 'Điểm',
    minWidth: 50,
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
  },
  {
    id: 'services',
    label: 'Dịch vụ',
    minWidth: 170,
  },
  {
    id: 'action',
    label: 'Hành động',
    minWidth: 170,
  },
];

export interface IUserData {
  id: string;
  name: string;
  phone: string;
  birthday: string;
  points: number;
  services?: string;
  email?: string;
  role?: string;
  provider?: string;
  created_at: string;
  updated_at: string;
}

const UserList = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<IUserData[]>([]);
  const [usersFilter, setUsersFitler] = useState<IUserData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [openAddUserDrawer, setOpenAddUserDrawer] = useState(false);
  const [userToUpdatePoints, setUserToUpdatePoints] = useState<IUserData>();
  const [userToUpdate, setUserToUpdate] = useState<IUserData>();
  const [userToDelete, setUserToDelete] = useState<IUserData>();
  const [loading, setLoading] = useState(false);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value.toLowerCase();
    setSearch(event.target.value);
    const filterUsers = users.filter((item: IUserData) => {
      if (
        item?.name?.toLowerCase()?.includes(val?.toLowerCase()) ||
        item?.phone?.toLowerCase()?.includes(val?.toLowerCase()) ||
        item?.points?.toString()?.includes(val?.toLowerCase()) ||
        item?.email?.toLowerCase()?.includes(val?.toLowerCase()) ||
        item?.birthday?.toLowerCase()?.includes(val?.toLowerCase()) ||
        item?.services?.toLowerCase()?.includes(val?.toLowerCase())
      ) {
        return item;
      }
      return null;
    });

    setUsersFitler(filterUsers);
  };

  const handleAddUser = () => {
    setOpenAddUserDrawer(true);
  };

  const handleUpdateUserPoints = (userInfo: IUserData) => {
    setUserToUpdatePoints(userInfo);
  };

  const handleUpdateUserInfo = (userInfo: IUserData) => {
    setUserToUpdate(userInfo);
  };

  const fetchUserList = async () => {
    try {
      setLoading(true);
      setTimeout(async () => {
        const res = await api.get('/api/users');
        const users = res.data.data;
        users.forEach((user: IUserData) => {
          user.birthday = moment(user.birthday).format('DD-MM-YYYY');
        });
        setUsers(res.data.data);
        setUsersFitler(res.data.data);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleAddUserDone = () => {
    setOpenAddUserDrawer(false);
    fetchUserList();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }} className='w-full mt-[100px]'>
        <CircularProgress className='m-auto' />
      </Box>
    );
  }

  return (
    <div>
      <Typography variant='h6' className='mb-3'>
        Danh sách khách hàng
      </Typography>

      <TextField
        id='outlined-basic'
        label='Tìm kếm'
        variant='outlined'
        className='mb-3'
        size='small'
        onChange={handleChangeSearch}
        value={search}
      />
      <Button
        variant='contained'
        className='ml-2'
        startIcon={<AddIcon />}
        onClick={handleAddUser}
      >
        Thêm mới User
      </Button>

      {openAddUserDrawer && (
        <Drawer
          anchor='right'
          open={true}
          onClose={() => setOpenAddUserDrawer(false)}
        >
          <Box className='p-4'>
            <AddNewUser callbackExit={handleAddUserDone} />
          </Box>
        </Drawer>
      )}

      {userToUpdate && (
        <UpdateUserInfo
          callbackExit={() => {
            setUserToUpdate(undefined);
            fetchUserList();
          }}
          userData={userToUpdate}
        />
      )}

      {userToUpdatePoints && (
        <UpdateUserPointsModal
          handleClose={() => {
            setUserToUpdatePoints(undefined);
            fetchUserList();
          }}
          userData={userToUpdatePoints}
        />
      )}

      {userToDelete && (
        <DeleteUserModal
          handleClose={() => {
            setUserToDelete(undefined);
            fetchUserList();
          }}
          userData={userToDelete}
        />
      )}

      <TableContainer component={Paper}>
        <Table stickyHeader aria-label='sticky table' size='small'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {usersFilter
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((user) => {
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={user.phone}
                  >
                    {columns.map((column) => {
                      if (column.id === 'action') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Button
                              variant='outlined'
                              size='small'
                              className='mr-2 mt-1'
                              onClick={() => handleUpdateUserInfo(user)}
                              startIcon={<EditIcon />}
                            >
                              Cài đặt
                            </Button>
                            <Button
                              variant='contained'
                              size='small'
                              className='mr-2 mt-1'
                              onClick={() => handleUpdateUserPoints(user)}
                              startIcon={<AddLinkIcon />}
                            >
                              Tích điểm
                            </Button>
                            <Button
                              variant='outlined'
                              color='error'
                              size='small'
                              className='mr-2 mt-1'
                              onClick={() => setUserToDelete(user)}
                              startIcon={<DeleteIcon />}
                            >
                              Xóa
                            </Button>
                          </TableCell>
                        );
                      }
                      const value = user[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[50, 100]}
        component='div'
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default UserList;
