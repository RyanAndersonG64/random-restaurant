import { useContext, useState } from "react"
import { OrderContext } from "./ordercontext";
import axios from "axios";
import { findOrder, findItems } from "./OrderScreen2";
import { CustomerContext } from "./customercontext";
import { ItemContext } from "./itemcontext";

const addItem = ({ item, quantity, customer_order }) => {
    return axios({
        method: 'post',
        url: `http://127.0.0.1:8000/orderitems/`,
        data: {
            item,
            quantity,
            customer_order,
        },
    })
        .then((response) => {
            console.log('ADD ITEM: ', response);
            return response;
        })
        .catch((error) => {
            console.log('ERROR: ', error);
        });
};

function OrderingMenu({ orderingMenu }) {
    console.log(JSON.parse(localStorage.getItem('order')))
    const { currentOrder, setCurrentOrder } = useContext(OrderContext)
    const { selectedCustomer, setSelectedCustomer } = useContext(CustomerContext)

    const [orderQuantity, setOrderQuantity] = useState(0)
    const { currentItems, setCurrentItems } = useContext(ItemContext)

    return orderingMenu.length > 0 ? (
        <div>
            <h1> Menu </h1>
            {orderingMenu.map(item => {

                return (
                    <div key={item.id}>
                        <div>
                            <h5>{item.item}</h5>
                            {/* add price to above line (right of h5)*/}
                        </div>
                        <div>
                            Spice level: {item.spice} <br></br>
                            Allergens: {item.allergens.join(', ')}
                            <br></br>
                            <input type='number' style={{ width: 40 }} defaultValue={0} onChange={(e) => {
                                if (e.target.value < 0) {
                                    e.target.value = 0
                                } else if (e.target.value > 0) {
                                    setOrderQuantity(e.target.value)
                                    console.log(orderQuantity)
                                }
                            }} ></input> &nbsp;
                            <button onClick={() => {
                                if (orderQuantity > 0) {
                                    addItem({ item: item.id, quantity: orderQuantity, customer_order: JSON.parse(localStorage.getItem('order')).id })
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
                                                    } else 
                                                    {
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
                                    setOrderQuantity(0)
                                }
                            }
                            }
                            >
                                Add to Order
                            </button>
                            <br></br>
                            <br></br>
                        </div>
                    </div>
                )
            })}
        </div>
    ) : (
        <div><img src='https://http.cat/102'></img></div>
    )
}



export default OrderingMenu