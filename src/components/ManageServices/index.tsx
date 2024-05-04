import AddIcon from '@mui/icons-material/Add';
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

import AddNewServiceModal from './AddNewServiceModal';
import DeleteServiceModal from './DeleteServiceModal';
import UpdateServiceModal from './UpdateServiceModal';
import api from '../../utils/api';

interface Column {
  id: 'name' | 'image' | 'price' | 'price_text' | 'description' | 'action';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: any) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Tên', minWidth: 170 },
  { id: 'image', label: 'Hình ảnh', minWidth: 100 },
  {
    id: 'price',
    label: 'Giá',
    minWidth: 100,
  },
  {
    id: 'price_text',
    label: 'Giá rút gọn',
    minWidth: 100,
  },
  {
    id: 'description',
    label: 'Mô tả',
    minWidth: 100,
  },
  {
    id: 'action',
    label: 'Hành động',
    minWidth: 100,
  },
];

export interface IService {
  id?: string;
  name: string;
  image: string;
  price: number;
  price_text: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

const ServiceList = () => {
  const [search, setSearch] = useState('');
  const [services, setServices] = useState<IService[]>([]);
  const [servicesFilter, setServicesFitler] = useState<IService[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [openAddServiceDrawer, setOpenAddServiceDrawer] = useState(false);
  const [serviceToUpdate, setServiceToUpdate] = useState<IService>();
  const [serviceToDelete, setServiceToDelete] = useState<IService>();
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
    const filterServices = services.filter((item: IService) => {
      if (
        item?.name?.toLowerCase()?.includes(val?.toLowerCase()) ||
        item?.price_text?.toLowerCase()?.includes(val?.toLowerCase()) ||
        item?.price?.toString()?.includes(val?.toLowerCase()) ||
        item?.description?.toLowerCase()?.includes(val?.toLowerCase())
      ) {
        return item;
      }
      return null;
    });

    setServicesFitler(filterServices);
  };

  const handleAddService = () => {
    setOpenAddServiceDrawer(true);
  };

  const handleUpdateServiceModal = (serviceDetail: IService) => {
    setServiceToUpdate(serviceDetail);
  };

  const fetchServiceList = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/services');
      if (res?.status == 200) {
        const servicesData = res.data.data;
        setServices(servicesData);
        setServicesFitler(servicesData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceList();
  }, []);

  const handleAddServiceDone = () => {
    setOpenAddServiceDrawer(false);
    fetchServiceList();
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
        Danh sách Dịch vụ
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
        onClick={handleAddService}
      >
        Thêm mới dịch vụ
      </Button>

      {openAddServiceDrawer && (
        <Drawer
          anchor='right'
          open={true}
          onClose={() => setOpenAddServiceDrawer(false)}
        >
          <Box className='p-4'>
            <AddNewServiceModal callbackExit={handleAddServiceDone} />
          </Box>
        </Drawer>
      )}

      {serviceToUpdate && (
        <UpdateServiceModal
          callbackExit={() => {
            setServiceToUpdate(undefined);
            fetchServiceList();
          }}
          serviceData={serviceToUpdate}
        />
      )}

      {serviceToDelete && (
        <DeleteServiceModal
          callbackExit={() => {
            setServiceToDelete(undefined);
            fetchServiceList();
          }}
          serviceData={serviceToDelete}
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
            {servicesFilter
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((service) => {
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={service.id}
                  >
                    {columns.map((column) => {
                      if (column.id === 'action') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Button
                              variant='outlined'
                              size='small'
                              className='mr-2 mt-1'
                              onClick={() => handleUpdateServiceModal(service)}
                              startIcon={<EditIcon />}
                            >
                              Sửa
                            </Button>
                            <Button
                              variant='outlined'
                              color='error'
                              size='small'
                              className='mr-2 mt-1'
                              onClick={() => setServiceToDelete(service)}
                              startIcon={<DeleteIcon />}
                            >
                              Xóa
                            </Button>
                          </TableCell>
                        );
                      }
                      const value = service[column.id];
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
        count={servicesFilter.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ServiceList;
