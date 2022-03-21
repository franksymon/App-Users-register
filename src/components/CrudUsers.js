import React, { useEffect, useState } from 'react';
import UsersForm from './UsersForm';
import UsersList from './UsersList';
import axios from 'axios';


const CrudUsers = () => {
   
   const [users, setUsers] = useState([])
   const [selectedUser, setSelectedUser] = useState(null)

    const getUsers = () =>{
        axios.get('https://users-crud1.herokuapp.com/users/')
        .then(res => {
            //console.log(res.data)
            setUsers(res.data)
        }) 
    }

   useEffect(() => {
     getUsers()
   },[])
   
   

   const deletedUser = (id) =>{
       axios
        .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
       .then(()=> getUsers())
    }
   
   //console.log(selectedUser)



   
    return (
        <div className='app-container'>
           
            <UsersForm
                getUsers= {getUsers}
                selectedUser = {selectedUser}
                setSelectedUser = {setSelectedUser}
            />
        

        
            <UsersList
                users= {users}
                deletedUser = {deletedUser}
                setSelectedUser = {setSelectedUser}
            />
        
        </div>
    );
};

export default CrudUsers;