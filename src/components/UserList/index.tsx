import { Button, TablePagination, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

interface Column {
  id: 'name' | 'phone' | 'points' | 'email' | 'birthday' | 'action';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'phone', label: 'Phone', minWidth: 100 },
  { id: 'birthday', label: 'Birthday', minWidth: 100 },
  {
    id: 'points',
    label: 'Points',
    minWidth: 170,
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
  },
];

interface IData {
  name: string;
  phone: string;
  birthday: string;
  points: number;
  email?: string;
}

function createData(
  name: string,
  phone: string,
  birthday: string,
  points: number,
  email?: string
): IData {
  return { name, phone, birthday, points, email };
}

const rows = [
  createData('Anh A', '08973i22', '10-02-1993', 40, undefined),
  createData('Anh B', '098322223', '10-02-1993', 40, undefined),
  createData('Anh Nghia', '08734222', '10-02-1993', 40, undefined),
  createData('Anh ABC', '083789232', '10-02-1993', 40, undefined),
  createData('Anh Jonathan', '08973222', '10-02-1993', 30, undefined),
  createData('Anh Beckham', '0987838922', '10-02-1993', 40, 'abc@gmail.com'),
];

const UserList = () => {
  const [search, setSearch] = React.useState('');
  const [data, setData] = React.useState(rows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

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
    const val = event.target.value;
    setSearch(val);
    const filterData = rows.filter((item: IData) => {
      if (
        item?.name?.toLowerCase().includes(val?.toLowerCase()) ||
        item?.phone?.toLowerCase().includes(val?.toLowerCase()) ||
        item?.points.toString().includes(val?.toLowerCase()) ||
        item?.email?.toLowerCase().includes(val?.toLowerCase()) ||
        item?.birthday?.toLowerCase().includes(val?.toLowerCase())
      ) {
        return item;
      }
      return null;
    });

    setData(filterData);
  };

  return (
    <div>
      <Typography variant='h6' className='mb-3'>
        Danh sách User đang tích điểm
      </Typography>

      <TextField
        id='outlined-basic'
        label='Tìm kếm'
        variant='outlined'
        placeholder='Tìm theo tên, SĐT,...'
        className='mb-3'
        size='small'
        onChange={handleChangeSearch}
        value={search}
      />
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
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.phone}>
                    {columns.map((column) => {
                      if (column.id === 'action') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Button variant='contained' size='small'>
                              Edit
                            </Button>
                          </TableCell>
                        );
                      }
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
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
        rowsPerPageOptions={[25, 50, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default UserList;
