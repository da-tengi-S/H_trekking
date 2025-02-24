
import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 text-white shadow-lg">
      {aToken && (
        <ul className="mt-7 space-y-4">
          {[
            { to: "admin-dashboard", label: "Dashboard" },
          
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 mx-4 rounded-lg transition-all duration-300 transform ${
                  isActive
                    ? 'bg-white text-blue-500 scale-105 shadow-md'
                    : 'hover:bg-white/20 hover:scale-105'
                }`
              }
            >
            
              <span className="font-semibold">{item.label}</span>
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
