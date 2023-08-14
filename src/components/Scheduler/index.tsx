import { Scheduler } from "@aldabil/react-scheduler";
import type {
  SchedulerHelpers
} from "@aldabil/react-scheduler/types";
import { Button, TextField } from "@mui/material";
import { collection, query, where } from "firebase/firestore";
import { onSnapshot } from 'firebase/firestore'
import moment from "moment";
import { useEffect, useState } from "react";

import Stylist from "../BookingEntrance/Stylist";
import Loading from "../Loading";
import { BOOKING_COLLECTION, db } from "../../firebase/config";
import { IBookingItem } from "../../interface/pages/booking";
import { SERVICES } from "../../utils/constants";
import { getTimeRange } from "../../utils/helper";


const SchedulerComp = () => {
  const [bookingList, setBookingList] = useState<IBookingItem[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryData = (): void => {
      try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 1)
        startDate.setHours(0, 0, 0, 0);
        const nextDate = new Date(startDate)
        nextDate.setDate(startDate.getDate() + 6)
        nextDate.setHours(0, 0, 0, 0);
        const dbRef = collection(db, BOOKING_COLLECTION);
        const queryString = query(dbRef, where("datetime.date", ">=", startDate), where("datetime.date", "<", nextDate))
        const updatedData: IBookingItem[] = [];


        onSnapshot(queryString, qSnapshot => {
          setLoading(true);
          qSnapshot.forEach((doc: any) => {
            updatedData.push(doc.data() as IBookingItem)
          })

          setBookingList(updatedData)

          setTimeout(() => {
            setLoading(false);
          }, 200)
        })
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    queryData()
  }, [])

  const events = bookingList?.map(item => {
    let startHour = item.datetime.time;
    let startMinute = 0
    let endHour = item.datetime.time;
    let endMinute = 30
    if (!Number.isInteger(item.datetime.time)) {
      startHour = startHour - 0.5
      startMinute = 30;
      endHour = item.datetime.time + 0.5;
      endMinute = 0;
    }

    const startDate = new Date(new Date(item.datetime.date.toDate().toDateString()).setHours(startHour, startMinute, 0));

    const endDate = new Date(new Date(item.datetime.date.toDate().toDateString()).setHours(endHour, endMinute, 0));

    return {
      event_id: item.phone,
      title: item.name,
      start: startDate,
      end: endDate,
      admin_id: item.phone,
      color: item.barber.color,
      phone: item.phone,
      name: item.name,
      barber: item.barber.name,
      time: item.datetime.time,
      services: item.services,
      notes: item.notes
    }
  })

  if (loading) {
    return <div className="w-full h-[400px] flex">
      <div className="m-auto"><Loading /></div>
    </div>
  }

  return (
    <div className="bg-white p-2 rounded-lg rs_scheduler">
      <Scheduler
        events={events}
        view="week"
        day={null}
        hourFormat="24"
        // timeZone={7}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 6,
          startHour: 8,
          endHour: 22,
          step: 30
        }}
        viewerExtraComponent={(_, event) => {
          return (
            <div>
              <div>- Tên khách hàng: {event.name}</div>
              <div>- SĐT: {event.phone}</div>
              <div>- Chỉ định người cắt: {event.barber}</div>
              <div>- Thời gian: {moment(event.start?.toString()).format('DD/MM/YYYY')} {getTimeRange(event.time)}</div>
              <div>- Gói dịch vụ: {event.services.map((item: any) => `${item.title}(${item.price})`).join(', ')}</div>
              {event.notes && <div>- Ghi chú: {event.notes}</div>}
            </div>
          );
        }}
        translations={
          {
            navigation: {
              month: "Tháng",
              week: "Tuần",
              day: "Ngày",
              today: "Hôm nay",
            },
            form: {
              addTitle: "Thêm sự kiện",
              editTitle: "Sửa sự kiện",
              confirm: "Xác nhận",
              delete: "Xóa",
              cancel: "Hủy"
            },
            event: {
              title: "Tên",
              start: "Bắt đầu",
              end: "Kết thúc",
              allDay: "Cả ngày"
            },
            validation: {
              required: "Bắt buộc",
              invalidEmail: "Email không đúng",
              onlyNumbers: "Only Numbers Allowed",
              min: "Minimum {{min}} letters",
              max: "Maximum {{max}} letters"
            },
            moreEvents: "More...",
            loading: "Loading..."
          }
        }
        customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
      />
    </div>
  )
}

interface CustomEditorProps {
  scheduler: SchedulerHelpers;
}
const CustomEditor = ({ scheduler }: CustomEditorProps) => {
  const event = scheduler.edited;

  // Make your own form/state
  const [state, setState] = useState({
    name: event?.name || "",
    notes: event?.notes || "",
    phone: event?.phone || "",
    services: event?.services || '',
    datetime: event?.datetime || { date: new Date(), time: 8 }
  });
  const [error, _] = useState("");

  const handleChange = (value: string, name: string) => {
    setState((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };


  // const handleSubmit = async () => {
  //   // Your own validation
  //   if (state.name.length < 3) {
  //     return setError("Min 3 letters");
  //   }

  //   try {
  //     scheduler.loading(true);

  //     /**Simulate remote data saving */
  //     const added_updated_event = (await new Promise((res) => {
  //       /**
  //        * Make sure the event have 4 mandatory fields
  //        * event_id: string|number
  //        * title: string
  //        * start: Date|string
  //        * end: Date|string
  //        */
  //       setTimeout(() => {
  //         res({
  //           event_id: event?.event_id || Math.random(),
  //           title: state.name,
  //           start: scheduler.state.start?.value,
  //           end: scheduler.state.end?.value,
  //           notes: state.notes,
  //           name: state.name
  //         });
  //       }, 3000);
  //     })) as ProcessedEvent;

  //     scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
  //     scheduler.close();
  //   } finally {
  //     scheduler.loading(false);
  //   }
  // };


  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <p>Chỉnh sửa thông tin đặt lịch</p>
        <TextField
          label="Name"
          value={state.name}
          onChange={(e) => handleChange(e.target.value, "name")}
          error={!!error}
          helperText={error}
          size="small"
          fullWidth
          className="mb-3"
        />
        <TextField
          label="Phone"
          value={state.phone}
          onChange={(e) => handleChange(e.target.value, "phone")}
          error={!!error}
          helperText={error}
          size="small"
          fullWidth
          className="mb-3"
        />
        <TextField
          label="Ghi chú"
          size="small"
          value={state.notes}
          onChange={(e) => handleChange(e.target.value, "notes")}
          fullWidth
          className="mb-3"
        />
        {SERVICES.map(item => (
          <div key={item.id}>
            <input type="checkbox" id={item.id} name={item.id} value="Boat" className="mr-2 font-medium" />
            <label htmlFor={item.id}>{item.title} - {item.price}</label>
          </div>
        ))}
        <div className="border-t m-3" />

        <Stylist handleContinue={(data) => { console.log(data) }} title="" marginTop="0" renderCustomButton={(props) =>
        (<div className="align-right">
          <Button onClick={scheduler.close}>Hủy</Button>
          <Button onClick={props.handleContinue}>Cập nhật</Button>
        </div>)
        } />
      </div>
    </div >
  );
};

export default SchedulerComp;