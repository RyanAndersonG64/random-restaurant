import { Link } from "react-router-dom"
import axios from "axios";
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";

import TimeSelection from "./TimeSelect";
import { CustomerContext } from './customercontext'
import { TimeContext } from "./timecontext";
import { OrderContext } from "./ordercontext";
import OrderingMenu from "./OrderingMenu";
import { ItemContext } from "./itemcontext";






async function getMenu({ setMenu }) {
    try {
        let menuItems = await axios.get("http://127.0.0.1:8000/menuitems/");
        const data = await menuItems.data;
        setMenu(data)
    } catch (error) {
        ;
    }
};

export const createOrder = ({ customer, pickup_time, dine_status }) => {
    return axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/customerOrders/',
        data: {
            customer,
            dine_in: false,
            pickup_time,
            paid: false,
            complete: false,
            dine_status,
        },
    })
        .then((response) => {
            console.log('CREATE ORDER: ', response);
            return response;
        })
        .catch((error) => {
            console.log('ERROR: ', error);
        });
};

const deleteOrder = ({ id }) => {
    return axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/customerOrders/${id}`,
        data: {
            id,
        },
    })
        .then((response) => {
            console.log('DELORTED');
            return response;
        })
        .catch((error) => {
            console.log('DELETE ORDER ERROR: ', error);
        });
}

export const findOrder = ({ customer }) => {
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/customerOrders/',
        data: {
            customer,
        }
    })
        .then((response) => {
            return response
        })
        .catch((error) => {
            console.log('FIND ORDER ERROR: ', error);
        });
}

export const findItems = ({ order }) => {
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/orderitems/',
        data: {
            order,
        }
    })
        .then((response) => {
            return response
        })
        .catch((error) => {
            console.log('FIND ORDER ERROR: ', error);
        });
}

const deleteItem = ({ item }) => {
    return axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/orderitems/${item}`,
        data: {
            item,
        },
    })
        .then((response) => {
            console.log('DELORTED ', response);
            return response;
        })
        .catch((error) => {
            console.log('ERROR: ', error);
        });
}

const checkOut = ({ order }) => {
    return axios({
        method: 'patch',
        url: `http://127.0.0.1:8000/check-out`,
        data: {
            order,
        },
    })
        .then((response) => {
            console.log('order paid ', response);
            return response;
        })
        .catch((error) => {
            console.log('ERROR: ', error);
        });
}

``
function OrderScreen2() {


    const { selectedCustomer, setSelectedCustomer } = useContext(CustomerContext)
    const { selectedTime, setSelectedTime } = useContext(TimeContext);
    const { currentOrder, setCurrentOrder } = useContext(OrderContext)

    const [menu, setMenu] = useState([])
    const { currentItems, setCurrentItems } = useContext(ItemContext)

    useEffect(() => {
        getMenu({ setMenu })
    }, [])

    const navigate = useNavigate()


    useEffect(
        () => {
            if (JSON.parse(localStorage.getItem('customer'))) {
                let storedCustomer = JSON.parse(localStorage.getItem('customer'))
                setSelectedCustomer(storedCustomer)
                console.log(storedCustomer)
                findOrder({ customer: storedCustomer.id })
                    .then(response => {
                        let currentCustomersOrders = response.data.filter(order => order.customer === storedCustomer.id)
                        console.log(currentCustomersOrders)
                        let unpaidOrders = currentCustomersOrders.filter(order => order.paid === false)
                        if (unpaidOrders.length > 0) {
                            setCurrentOrder(unpaidOrders[0])
                            console.log(unpaidOrders[0])
                            localStorage.setItem('order', JSON.stringify(unpaidOrders[0]))
                        } else {
                            createOrder({ customer: storedCustomer.id, pickup_time: '00:00', dine_status: `Takeout - ${self.pickup_time}` })
                                .then(response => {
                                    console.log(response)
                                    setCurrentOrder(response.data)
                                    localStorage.setItem('order', JSON.stringify(response.data))
                                })
                        }
                        let storedOrder = JSON.parse(localStorage.getItem('order'))
                        setCurrentOrder(storedOrder)
                        setSelectedTime(storedOrder.pickup_time)
                        findItems({ order: storedOrder.id })
                            .then(response => {
                                console.log(response.data)
                                setCurrentItems(response.data.filter(item => item.customer_order === storedOrder.id))
                            })
                    })
            }
        },
        []
    )

    return (
        <div className='p-5'>
            <h5>{selectedCustomer && selectedCustomer.name}</h5>
            <br></br>
            <div>
                <TimeSelection />
            </div>
            <br></br>
            {selectedTime}
            <div style={{ margin: 'auto' }}>
                <h5>Your Cart:</h5>
                <br></br>
                {currentOrder && currentItems.map(item => item.customer_order === currentOrder.id ? (
                    <div key={item.id}>
                        {item.quantity} x {item.menu_item} , {item.customer_order}
                        <button style={{ marginLeft: 5, border: 'none', background: 'none' }} onClick={() => {
                            deleteItem({ item: item.id })
                                .then(response => {
                                    findOrder({ customer: selectedCustomer.id })
                                        .then(response => {
                                            let currentCustomersOrders = response.data.filter(order => order.customer === selectedCustomer.id)
                                            let unpaidOrders = currentCustomersOrders.filter(order => order.paid === false)
                                            if (unpaidOrders.length > 0) {
                                                setCurrentOrder(unpaidOrders[0])
                                                localStorage.setItem('order', JSON.stringify(unpaidOrders[0]))
                                                findItems({ order: unpaidOrders[0].id })
                                                    .then(response => {
                                                        console.log(response.data)
                                                        setCurrentItems(response.data.filter(item => item.customer_order === unpaidOrders[0].id))
                                                    })
                                            } else {
                                                createOrder({ customer: selectedCustomer.id, pickup_time: '00:00', })
                                                    .then(response => {
                                                        setCurrentOrder(response.data)
                                                        localStorage.setItem('order', JSON.stringify(response.data))
                                                        findItems({ order: response.data.id })
                                                            .then(response => {
                                                                console.log(response.data)
                                                                setCurrentItems(response.data.filter(item => item.customer_order === response.data.id))
                                                            })
                                                    })
                                            }
                                        })
                                })
                        }}
                        >
                            ❌
                        </button>
                    </div>
                ) : (
                    null
                ))}
                <button style={{ marginTop: 5 }} onClick={() => {
                    if (currentItems.length > 0) {
                        checkOut({ order: currentOrder.id })
                            .then(response => {
                                console.log(response)
                                localStorage.setItem('order', JSON.stringify(response.data))
                                createOrder({ customer: selectedCustomer.id, pickup_time: '00:00', dine_status: `Takeout - ${self.pickup_time}` })
                                    .then(response => {
                                        setCurrentOrder(response.data)
                                        localStorage.setItem('order', JSON.stringify(response.data))
                                        setCurrentItems([])
                                    })
                            })
                    }
                }
                }
                >
                    Check Out
                </button>
            </div>
            <br></br>
            {menu.length > 0 && selectedTime !== undefined ? (
                <OrderingMenu orderingMenu={menu} />
            ) : <OrderingMenu orderingMenu={menu} />}
        </div>
    )
}

export default OrderScreen2

// to do:

// clean up unnecessary blocks of code

// customers can view previous orders (maybe 'order again' button)

// maybe make separate checkout page that button would navigate to

// complete can be set to True (only if paid == True)
