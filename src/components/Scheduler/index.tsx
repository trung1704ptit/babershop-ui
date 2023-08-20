import { Scheduler } from "@aldabil/react-scheduler";
import type {
  ProcessedEvent,
  SchedulerHelpers
} from "@aldabil/react-scheduler/types";
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from "@mui/material";
import { collection, deleteDoc, doc, query, updateDoc, where } from "firebase/firestore";
import { onSnapshot } from 'firebase/firestore'
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Stylist from "../BookingEntrance/Stylist";
import Loading from "../Loading";
import addData from "../../firebase/addData";
import { BOOKING_COLLECTION, db } from "../../firebase/config";
import { IBookingItem } from "../../interface/pages/booking";
import { SERVICES, STATUS } from "../../utils/constants";
import { getQueryValue, getTimeRange } from "../../utils/helper";


const SchedulerComp = () => {
  const [bookingList, setBookingList] = useState<IBookingItem[]>([])
  const [loading, setLoading] = useState(true);
  const router = useRouter()

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
        const barberFilter = getQueryValue('barber');
        const statusFitler = getQueryValue('status');

        const args: [any, any, any] = [
          dbRef,
          where("datetime.date", ">=", startDate),
          where("datetime.date", "<", nextDate)
        ]

        if (barberFilter && barberFilter !== 'all') {
          args.push(where('barber.name', "==", barberFilter))
        }
        if (statusFitler && statusFitler !== 'all') {
          args.push(where('status', "==", statusFitler))
        }

        const queryString = query(...args)

        // let queryString = query(dbRef, where("datetime.date", ">=", startDate), where("datetime.date", "<", nextDate))
        // if (barberFilter && barberFilter !== 'all') {
        //   queryString = query(dbRef, where("datetime.date", ">=", startDate), where("datetime.date", "<", nextDate), where('barber.name', "==", barberFilter))
        // }
        const updatedData: IBookingItem[] = [];
        onSnapshot(queryString, qSnapshot => {
          setLoading(true);
          qSnapshot.forEach((doc: any) => {
            const docData = doc.data();
            updatedData.push({ id: doc.id, ...docData })
          })

          setBookingList(updatedData)

          setLoading(false);
        })
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    if (typeof window !== undefined) {
      queryData()

      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [router])

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
    const isDone = item.status === STATUS.DONE;

    return {
      event_id: item.id,
      title: isDone ? `${item.name} - Đã cắt` : item.name,
      start: startDate,
      end: endDate,
      admin_id: item.phone,
      color: isDone ? '#7e848f' : item.barber.color,
      phone: item.phone,
      name: item.name,
      barber: item.barber,
      services: item.services,
      notes: item.notes,
      id: item.id,
      datetime: {
        date: new Date(item.datetime.date.toDate().toDateString()),
        time: item.datetime.time
      },
      status: item.status
    }
  })

  if (loading) {
    return <div className="w-full h-[400px] flex">
      <div className="m-auto"><Loading /></div>
    </div>
  }

  const handleDoneItem = (id: string, status: string) => {
    if (id) {
      const docRef = doc(db, BOOKING_COLLECTION, id);
      if (status === STATUS.DONE) {
        status = STATUS.OPEN;
      } else if (status === STATUS.OPEN) {
        status = STATUS.DONE;
      }
      updateDoc(docRef, { status })
        .then(() => {
          location.reload();
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  const handleDelete = async (deletedId: string): Promise<string> => {
    return new Promise((res, _) => {
      deleteDoc(doc(db, BOOKING_COLLECTION, deletedId));
      res(deletedId);
    });
  };

  return (
    <div className="bg-white p-2 rounded-lg">
      <Scheduler
        events={events}
        view="week"
        day={null}
        hourFormat="24"
        onDelete={handleDelete}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 6,
          startHour: 8,
          endHour: 20,
          step: 30
        }}
        viewerExtraComponent={(_, event) => {
          return (
            <div>
              <div>- Tên khách hàng: {event.name}</div>
              <div>- SĐT: {event.phone}</div>
              <div>- Chỉ định người cắt: {event.barber.name}</div>
              <div>- Thời gian: {moment(event.start?.toString()).format('DD/MM/YYYY')} {getTimeRange(event?.datetime?.time)}</div>
              <div>- Gói dịch vụ: {event.services.map((item: any) => `${item.title}(${item.price})`).join(', ')}</div>
              {event.notes && <div>- Ghi chú: {event.notes}</div>}
              <div>- Trạng thái: {event.status === STATUS.DONE ? 'Đã cắt' : 'Chưa cắt'}</div>
              <div className="mt-3 mb-3"><button className=" bg-[#9f6e0dd4] text-white px-3 py-1 rounded outline-none focus:outline-none m-auto select-btn-barber" onClick={() => handleDoneItem(event.id, event.status || STATUS.OPEN)}>{event.status === STATUS.DONE ? 'Mở lại' : 'Xác nhận cắt xong'}</button></div>
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
    id: event?.id,
    name: event?.name || "",
    notes: event?.notes || "",
    phone: event?.phone || "",
    services: event?.services || [],
    datetime: event?.datetime || { date: new Date(), time: 8 },
    barber: event?.barber || { name: '', color: '' },
    status: event?.status || 'open'
  });
  const [error, _] = useState("");
  const [clickedOnBarber, setClickedOnBarber] = useState(false);


  const handleChange = (value: string, name: string) => {
    setState((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const onClickOnBarberSection = (event: any) => {
    if (event?.target?.classList?.contains("select-btn-barber")) {
      setClickedOnBarber(true);
    }
  }

  const handleBackBarber = () => {
    setClickedOnBarber(false);
  }

  const finalUpdate = async (data: any) => {
    const newState = {
      ...state,
      barber: {
        name: data.barber.name,
        color: data.barber.color
      },
      datetime: data.datetime
    }

    let startHour = newState.datetime.time;
    let startMinute = 0
    let endHour = newState.datetime.time;
    let endMinute = 30
    if (!Number.isInteger(newState.datetime.time)) {
      startHour = startHour - 0.5
      startMinute = 30;
      endHour = newState.datetime.time + 0.5;
      endMinute = 0;
    }

    const startDate = new Date(newState.datetime.date.setHours(startHour, startMinute, 0));

    const endDate = new Date(newState.datetime.date.setHours(endHour, endMinute, 0));

    try {
      const updated_event = (await new Promise((res) => {
        res({
          id: event?.id,
          event_id: event?.event_id || Math.random(),
          title: newState.name,
          name: newState.name,
          start: startDate,
          end: endDate,
          admin_id: newState.phone,
          color: newState.barber.color,
          phone: newState.phone,
          barber: newState.barber.name,
          time: newState.datetime.time,
          services: newState.services,
          notes: newState.notes,
          statis: newState.status
        });
      })) as ProcessedEvent;

      const dataForFirebaseUpdate = {
        phone: newState.phone,
        barber: newState.barber,
        datetime: newState.datetime,
        services: newState.services,
        notes: newState.notes,
        id: newState.id,
        name: newState.name,
        status: newState.status
      }

      if (!newState.services || !newState.services.length || !newState?.barber.name) {
        toast.error('Cần hoàn thiện các thông tin', {
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true
        });
      } else {
        scheduler.onConfirm(updated_event, event ? "edit" : "create");

        if (!newState.id) {
          const newId = new Date().getTime().toString();
          dataForFirebaseUpdate.id = newId;
          addData(BOOKING_COLLECTION, newId, dataForFirebaseUpdate)
        } else {
          const docRef = doc(db, BOOKING_COLLECTION, newState.id);
          updateDoc(docRef, dataForFirebaseUpdate)
            .then(() => {
              location.reload();
            })
            .catch(error => {
              console.log(error);
            })
        }
        scheduler.close();
      }
    } finally {
      scheduler.loading(false);
    }

    setState(newState)
  }

  const handleServicesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let newServices = [...state.services];
    if (checked) {
      const finder = SERVICES.find(item => item.id === value);
      if (finder) {
        newServices.push({
          id: finder.id,
          title: finder.title,
          price: finder.price,
        })
      }
    } else {
      newServices = newServices.filter(item => item.id !== value);
    }

    setState(prev => ({ ...prev, services: newServices }))
  }

  return (
    <div>
      <div className="absolute right-3 top-3 text-lg cursor-pointer" onClick={scheduler.close}><CloseIcon /></div>
      <div style={{ padding: "1rem" }}>
        <h3 className="text-medium mb-4">Chỉnh sửa thông tin đặt lịch</h3>
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


        {SERVICES?.map(item => (
          <div key={item.id}>
            <input type="checkbox" id={item.id} name={item.id} value={item.id} className="mr-2 font-medium" defaultChecked={state.services?.find((s: any) => s.id === item.id)} onChange={handleServicesChange} />
            <label htmlFor={item.id}>{item.title} - {item.price}</label>
          </div>
        ))}
        <div className="border-t m-3" />

        <div onClick={onClickOnBarberSection}>
          <Stylist
            handleContinue={finalUpdate}
            title=""
            marginTop="0"
            handleBackToBarberCallBack={handleBackBarber}
            defaultDatetime={state.datetime}
          />
        </div>

        {!clickedOnBarber && <div className="align-right mt-3">
          <button className="border-gray-300 border mr-2 px-4 py-2 rounded outline-none focus:outline-none select-btn-barber" onClick={scheduler.close}>Hủy</button>
          <button className="bg-[#9f6e0dd4] text-white px-4 py-2 rounded outline-none focus:outline-none m-auto select-btn-barber" onClick={() => finalUpdate(state)}>Cập nhật</button>
        </div>}
      </div>
    </div >
  );
};

export default SchedulerComp;