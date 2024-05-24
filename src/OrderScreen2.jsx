import { Link } from "react-router-dom"
import axios from "axios";
import { useState, useEffect, useContext } from "react"
import SelectedMenu from "./SelectedMenu"
import Menu from './Menu'
import setSelectedCustomer from './OrderScreen'
import selectedCustomer from "./OrderScreen";
import OrderScreen from "./OrderScreen";

const NewOrder = ({ getOrder })
// get selectedCustomer from OrderScreen
async function getOrder({ setOrder }){
    try {
        const orderApi = await axios.get("http://127.0.0.1:8000/customerOrders/");
        const orderData = await orderApi.data.filter(order => order.id == selectedCustomer.id)
        orderData = orderData.filter()
    } catch (error) {
        ;
    }
}


function OrderScreen2() {
    const [ selectedCustomer, setSelectedCustomer] = useState([])
    
    useEffect(() => {
        setSelectedCustomer()
    }, [])
    
    console.log(selectedCustomer)
    return (
        <div className = 'p-5'>
            <img src = 'https://http.cat/202'></img>
        </div>
    )
}

export default OrderScreen2

// select pickup time 
// select food and quantity and add to cart
    // this adds one Order to CustomerOrder
// cart displays CustomerOrder s where paid = False
// checking out sets paid to True, so those CustomerOrder s are removed from cart
// complete can be set to True (only if paid == True)