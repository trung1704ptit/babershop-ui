import { Scheduler } from "@aldabil/react-scheduler";

export const EVENTS = [
  {
    event_id: 1,
    title: "Event 2",
    start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(10)).setMinutes(30)),
    admin_id: 1,
    color: "#50b500"
  }
];

const SchedulerComp = () => {
  return (
    <div className="bg-white p-2 rounded-lg">
      <Scheduler
        events={EVENTS}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 4,
          startHour: 8,
          endHour: 24,
          step: 30
        }}
      />
    </div>
  )
}

export default SchedulerComp;