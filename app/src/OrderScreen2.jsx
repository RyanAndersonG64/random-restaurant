import { Link } from "react-router-dom"
import axios from "axios";
import { useState, useEffect, useContext } from "react"
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SelectedMenu from "./SelectedMenu"
import Menu from './Menu'
import OrderScreen from "./OrderScreen";
import TimePickerValue from "./TimeSelect";
import { CustomerContext } from './customercontext'

const NewOrder = ({ getOrder })
async function getOrder({ setOrder }) {
    try {
        const orderApi = await axios.get("http://127.0.0.1:8000/customerOrders/");
        const orderData = await orderApi.data.filter(order => order.id == selectedCustomer.id)
        orderData.filter()
    } catch (error) {
        ;
    }
}

``
function OrderScreen2() {
    const { selectedCustomer, setSelectedCustomer } = useContext(CustomerContext)
    const [pickupTime, setPickupTime] = useState('12:00');



    console.log(selectedCustomer)
    return (
        <div className='p-5'>
            {selectedCustomer.name}
            <br></br>
            <div>
                <TimePicker onChange={setPickupTime} value={pickupTime} />
            </div>
            <br></br>
            {pickupTime}
        </div>
    )
}

export default OrderScreen2

// select pickup time, only times in the future are available(no dates, can only place orders for current day)
// select food and quantity and add to cart
// this adds one OrderItem to CustomerOrder
// cart displays CustomerOrder(s) where paid === False and Customer === SelectedCustomer.id
// checking out sets paid to True, so those CustomerOrder(s) are removed from cart
// complete can be set to True (only if paid == True)
