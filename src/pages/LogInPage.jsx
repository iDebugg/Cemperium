import React from "react";
import LogInForm from "../components/LogInForm";
import Illustration from '../assets/img/Illustration.png'
import CemperiumLogo from '../assets/img/Frame 92.png'
import { Link } from "react-router-dom";




const LogInPage = ()=> {
return (
    <div className="CreateAccountbackGround">
         <div className="illustrationBacgrnd">
        <div className="CreateAccountbackGroundLayout">
        <div className="logoAndLoginBtnLayout">
        <img src={CemperiumLogo} alt="" className="CemperiumLogo"/>
        <button  className="createAcctBtN"><Link to="/" className="createAcctBtNLinkDecor">Create Account</Link></button>
        </div>
       

            <div className="CreateAccountbackGroundLayoutDisplay">
          
        <div className="CreateAccountbackGroundTextOneDiv">
        
        
        <h2 className="CreateAccountbackGroundTextOne">Trade & Manage Your Cryptocurrency</h2>
        </div>

        <div className="signUpFormLayout">
        <LogInForm />
            
        </div>
       

        </div>
        </div>
        </div>


        
    
        
        
    </div>
)
};

export default LogInPage;