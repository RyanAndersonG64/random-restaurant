import {React, useState, useContext} from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'

// project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import About from './About'
import Menu from './Menu'
import App from './App'
import OrderScreen from './OrderScreen'
import OrderScreen2 from './OrderScreen2'
import ErrorPage from './ErrorPage'
import Header from './Header'
import Footer from './Footer'
import AllergenInfo from './AllergenInfo'
import { CustomerContext } from './customercontext'

const site = import.meta.env.BASE_URL


function Layout() {
  return (
    <>
      <Header />
      <div id='page-content'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />
      },
      {
        path: 'app/',
        element: <App />,
        errorElement: <ErrorPage />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/menu',
        element: <Menu />
      },
      {
        path: '/orderscreen',
        element: <OrderScreen />
      },
      {
        path: '/allergeninfo',
        element: <AllergenInfo />
      },
      {
        path: '/orderscreen2',
        element: <OrderScreen2 />
      }
    ]
  }
], {
  basename: site
})

const CustomerContextProvider = ({ children }) => {

  const [selectedCustomer, setSelectedCustomer] = useState()

  return (
    <CustomerContext.Provider value={{ selectedCustomer, setSelectedCustomer }} >
      {children}
    </CustomerContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <CustomerContextProvider>
    <RouterProvider router={router} />
  </CustomerContextProvider>
)
