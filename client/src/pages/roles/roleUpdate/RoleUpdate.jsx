import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { apiPath } from '@/utils/apiPath';
import { Button } from "@/components/ui/button"
import ButtonLoading from '@/mycomponenrs/loading/Loading';
import PageLoading from '@/mycomponenrs/loading/PageLoading';

const RoleUpdate = () => {
    const location = useLocation();
    const { role } = location.state;

    const navigate = useNavigate();
    const [pageLoading, setPageLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);

    const [updateStatus, setUpdateStatus] = useState("");
    const [rolePermission, setRolePermission] = useState("");

    const [permissions, setAllPermissions] = useState();

    const getAllPermissions = async() => {
      setPageLoading(true);
      try{
          const Apipath = `${apiPath}/rbac/permissions`;
          const response = await axios.get(Apipath);
          console.log(response.data);
          setPageLoading(false);
          if(response.data.message == "found all permissions"){
            const allPermissions = response.data.permissions;
            const rolePermissionIds = role.permissions.map(permission => permission.id);
            const permissionsNotAssignedToRole = allPermissions.filter(permission => !rolePermissionIds.includes(permission.id));
            console.log(permissionsNotAssignedToRole);
            setAllPermissions(permissionsNotAssignedToRole);
            // setAllPermissions(response.data.permissions);
          }
          
      }
      catch(error){
        setPageLoading(false);
        console.log(error.message);
      }
    }

    const updateRole = async() => {
      setButtonLoading(true);
      try{
          const Apipath = `${apiPath}/rbac/roles/${role.id}/permissions`;
          const response = await axios.post(Apipath,{
            permissionId: rolePermission,
          });

          setButtonLoading(false);
          setUpdateStatus(response.data.message);
          if(response.data.message == "Permission assign" || response.data.message == "Permission already assigned to this role"){
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
        getAllPermissions();
    }, [])

    if(pageLoading){
        return(
          <div className='h-[80vh]'>
            <PageLoading/>
          </div>
        )
      }
  return (
    <div className=''>
        <div className='userDetails_form'>
            <h1 className='text-white text-center text-[2vw] m-2'>Change Role</h1>
            <label>Permission: </label><br/>
            <select id="selector" value={rolePermission} onChange={(event) => {setRolePermission(event.target.value)}}>
                {permissions && permissions.map((permission) => (
                  <option value={permission.id} key={permission.id}>{permission.name}</option>
                ))}
                
            </select>
            <p className='text-center text-red-600 p-[1vw]'>{updateStatus}</p>
            <Button variant="outline" className='w-[100%]' onClick={()=>updateRole()}>
              { buttonLoading? 
                    <ButtonLoading/>:
                    'Save'
                }
            </Button>
        </div>
    </div>
  )
}

export default RoleUpdate