import React, { Component, useState } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import Form from '../../Components/Form/Form' 
import './Entry.scss';
import { Link } from 'react-router-dom';
 

export default function Entry(props) {

    const [state, setstate] = useState(props.type)

    const stateDict = {
        "login" : ["register", "JOIN US", "New around here? Create an account"],
        "register" : ["login", "SIGN IN", "Already have an account?"]
    }
    
  
    return (
        <>
            <div className="container-fluid">
            <div className="row">
                <ul class="topbar">
                    <li class="topbar-item ">
                         <Link to ="/" style = {{textDecoration : "none", fontWeight : "bold"}}  ><h3 className="text-dark" >Nemesis</h3></Link>
                         <div className="bar"></div>
                    </li>
                    <li class="topbar-item">
                      <p >{stateDict[state][2]}</p>
                      <button  className="btn btn-dark round-btn " onClick = {()=> setstate(stateDict[state][0])}>{stateDict[state][1]}</button>
                    </li>                
                </ul>
            </div>
          </div>  
            <Form type={state} />
        </>
    )
}
