/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";

import { IUserData } from "../components/UserList";

export const getTimeRange = (time: number) => {
  if (!time) time = 8;
  let text = `${time}h - ${time}h:30`

  if (!Number.isInteger(time)) {
    text = `${time - 0.5}h:30 - ${time + 0.5}h`
  }
  return text;
}

export const getQueryValue = (key: string) => {
  if (typeof window !== undefined) {
    const url = new URL(window.location.href);
    const search_params = url.searchParams;

    const value = search_params.get(key);
    if (value) return value;
    return '';
  }
  return '';
}

export const getSubTotal = (booking: any) => {
  let total = 0;
  booking.services.forEach((s: any) => {
    const currentVal: string = s.price.replace('k', '000');
    const valNum = parseFloat(currentVal);
    total += valNum
  })

  return total;
}

export const bookingEmailTemplate = (bookingRes: any) => {
  try {
    return `
    <div style="background: #fcf9f5; padding: 25px; border-radius: 10px">
        <h2 style="text-align:center; margin-bottom:25px">Thông báo lịch hẹn cắt tóc</h2>
        <div>Xin chào,</div>
        <div>Bạn có một lịch hẹn cắt tóc:</div>
        <ul>
            <li>Tên khách hàng: ${bookingRes.guest.name}</li>
            <li>Số điện thoại: ${bookingRes.guest.phone}</li>
            <li>Chỉ định người cắt: <b>${bookingRes.barber.name}</b></li>
            <li>Thời gian: ${moment(bookingRes.booking_time).format('DD/MM/YYYY HH:mm')}</li>
            <li>Dịch vụ: ${bookingRes.services.map((s: any) => `${s.name}(${s.price_text})`).join(', ')}</li>
            ${bookingRes.notes ? `<li>Ghi chú: ${bookingRes.notes}</li>` : ''}
        </ul>
        
        <div style="margin-bottom: 20px"><i>Đây là email tự động, vui lòng không phản hồi lại email này.</i></div>
        <div>Xin cảm ơn,</div>
        <div><b>Roy Barber Shop</b> team</div>
      </div>
    `
  } catch (error) {
    return '';
  }
}

export const getLastPoint = (userData: IUserData) => {
  let currentPoints = 0;
  if (userData?.points) {
    const lastPoint = userData?.points[userData.points.length - 1];
    if (lastPoint) {
      currentPoints = lastPoint.points;
    }
  }

  return currentPoints;
}

export const toISOString = (date: any) => {
  return moment(date).format('YYYY-MM-DDT00:00:00') + '+07:00';
}

export function addMinutes(date: Date, minutes: number) {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return newDate;
}