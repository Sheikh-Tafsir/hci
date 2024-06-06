import { Outlet, Navigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

import { checkLogin } from './checkLogin'
import NavigationBar from '@/mycomponenrs/navbar/NavigationBar';
import NavigationBarAdmin from '@/mycomponenrs/navbarAdmin/NavigationBar';

const PrivateRoute = () => {
    let loggedIn = checkLogin();

    return(
        // !loggedIn ? 
        <>

          <NavigationBar />
          <Outlet/> 
          {/* <CopyRight/> */}
        </>

    )
}

export default PrivateRoute