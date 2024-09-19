import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Cookies from 'universal-cookie'
import useStore from '../Store'


const ProtectedRoute = ({children}) => {
    const cookies = new Cookies()
    const isAuth = cookies.get("auhtToken")
    const {login} = useStore()
    let location = useLocation();
    console.log('location',location)

    if(!login) {
        return <Navigate to="/login" />
    }
 return children

}

export default ProtectedRoute
