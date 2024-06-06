import { Outlet, Navigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

import { checkLogin } from './checkLogin'
import NavigationBarAdmin from '@/mycomponenrs/navbarAdmin/NavigationBar';
import NavigationBar from '@/mycomponenrs/navbar/NavigationBar';
import { checkRole } from './checkRole';

const PrivateRouteAdmin = () => {
    let isAdmin = checkRole();

    return(
        isAdmin ?
        ( 
            <>
                <NavigationBar/>
                <h1 className='text-lg'>{isAdmin}</h1>
                <Outlet/> 
            </>
        ) : ( 
            <Navigate to="/profile" />
        )
    );
}

export default PrivateRouteAdmin