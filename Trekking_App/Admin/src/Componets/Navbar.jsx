
// export default Navbar;
import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { aToken, setaToken } = useContext(AdminContext);
    const navigate = useNavigate();

    const logout = () => {
        setaToken('');
        localStorage.removeItem('aToken'); 
        navigate('/'); 
    };

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <p className='border px-2.5 py-0.5 rounded-full border-green-800 text-purple-700'>
                    {aToken ? 'Admin' : 'Guest'}
                </p>
            </div>
            {aToken && ( 
                <button onClick={logout} className='bg-primary text-black text-sm px-10 py-2 rounded-full'>
                    Logout
                </button>
            )}
        </div>
    );
};

export default Navbar;
