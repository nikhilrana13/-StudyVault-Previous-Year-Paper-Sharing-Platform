import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const Protectedroute = ({allowedRoles}) => {
    const user = useSelector((state) => state.Auth.user);
    if(!user){
        return <Navigate to="/login" />
    }
    if(!allowedRoles.includes(user.role)){
        return <Navigate to="/login" />
    }
    
  return  <Outlet />
}

export default Protectedroute;
