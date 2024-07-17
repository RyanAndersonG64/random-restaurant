import { Link } from "react-router-dom"
import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react"
import SelectedMenu from "./SelectedMenu"
import Menu from './Menu'
import { CustomerContext } from './customercontext'

const CustomerList = ({ customers }) => {
    
    const { selectedCustomer, setSelectedCustomer } = useContext(CustomerContext)

    return customers.length > 0 ? (
        <div className='p-5'>
            <h2> Existing Customers </h2>
            {customers.map(inst => {
                return (
                    <div key={inst.id}>
                        <br></br>
                        <h3>{inst.name}</h3>
                        {inst.address} <br></br>
                        {inst.phone_number}<br></br>
                        <button onClick={() => {
                            console.log(inst)
                            setSelectedCustomer(inst)
                            console.log(selectedCustomer)
                        }}>
                            <Link to ='/OrderScreen2'> Order as this Customer</Link>
                        </button><br></br><br></br>
                    </div>
                )
            })}
        </div>
    ) : (
        <div></div>
    )
}

const NewCustomer = ({ getCustomers }) => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone_number, setPhoneNumber] = useState('')

    const createCustomer = () => {
        console.log(
            { name },
            'name:' + { name },
            'phone_number:' + { phone_number },
            'address:' + { address }
        )
        axios.post('http://127.0.0.1:8000/customers/', {
            name: name,
            phone_number: phone_number,
            address: address
        })
            .then(response => {
                console.log(response)
                if (response.status === 200 || response.status === 201 || response.status === 202) {
                    setName('')
                    setAddress('')
                    setPhoneNumber('')
                    getCustomers()
                }
            })
            .catch(error => console.log('skill issue'))
    }

    return (
        <div className='p-5' style={{ marginTop: 20 }}>
            <h2>Add a New Customer</h2>
            <input
                onChange={e => setName(e.target.value)}
                placeholder='Enter Your Name'
                value={name}
            />
            <input
                onChange={e => setAddress(e.target.value)}
                placeholder='Enter Your Address'
                value={address}
            />
            <input
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder='Enter Your Phone Number'
                value={phone_number}
            />
            <br></br>
            <button onClick={() => createCustomer()}>
                Add Customer
            </button>
        </div>
    )
}

function OrderScreen() {

    const [customers, setCustomers] = useState([])


    useEffect(() => {
        getCustomers()
    }, [])

    const getCustomers = () => {
        axios.get(`http://127.0.0.1:8000/customers/`)
            .then(response => {
                setCustomers(response.data)
            })
            .catch(error => console.log('skill issue'))
    }

    return (
        <div className="p-5">
            <NewCustomer getCustomers={getCustomers} />
            <CustomerList customers={customers} />
        </div>
    )
}

export default OrderScreen