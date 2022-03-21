import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const UsersForm = ({getUsers, selectedUser, setSelectedUser}) => {
    
    const  defaultValues = {
        email:"",
        birthday: "",
        first_name: "",
        last_name: "",
        password: ""
      }

    const { register, handleSubmit, reset } = useForm();

    const submit= (data) => {
        //console.log(data)
        if(selectedUser){
            axios
            .put(`https://users-crud1.herokuapp.com/users/${selectedUser.id}/`, data)
            .then(() => {
                getUsers()
                reset(defaultValues)
            })
        }else{
            axios
                .post('https://users-crud1.herokuapp.com/users/', data)
                .then(() => {
                    getUsers()
                    reset(defaultValues)
                })
        }
        //reset(defaultValues)
    }
    

  useEffect(() => {
      if(selectedUser){
          reset({
            email:selectedUser.email,
            birthday: selectedUser.birthday,
            first_name: selectedUser.first_name,
            last_name: selectedUser.last_name,
            password: selectedUser.password
          })
      }
  },[selectedUser,reset])

    
    return (
        <section id='form'>
            <form onSubmit={handleSubmit(submit)} className="form-container">
                <h2>New User</h2>
                <div className='input-container'>
                    <label htmlFor="firstName"><i className="fa-solid fa-user"></i></label>
                    <div className='input-name'>
                        <input 
                            type="text"
                            name='firstName'
                            id='firstName'
                            placeholder='First name *'
                            {...register("first_name", 
                                {required:true},
                                {pattern:/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/}
                            )}     
                        />
                        <input 
                            type="text"
                            name='lastName'
                            id='lastName'
                            placeholder='Last name *' 
                            {...register("last_name",
                                {required:true},
                                {pattern:/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/}
                            )}     
                        />
                    </div>
                </div>    
                <div className='input-container'>
                    <label htmlFor="email"><i className="fa-solid fa-envelope"></i></label>
                    <input 
                        type="email"
                        name='email'
                        id='email'
                        placeholder='email *'
                        {...register("email", {required:true})} 
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="password"><i className="fa-solid fa-lock"></i></label>
                    <input 
                        type="password" 
                        name='password'
                        id='password'
                        placeholder='password *'
                        {...register("password", {required:true})}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="birthday"><i className="fa-solid fa-cake-candles"></i></label>
                    <input 
                        type="date"
                        name='birthday'
                        id='birthday'
                        placeholder='birthday'
                        {...register("birthday", {required:false})}
                    />
                </div>
                <div className='btn-container'> 
                    <button className='btn-upload'>upload</button>
                    {
                        selectedUser && 
                        <button 
                            className='btn-cancel'
                            onClick={() => {
                                reset(defaultValues) 
                                setSelectedUser(null)
                                }
                            }>
                            Cancel
                        </button>
                    }
                </div>
            </form>
        </section>
    );
};

export default UsersForm;