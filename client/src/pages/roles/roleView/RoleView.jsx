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
  

const RoleView = () => {
    const navigate = useNavigate();
    const [pageLoading, setPageLoading] = useState(true);
    const [allRoles, setAllRoles] = useState([]);
    const getAllRoles = async() => {
        try{
            const Apipath = `${apiPath}/users/roles`;
            const response = await axios.get(Apipath);
            setPageLoading(false);
            // console.log(response.data);
            if(response.data.message == "found all roles"){
                setAllRoles(response.data.roles);
                //console.log(response.data.user);
            }
        }
        catch(error){
            setPageLoading(false);
            console.log(error.message);
        }
    }


    const editRole = (role) => {
        navigate('/roles/update', {state: {role} });
    }

    useEffect(()=>{
        getAllRoles();
    }, [])
    

    if(pageLoading){
        return (
            <div className='h-[80vh]'>
                <PageLoading />
            </div>
        )
    }
  return (
    <>
        <div className='lg:w-[80vw] mx-auto'>
            <h1 className='text-center text-[3vw] m-[2vw] font-semibold'>Role List</h1>
            <Link to="/roles/create" className='flex w-[20vw] mx-auto p-[0.5vw] justify-center align-center border border-solid border-black mb-[4vw] rounded-lg'><p className='text-xl my-auto mr-[0.2vw]'>Add new role</p><CiCirclePlus className='text-4xl'/></Link>
            <Table className="border-2">
                <TableHeader>
                    <TableRow>
                    <TableHead className="border-r-2">Sl</TableHead>
                    <TableHead className="border-r-2">Name</TableHead>
                    <TableHead className="border-r-2">Permissions</TableHead>
                    <TableHead className='w[10%] border-r-2'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allRoles.map((role,index) => (
                        <TableRow key={role.id} className='cursor-pointer'>
                            <TableCell className="font-medium border-r-2">{index+1}</TableCell>
                            <TableCell className="border-r-2">{role.name}</TableCell>
                            <TableCell className='border-r-2'>
                                {role.permissions.map((permission,index) => (
                                    <p className='' key={index}>{permission.id}</p>
                                ))}
                            </TableCell>
                            <TableCell>
                                <div className='flex'>
                                    <FaUserEdit onClick={() => editRole(role)} className='text-xl mr-[2vw] cursor-pointer hover:text-red-600'/>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </>
  )
}

export default RoleView