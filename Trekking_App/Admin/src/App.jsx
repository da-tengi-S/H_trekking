import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AppContext} from './context/AppContext'
import { AdminContext } from './context/AdminContext';
import Navbar from './Componets/Navbar';
import Sidebar from './Componets/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Dashbaord from './pages/Dashbaord';

const App = () => {
  const {aToken} = useContext(AdminContext)
  return aToken ? (
    <div className='bg-gray-200'>
      <ToastContainer/>
      <Navbar/>
      <div className=' flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashbord' element={<Dashbaord/>} />
       
        </Routes>
      </div>
    </div>
  )
  :(<>
  <Login/>
  <ToastContainer/>
  </>)
}
export default App