import { Link } from "react-router-dom"
import axios from "axios";
import { useState, useEffect } from "react"
import SelectedMenu from "./SelectedMenu"
import Menu from './Menu'

// customer can select from local storage list of names and addresses, or enter new name and address
// button to place an order
    // select pickup time 
    // select food and quantity and add to cart
        // this adds one Order to CustomerOrder
    // cart displays CustomerOrder s where paid = False
    // checking out sets paid to True, so those CustomerOrder s are removed from cart
// complete can be set to True (only if paid == True)


function OrderScreen() {
    return (
        <div class = 'p-5'>
            Enter your name:<input type = 'text'/><br></br>
            Enter your address:<input type = 'text'/><br></br>
            <button><a href = './OrderScreen2'>Order</a></button>
            {/* axios post name and address as Customer */}
        </div>
    )
}

export default OrderScreen