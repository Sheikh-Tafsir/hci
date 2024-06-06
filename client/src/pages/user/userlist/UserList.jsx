import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";

import PageLoading from '@/mycomponenrs/loading/PageLoading';
import { apiPath } from '@/utils/apiPath';
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

const UserList = () => {
    const navigate = useNavigate();
    const [pageLoading, setPageLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const getAllUsers = async() => {
        try{
            const apipath = `${apiPath}/users`;
            const response = await axios.get(apipath);
            //console.log(response.data);
            setPageLoading(false);
            if(response.data.message == "found all users"){
                setAllUsers(response.data.user);
                //console.log(response.data.user);
            }
        }
        catch(error){
            setPageLoading(false);
            console.log(error.message);
        }
    }

    const handleUserItemClick = (user) => {
        navigate('/users/userdetails', {state: {user} });
    };

    const handleRoleChange = (user) => {
        navigate('/users/changerole', {state: {user} });
    }

    const handleUserDelete = async(user) => {
        try{
            const apipath = `${apiPath}/users/${user.id}`;
            const response = await axios.delete(apipath);
            if(response.data.message == "user deleted"){
                setPageLoading(true);
                setPageLoading(false);   
            }
        }
        catch(error){
            console.log(error.message);
        }
    }

    useEffect(()=>{
        getAllUsers();
    }, [])
    

    if(pageLoading){
        return (
            <div className='h-[80vh]'>
                <PageLoading />
            </div>
        )
    }
  return (
    <div className='lg:w-[80vw] mx-auto'>
        <h1 className='text-center text-[3vw] m-[2vw] font-semibold'>User List</h1>
        <Link to="/auth/create" className='flex w-[20vw] mx-auto p-[0.5vw] justify-center align-center border border-solid border-black mb-[4vw] rounded-lg'><p className='text-xl my-auto mr-[0.3vw]'>Add new user</p><CiCirclePlus className='text-4xl'/></Link>
        <Table className="border-2">
            <TableHeader>
                <TableRow>
                <TableHead className="border-r-2">Sl</TableHead>
                <TableHead className="border-r-2">Name</TableHead>
                <TableHead className="border-r-2">Role</TableHead>
                <TableHead className='w[10%] border-r-2'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {allUsers.map((user,index) => (
                    <TableRow key={user.id} className='cursor-pointer border-r-2'>
                        <TableCell className="font-medium">{index+1}</TableCell>
                        <TableCell className="border-r-2">{user.name}</TableCell>
                        <TableCell className="border-r-2">{user.role}</TableCell>
                        <TableCell className="border-r-2">
                            <div className='flex'>
                                <FaUserEdit onClick={() => handleRoleChange(user)} className='text-xl mr-[2vw] cursor-pointer hover:text-red-600'/>
                                <MdEdit onClick={() => handleUserItemClick(user)} className='text-xl mr-[2vw] cursor-pointer hover:text-red-600'/>
                                <AiFillDelete onClick={() => handleUserDelete(user)} className='text-xl cursor-pointer hover:text-red-600'/>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

    </div>
  )
}

export default UserList