import React, {useEffect, useState} from 'react'

import {connect} from 'react-redux';
import { fetchUsers } from '../../Redux/fetch-users/users.actions';
import fetchUserReducer from '../../Redux/fetch-users/users.reducers';
import { deleteUser, updateUser } from '../../Api/api.user';
import authReducer from '../../Redux/auth/auth.reducer';
import axios from 'axios';
import { store } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import './userList.scss';
import { logout } from '../../Redux/auth/auth.action';







const UpdateForm = (props) =>{

    const initialState = {
        'username' : '',
        'email' : '',
        'address' : ''
    }

    const [data, setData] = useState(initialState);

    const handleChange = event =>{

        setData({
            ...data,
            [event.target.name]: event.target.value
          });

    }

    const handleSubmit = event =>{
        event.preventDefault();

        const patchData = {};
        if (data.username !=="")
            patchData.username = data.username;
        else if (data.email !=="")
            patchData.email = data.email;
        else if (data.address !=="")
            patchData.address = data.address;


        const username = props.user.username;
        console.log(data)
        const token = store.getState().authReducer.user["token"];
         
        axios( {
            url: `${updateUser + username}/`,
            method : "PATCH",        
            data:  patchData,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            
            }
        
        )
        .then((response) => {
            console.log(response.data)     
            props.setCount(1);
        
        })
        .catch((err) => {
            console.log(err);
        });

       
    }


    return (

        <div className="row update-form justify-content-center d-none  " id={props.user.username}>
            <div className="col-12 mt-3 ">
                <div className="card">

                <div class="card-header bg-primary d-flex align-items-center justify-content-center text-light ">
                    
                     <strong >Update Profile</strong>
                </div>
                <div className="card-body p-2">
                    <form onSubmit = {handleSubmit}>
                    <div class="input-group mt-2">
                            <div class="input-group-prepend">
                            <span class="input-group-text bg-danger text-light" id="inputGroupPrepend">USERNAME</span>
                            </div>
                            <input type="text" class="form-control" name="username"  onChange= {handleChange} placeholder={props.user.username} aria-describedby="inputGroupPrepend"  />
                        
                        </div>

                        <div class="input-group mt-2">
                            <div class="input-group-prepend">
                            <span class="input-group-text bg-danger text-light" id="inputGroupPrepend">EMAIL</span>
                            </div>
                            <input type="text" class="form-control" name="email"  onChange= {handleChange}   placeholder={props.user.email} aria-describedby="inputGroupPrepend"  />
                        
                        </div>
                                
                        <div class="input-group mt-2">
                            <div class="input-group-prepend">
                            <span class="input-group-text bg-danger text-light" id="inputGroupPrepend">ADDRESS</span>
                            </div>
                            <input type="text" class="form-control"  name="address"  onChange= {handleChange}  placeholder={props.user.address} aria-describedby="inputGroupPrepend"  />
                        
                        </div>
            
                        <button type="submit" class="btn btn-primary mt-1">Edit</button>
                        </form>
                </div>
                </div>
                </div>
        </div>
    )
}





function UserList( {userData, fetchUsers} ) {

    const [count, setCount] = useState(0)
    const state = useSelector(state =>state.authReducer)
    const dispatch = useDispatch()


    useEffect(() =>{
        fetchUsers()
    }, [count])
    

 
    const handleUserDeletion = event=>{
        
            
        


        const username = event.currentTarget.value;
        const token = store.getState().authReducer.user["token"];
         
        axios.delete( `${deleteUser + username}/`
        ,{
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          
        }
        
        )
        .then((response) => {
            console.log(response.data)     
            setCount(count=> count + 1);  
            if(store.getState().authReducer.user.username == username){
                    dispatch(logout());
            }
        })
        .catch((err) => {
            console.log(err);
        });

        setCount(count => count - 1);

    }


    const handleUserUpdation = event =>{

        const username = event.currentTarget.value;
        var element = document.getElementById(username);
        console.log(element)
        element.classList.toggle("show");
     }

    

    return (
     
        userData.loading ? (
            <h1>Loading</h1>
            ) : userData.error  ? (
             console.log(userData.error)
            ): (
                <div className="container bg-light pt-5 pb-5 mt-5">
                    <h1 className="text-center "> Users List</h1>
                    <div className="bar"></div>

                    { userData.users != undefined   ? userData.users.map( user =>

                        <>
                        <div className="row justify-content-center mt-5">                          
                                <div className="col-12 col-sm-6  ">
                                    <div className="card">
                                        <div class="card-header bg-danger d-flex align-items-center text-light">
                                        <i class="fas fa-user-circle fa-2x "></i>&ensp; &ensp; 
                                         <span >  <strong >@{user.username}</strong></span>
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item"><strong>EMAIL </strong>&ensp; : &ensp;  {user.email}</li>
                                            <li class="list-group-item"><strong>ADDRESS</strong>&ensp; : &ensp; {user.address}</li>                                            
                                        </ul>
                                    </div>

                                    <UpdateForm user = {user} setCount = { i => setCount(count + i)} />

                                </div>

                                <div className="col-12 col-sm-4 col-lg-1 d-flex  flex-sm-column  justify-content-center align-items-center p-0">
                                    <button className="btn btn-danger d-block m-2" value = {user.username} onClick = {handleUserDeletion}><i class="fas fa-trash-alt"></i></button>
                                    <button className = "btn btn-primary d-block m-2" value = {user.username} onClick= {handleUserUpdation}   ><i class="fas fa-user-edit"></i></button>

                                </div>
                            
                                      
                        </div>
                        </>

                        ):<div class="alert p-5 w-50 mx-auto mt-5 d-flex justify-content-center flex-column align-items-center alert-danger text-center" role="alert">
                            <i class="fas fa-sad-tear fa-5x "></i>
                            <strong className="mt-2"><h3>Users Not Found</h3></strong>
                        </div> }
                  
                </div>
            )
                    

         

      
    )
}


const mapStateToProps = (state) =>(
    { 
        userData : state.fetchUserReducer,

    }
)

const mapDispatchToProps = dispatch =>{
    return {
        fetchUsers : () => dispatch(fetchUsers())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(UserList);