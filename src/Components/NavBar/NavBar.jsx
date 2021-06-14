import React, {useState} from 'react'
import {Link, StaticRouter} from 'react-router-dom'
import './NavBar.scss';
import {useDispatch, useSelector} from 'react-redux';
import $ from 'jquery';
 
import { logout } from "../../Redux/auth/auth.action";
import { userRegister } from '../../Api/api.user';



 function NavBar(props) {
    
    const state = useSelector(state =>state.authReducer)
    const dispatch = useDispatch()


   
 
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light sticky-top  nav-style sticky p-2" >
            <a className="navbar-brand text-light float-right " href="/"> {state.user.username ? <strong>Hey, Its me @{state.user.username}</strong> : <strong><i class="fas fa-question-circle fa-2x"></i> &ensp; Not Authenticated</strong>}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <div class="hamburger" id="hamburger-id">
                    <span class="line"></span>
                    <span class="line"></span>
                    <span class="line"></span>
                </div>
            </button>
            <div className="collapse navbar-collapse text "  id="navbarNav">
                
            <ul class="navbar-nav ms-auto navbar-right justify-content-center flex-row w-atuo mt-5 mt-md-1" >
                
                { state.isAuthenticated ? 
                <> 
                <li class="nav-item "  >
                    <button className="nav-btn-join btn btn-dark  round-btn " >  
                    <Link to ="/"  onClick = {() => dispatch(logout())} className= "nav-link   waves-effect waves-light right-nav">Logout</Link>
                    </button>
                </li>

                </> : 

                <>
                <li class="nav-item "  >
                <button className="nav-btn-join btn btn-primary  round-btn " >  
                <Link to ="/login"    className= "nav-link text-light   waves-effect waves-light right-nav">Login</Link>
                </button>
                </li>            
                
                <li class="nav-item " >
                <button className="nav-btn-join btn btn-danger  round-btn" >    
                    <Link to ="/register"  className= "nav-link text-light   waves-effect waves-light right-nav">Register</Link>
                </button>
                </li>
                </>
                }
            </ul>
               
            </div>
        </nav>
        <div id="nav-scroll-controller"></div>
        </>
    )
}




export default NavBar;