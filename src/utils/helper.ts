import moment from "moment";

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

export const bookingEmailTemplate = (bookingItem: any) => {
  return `
	<div style="background: #fcf9f5; padding: 25px; border-radius: 10px">
      <h2 style="text-align:center; margin-bottom:25px">Thông báo có lịch hẹn cắt tóc mới</h2>
      <div>Xin chào <b>${bookingItem.barber.name}</b>,</div>
      <div>Bạn có một lịch hẹn cắt tóc:</div>
      <ul>
          <li>Tên khách hàng: ${bookingItem.name}</li>
          <li>Số điện thoại: ${bookingItem.phone}</li>
          <li>Chỉ định người cắt: <b>${bookingItem.barber.name}</b></li>
          <li>Thời gian: ${moment(bookingItem.datetime.date?.toString()).format('DD/MM/YYYY')} &nbsp;${getTimeRange(bookingItem.datetime.time)}</li>
          <li>Dịch vụ: ${bookingItem.services.map((s: any) => `${s.title}(${s.priceLabel})`).join(', ')}</li>
          <li>Tạm tính: ${getSubTotal(bookingItem)} VND</li>
          ${bookingItem.notes ? `<li>Ghi chú: ${bookingItem.notes}</li>` : ''}
      </ul>
      
      <div style="margin-bottom: 20px"><i>Đây là email tự động, vui lòng không phản hồi lại email này.</i></div>
      
      
      <div>Xin cảm ơn,</div>
      <div>Roy Barber Shop team.</div>
    </div>
  `
}