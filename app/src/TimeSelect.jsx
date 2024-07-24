import axios from "axios";
import { useState, useEffect, useContext } from "react"
import { CustomerContext } from './customercontext'
import { OrderContext } from "./ordercontext";
import { TimeContext } from "./timecontext";

const roundToNearest15 = (date) => {
  const minutes = date.getMinutes();
  const roundedMinutes = Math.ceil(minutes / 15) * 15;
  date.setMinutes(roundedMinutes);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

const generateTimeSlots = () => {
  let now = new Date();
  now = roundToNearest15(now);
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const timeSlots = [];
  const increment = 15 * 60 * 1000; // 15 minutes in milliseconds

  let currentTime = new Date(now);

  while (currentTime <= endOfDay) {
    timeSlots.push(new Date(currentTime));
    currentTime = new Date(currentTime.getTime() + increment);
  }

  return timeSlots;
};

const changePickupTime = ({ id, customer, dine_in, pickup_time, order_items, paid, complete}) => {
  return axios({
    method: 'patch',
    url: `http://127.0.0.1:8000/customerOrders/${id}/`,
    data: {
      id,
      customer,
      dine_in,
      pickup_time,
      order_items,
      paid,
      complete,
    },
  })
    .then((response) => {
      console.log('SET TIME: ', response);
      localStorage.setItem('order', JSON.stringify(response.data))
      return response;
    })
    .catch((error) => {
      console.log('ERROR: ', error);
    });
};

const TimeSelection = ({ onTimeSelect }) => {
  const [timeSlots, setTimeSlots] = useState([]);
  const { selectedTime, setSelectedTime } = useContext(TimeContext);
  const { currentOrder, setCurrentOrder } = useContext(OrderContext)
  const [time, setTime] = useState()

  useEffect(() => {
    const slots = generateTimeSlots();
    setTimeSlots(slots);
  }, []);

  const handleChange = (event) => {
    setTime(event.target.value);
    // onTimeSelect(event.target.value);
  };

  return (
    <div>
      <label htmlFor="time-select">Select Pickup Time: </label>&nbsp;
      <select id="time-select" value={time} onChange={handleChange}>
        <option value=''> -- </option>
        {timeSlots.map((time, index) => (
          <option key={index} value={time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </option>
        ))}
      </select>
      <button style={{ marginLeft: 1 }} onClick={() => {
        console.log(currentOrder)
        setSelectedTime(time)
        console.log(time.slice(0,5))
        changePickupTime ({id: currentOrder.id, pickup_time: time.slice(0,5)})
      }}>
        Set Pickup Time
      </button>
    </div>
  );
};

export default TimeSelection;