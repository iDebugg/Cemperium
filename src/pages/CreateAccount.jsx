import React from "react";
import SignupForm from "../components/SignupForm";
import CemperiumLogo from '../assets/img/Frame 92.png'
import { Link } from "react-router-dom";








const createAccount = ()=> {
    
return (
    <div className="CreateAccountbackGround">
       <div className="illustrationBacgrnd">
        <div className="CreateAccountbackGroundLayout">
           
        <div className="logoAndLoginBtnLayout">
        <img src={CemperiumLogo} alt="" className="CemperiumLogo"/>
        
        <button  className="logInBtN"><Link to="/LogIn" className="LogInLinkDecor">Log In</Link></button>
        </div>

            <div className="CreateAccountbackGroundLayoutDisplay">
          
        <div className="CreateAccountbackGroundTextOneDiv">
        
        
        <h2 className="CreateAccountbackGroundTextOne">Trade & Manage Your Cryptocurrency</h2>
        </div>

        <div className="signUpFormLayout">
        <SignupForm />
            
        </div>
        {/* <img src={Illustration} alt="" className="illustrationImage" /> */}

        </div>
        </div>
        </div>


        
    
        
        
    </div>
)
};

export default createAccount;