import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { apiPath } from '@/utils/apiPath';
import { Button } from "@/components/ui/button"
import ButtonLoading from '@/mycomponenrs/loading/Loading';
import PageLoading from '@/mycomponenrs/loading/PageLoading';

const ChangeRole = () => {
    const location = useLocation();
    const { user } = location.state;

    const navigate = useNavigate();
    const [pageLoading, setPageLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);

    const [updateStatus, setUpdateStatus] = useState("");
    const [userRole, setUserRole] = useState("");

    const [roles, setAllRoles] = useState();

    const getAllRoles = async() => {
      setPageLoading(true);
      try{
          const apipath2 = `${apiPath}/users/roles`;
          const response = await axios.get(apipath2);
          //console.log(response.data);
          setPageLoading(false);
          if(response.data.message == "found all roles"){
            setAllRoles(response.data.roles);
          }
          
      }
      catch(error){
        setPageLoading(false);
        console.log(error.message);
      }
    }

    const updateUserDetails = async() => {
      setButtonLoading(true);
      try{
          const apipath = `${apiPath}/users/${user.id}/roles`;
          const response = await axios.put(apipath,{
            role: userRole,
          });

          setButtonLoading(false);
          if(response.data.message == "User role updated"){
            setUpdateStatus("User role updated");
            //console.log(response.data.user);
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
        getAllRoles();
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
            <h2 className='text-white text-center text-[2vw] m-2'>Change Role</h2>
            <label>Role: </label><br/>
            <select id="selector" value={userRole} onChange={(event) => {setUserRole(event.target.value)}}>
                {roles && roles.map((role) => (
                  <option value={role.id} key={role.id}>{role.name}</option>
                ))}
                
            </select>
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

export default ChangeRole