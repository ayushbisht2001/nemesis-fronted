
import React, {useState} from 'react'
import './Form.scss';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'

import PropTypes from "prop-types";

// import AnimateEntry1 from '../../assets/animation/entry1'
import { useHistory } from "react-router";

import { register , login} from "../../Redux/auth/auth.action";



const LoginForm = (props)=> {
     
    const history = useHistory();

    const initialState = {
        email: '',
        password: '',
    }
    const [logindata, setLogindata] = useState(initialState)

    const handleChange = (event)=>{
      setLogindata({
        ...logindata,
        [event.target.name]: event.target.value
      })
    }
    const handleSubmit = (event)=>{
      event.preventDefault();      
    
        // props.props.loading()
        setTimeout(() => {
          props.props.login(
            logindata.email,
            logindata.password,
            history
          );
        }, 1000);      
    }

 
    return(
        <>
        <h1 >Sign In to Nemesis</h1>
        <div className="bar"></div>
        <p >Enter your details below</p>
        <form className="form-group p-4" id="login"  onSubmit = { handleSubmit }> 
            <input type="email" className="input-field" placeholder="Email" name="email" onChange = { handleChange } required></input>
            <input type="password" className="input-field" placeholder="Password" name="password" onChange = { handleChange } required></input>
            <button type="submit" className="btn btn-danger   w-20 pt-2 pb-2 mx-auto mt-5 round-btn">Submit</button>
        </form>
            
        </>
    )
}
 


const RegisterForm = (props) =>{
    
  const history = useHistory();
    const initialState = {
        username: '',
        email: '',
        password: '',
        password2: '',
        address: '',
    }

    const [registerdata, setRegisterdata] = useState(initialState);

    
    const handleChange = event => {
        setRegisterdata({
          ...registerdata,
          [event.target.name]: event.target.value
        });
      };


      const handleSubmit = (event)=>{
        event.preventDefault(); 
       
          setTimeout(() => {
          props.props.register(
            registerdata.username,
            registerdata.email,
            registerdata.password,
            registerdata.password2,
            registerdata.address,
            history
          );
        }, 1000);
      
    }
 


return (
    <>
   <h1 >Join Nemesis</h1>
   <div className="bar"></div>
    <p >Create an account</p>
    
    <form className="form-group p-4" id="register" onSubmit = { handleSubmit } >
        <label   id="label" for="email" >
        USER NAME   </label>
        <input type="text" className="input-field"   name="username" onChange = {handleChange}  required></input>
        <label   id="label" for="email" >
        EMAIL ADDRESS   </label>
        <input type="email" className="input-field"   name="email"  onChange = {handleChange} required></input>
        <label   id="label" for="pasword" >
        PASSWORD    </label>
        <input type="password" className="input-field"   name="password" onChange = {handleChange} required></input>
        <label   id="label" for="pasword" >
        CONFIRM PASSWORD    </label>
        <input type="password" className="input-field"   name="password2" onChange = {handleChange} required></input>
        <label   id="label" for="pasword" >
        ADDRESS   </label>
        <input type="text" className="input-field"   name="address" onChange = {handleChange} required></input>
        <button type="submit" className="btn btn-danger  w-20 pt-2 pb-2 mx-auto mt-5 round-btn">Register</button>
    </form>
  </>)
}



 


function Form(props) {
  
    return (
        <div className="container overflow-hidden">
            <div className="form-parent mt-5">
                <div className="form-box mt-5 p-1 pt-5 pb-5"  >
                {(props.type==='login')?<><LoginForm props={props} /><Redirect to="/login" /></> : <><RegisterForm  props={props}/> <Redirect to="/register" /> </>}
                <div className="social-box">
                        <p>Or continue with</p>
                        <div className="social-links">
                            <a href="" ><i class="fab fa-google fa-2x"></i></a>
                            <a href="" ><i class="fab fa-facebook fa-2x"></i></a>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    )
}

Form.propTypes = {
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    token: state.authReducer.token,
    isLoading: state.authReducer.isLoading,
  });

  export default connect(mapStateToProps , { register, login} )(Form);