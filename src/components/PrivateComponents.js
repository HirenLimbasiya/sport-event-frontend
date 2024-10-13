import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponents = () => {
    const local = localStorage.getItem("users");
    return local ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateComponents