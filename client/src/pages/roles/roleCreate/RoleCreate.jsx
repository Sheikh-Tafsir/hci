import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom';

import ButtonLoading from '@/mycomponenrs/loading/Loading';
import { apiPath } from '@/utils/apiPath';
import {useUserContext} from '../../../context/UserContext';

const RoleCreate = () => {
    const [roleName, setRoleName] = useState("");
    const [signupStatus, setSignupStatus] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);

    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useUserContext();

    const addRole = async() => {         
        setSignupStatus("");
        
        if(roleName === "" || roleName == null || roleName === undefined){
            setSignupStatus("Name is empty");
        }

        else{
            setButtonLoading(true);
            try{
                const apipath = `${apiPath}/rbac/roles`;
                const response = await axios.post(apipath, 
                {
                    name:roleName,
                })
                
                setSignupStatus(response.data.message);
                setButtonLoading(false);
                //console.log(response.data);
                if(response.status == 201){
                    setRoleName('');
                    navigate('/roles/view', { replace: true });
                }
                else{
                    console.log("error creating role")
                }
            }
            catch(error){
                //console.error(error);
                setButtonLoading(false);
                if(error.response.status == 401){
                    setSignupStatus(error.response.data.message);
                }
                else setSignupStatus(error.message);
            }
        };

    };


  return (
    <div className='signup'>
        <div className='signup_mainBox'>
            <h2>Add New Role</h2>
            <Input type="text" placeholder="Insert Role Name" value={roleName} onChange={(event) => {setRoleName(event.target.value);}}/>
            <p>{signupStatus}</p>
            <Button variant="outline" onClick={()=>addRole()}>
                { buttonLoading? 
                    <ButtonLoading/>:
                    'Add Role'
                }
            </Button>
        </div>
    </div>
  )
}

export default RoleCreate;