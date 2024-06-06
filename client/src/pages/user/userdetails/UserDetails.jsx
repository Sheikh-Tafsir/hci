import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { apiPath } from '@/utils/apiPath';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import './userDetails.css'
import ButtonLoading from '@/mycomponenrs/loading/Loading';
import PageLoading from '@/mycomponenrs/loading/PageLoading';

const UserDetails = () => {
    const location = useLocation();
    const { user } = location.state;

    const navigate = useNavigate();
    const [pageLoading, setPageLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);

    const [updateStatus, setUpdateStatus] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    // const [userRole, setUserRole] = useState("");

    // const [roles, setAllRoles] = useState();

    const getUserDetails = async() => {
        setPageLoading(true);
        try{
            const apipath = `${apiPath}/users/${user.id}`;
            const response = await axios.get(apipath);
            setPageLoading(false);
            if(response.data.message == "found user by id"){
                setUserName(response.data.user.name);
                setUserEmail(response.data.user.email);
                // setUserRole(response.data.user?.role);
                //console.log(response.data.user);
            }
        }
        catch(error){
            setPageLoading(false);
            console.log(error.message);
        }
    }

    // const getAllRoles = async() => {
    //   setPageLoading(true);
    //   try{
    //       const apipath2 = `${apiPath}/users/roles`;
    //       const response = await axios.get(apipath2);
    //       //console.log(response.data);
    //       setPageLoading(false);
    //       if(response.data.message == "found all roles"){
    //         setAllRoles(response.data.roles);
    //       }
          
    //   }
    //   catch(error){
    //     setPageLoading(false);
    //     console.log(error.message);
    //   }
    // }

    const updateUserDetails = async() => {
      setButtonLoading(true);
      try{
          const apipath = `${apiPath}/users/${user.id}`;
          const response = await axios.put(apipath,{
            name:userName,
            email:userEmail,
            // role: userRole,
          });

          setButtonLoading(false);
          if(response.data.message == "User Profile updated"){
            setUpdateStatus("User profile updated");
            console.log(response.data.user);
            navigate('/users/userlist', { replace: true });
          }

        }
        catch(error){
          setButtonLoading(false);
          if(error.response.status == 404){
            setUpdateStatus(error.response.data.message);
          }
          else{
            setUpdateStatus(error.message);
          }
          console.log(error.message);
        }
    }

    useEffect(()=>{
        
        //getAllRoles();
        getUserDetails();
    }, [])

    if(pageLoading){
      return(
        <div className='h-[80vh]'>
          <PageLoading/>
        </div>
      )
    }
  return (
    <div className='login'>
        <div className='login_mainBox'>
            <h1 className='text-white text-center text-[2vw] m-2'>Update User</h1>
            <label>Name: </label>
            <Input type="text" placeholder="Insert Username" value={userName} onChange={(event) => {setUserName(event.target.value);}}/>
            <label>Email: </label>
            <Input type="email" placeholder="Insert Email" value={userEmail} onChange={(event) => {setUserEmail(event.target.value);}}/>
            
            {/* <label>Role: </label><br/>
            <select id="selector" value={userRole} onChange={(event) => {setUserRole(event.target.value)}}>
                {roles && roles.map((role) => (
                  <option value={role.id} key={role.id}>{role.name}</option>
                ))}
                
            </select> */}
            <p className='text-center text-red-600 p-[1vw]'>{updateStatus}</p>
            <Button variant="outline" className='w-[100%]' onClick={()=>updateUserDetails()}>
                { buttonLoading? 
                    <ButtonLoading/>:
                    'Save'
                }
            </Button>
        </div>
    </div>
  )
}

export default UserDetails