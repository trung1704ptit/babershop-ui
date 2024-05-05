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
import { useEffect, useState } from 'react';

import AddNewUser from './AddNewUser';
import DeleteUserModal from './DeleteUserModal';
import UpdateUserInfo from './UpdateUserInfo';
import UpdateUserPointsModal from './UpdateUserPointsModal';
import useMobile from '../../hooks/useMobile';
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
    id: 'services',
    label: 'Dịch vụ',
    minWidth: 170,
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
  },
  {
    id: 'action',
    label: 'Hành động',
    minWidth: 170,
  },
];

export interface IPoint {
  id: string;
  points: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface IService {
  id: string;
  name: string;
  image: string;
  price: number;
  price_text: string;
  description?: string;
  count?: number;
  created_at: string;
  updated_at: string;
}

export interface IServiceHistory {
  id: string;
  user_id: string;
  service_id: string;
  count: number;
  created_at: string;
  updated_at: string;
}

export interface IUserData {
  id: string;
  name: string;
  phone: string;
  birthday: string;
  services?: IService[];
  services_history: IServiceHistory[];
  points?: IPoint[];
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
  const [services, setServices] = useState<IService[]>();
  const { isMobile } = useMobile();
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  if (usersFilter) {
    usersFilter.forEach((u) => {
      const { services, services_history } = u;
      services?.forEach((s) => {
        if (s.name.includes('10+2')) {
          s['count'] =
            services_history[services_history.length - 1]?.count || 0;
        }
      });
    });
  }

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
        item?.birthday?.toLowerCase()?.includes(val?.toLowerCase())
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
      const res = await api.get('/api/users');
      if (res?.status == 200) {
        const users = res.data.data;
        setUsers(users);
        setUsersFitler(users);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchServiceList = async () => {
    try {
      const res = await api.get('/api/services');
      if (res && res.status == 200) {
        const services = res.data.data;
        setServices(services);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserList();
    fetchServiceList();
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
        className='mb-2 mr-2'
        size='small'
        onChange={handleChangeSearch}
        value={search}
      />
      <Button
        variant='contained'
        className='mb-2'
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
          services={services}
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

      {isMobile ? (
        <div>
          {usersFilter.map((user) => {
            return (
              <Box
                component='section'
                sx={{
                  p: 2,
                  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 20px 0px',
                  marginBottom: '10px',
                }}
                key={user.id}
              >
                <Typography variant='body1'>Tên: {user.name}</Typography>
                <Typography variant='body1'>
                  Điện thoại: {user.phone}
                </Typography>
                <Typography variant='body1'>Email: {user.email}</Typography>
                <Typography variant='body1'>
                  Ngày sinh: {new Date(user.birthday).toLocaleDateString()}
                </Typography>
                <Typography variant='body1'>
                  Điểm: {user?.points?.[user?.points?.length - 1]?.points}
                </Typography>

                <Typography variant='body1'>
                  Dịch vụ:{' '}
                  {user?.services
                    ?.map((item: IService) => item.name + `: ${item.count} lần`)
                    .join(', ')}
                </Typography>
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
              </Box>
            );
          })}
        </div>
      ) : (
        <>
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
                          if (column.id === 'services') {
                            return (
                              <TableCell key={column.id}>
                                {user?.services
                                  ?.map(
                                    (item: IService) =>
                                      item.name + `: ${item.count} lần`
                                  )
                                  .join(', ')}
                              </TableCell>
                            );
                          }
                          if (column.id === 'points') {
                            return (
                              <TableCell key={column.id}>
                                {
                                  user?.points?.[user?.points?.length - 1]
                                    ?.points
                                }
                              </TableCell>
                            );
                          }
                          if (column.id === 'birthday') {
                            return (
                              <TableCell key={column.id}>
                                {new Date(user.birthday).toLocaleDateString()}
                              </TableCell>
                            );
                          }
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
        </>
      )}
    </div>
  );
};

export default UserList;
