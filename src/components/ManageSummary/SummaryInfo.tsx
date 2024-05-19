/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

import { IBooking } from '../BookingEntrance/types';

type TSummaryInfo = {
  bookings: IBooking[];
};

const SummaryInfo = (props: TSummaryInfo) => {
  const servicesCounter: any = {};
  const barberCounter: any = {};

  props.bookings.map((item) => {
    if (item.services) {
      item.services.forEach((sItem) => {
        if (sItem.name in servicesCounter) {
          servicesCounter[sItem.name] = servicesCounter[sItem.name] + 1;
        } else {
          servicesCounter[sItem.name] = 1;
        }
      });
    }
    if (item.barber) {
      if (item.barber.name in barberCounter) {
        barberCounter[item.barber.name] = barberCounter[item.barber.name] + 1;
      } else {
        barberCounter[item.barber.name] = 1;
      }
    }
  });

  return (
    <div className='rounded  bg-white w-full text-black'>
      <div className='border-b-2 mb-2'>
        <div className=''>
          <Typography variant='body1'>
            Tổng số đơn đặt:
            <span className='text-black text-medium ml-1'>
              {props.bookings.length}
            </span>
          </Typography>

          <Typography variant='body1'>
            Thành tiền:
            <span className='text-black text-medium ml-1'>
              {props?.bookings?.reduce((acc, current) => {
                return (
                  acc +
                  current?.services?.reduce(
                    (acc2, current2) => acc2 + current2?.price,
                    0
                  )
                );
              }, 0)}
            </span>
          </Typography>
        </div>
      </div>
      <div className='mb-4'>
        <Typography variant='body1'>Theo dịch vụ</Typography>

        <TableContainer component={Paper}>
          <Table size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell>Dịch vụ</TableCell>
                <TableCell align='right'>Số đơn</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(servicesCounter).map((key) => (
                <TableRow
                  key={key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell scope='row'>{key}</TableCell>
                  <TableCell align='right'>{servicesCounter[key]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className='mb-4'>
        <Typography variant='body1'>Theo Barber</Typography>
        <TableContainer component={Paper}>
          <Table size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell>Barber</TableCell>
                <TableCell align='right'>Số đơn</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(barberCounter).map((key) => (
                <TableRow
                  key={key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell scope='row'>{key}</TableCell>
                  <TableCell align='right'>{barberCounter[key]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default SummaryInfo;
