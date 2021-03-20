import React, {useContext, useState} from 'react';
import {initializeLoginFramework} from "./LoginManager";
import {UserContext} from "../../App";
import { useHistory, useLocation } from 'react-router';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from './LoginManager';
import {handleGoogleSignIn, handleSignOut} from './LoginManager';
import './Login.css';

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    })
    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn =()=>{
        handleGoogleSignIn()
            .then(res=>{
                handleResponse(res, true);
            })
    }
    const signOut =()=>{
        handleSignOut()
        .then(res=>{
            handleResponse(res, false);
        })
    }

    const handleResponse = (res, redirect) =>{
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
            history.replace(from);
        }
    }

    const handleBlur = (e) => {
        let isFieldValid;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (e.target.name === 'name') {
            isFieldValid = true;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        console.log(user.email, user.password);
        if (newUser && user.name && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res=>{
                    
                    handleResponse(res, true);
                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res=>{
                    
                    handleResponse(res, false);
                })
        }
        e.preventDefault();
    }
    return (
        <div className="login-system container">
           
            <h1>Login & Signup</h1>
            
            <form onSubmit={handleSubmit}>
                {
                    newUser && <h5> Your Name
                        <input className="inputClass" type="text" name="name" onBlur={handleBlur} placeholder="enter your name" required />
                    </h5>
                }
                <br />
                <h5>Your Email 
                <input className="inputClass" type="text" onBlur={handleBlur} placeholder="enter your email" name="email" id="" required /> <br />
                </h5>
                
                <h5> Enter Password
                <input className="inputClass" type="password" onBlur={handleBlur} placeholder="enter password" name="password" required /> <br />
                </h5>

                <h5> Re-Enter Password
                <input className="inputClass" type="password" onBlur={handleBlur} placeholder="enter password" name="password" required /> <br />
                </h5>
                
                <input className="submitButton" type="submit" value={newUser ? 'Sign Up' : 'SIgn In'} />
            </form>
            {
                user.isSignedIn ? <button onClick={signOut}>Sign Out From Google</button> :
                    <button className="googleButton" onClick={googleSignIn}>Sign In With Google</button>
            }
            <br/>
            <h5> Dont have an account? 
            <input className="inputClass" type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="bewUser">new user sign up</label> <br />
            </h5>
            
            {/* <p style={{ color: 'red' }}>{user.error}</p> */}
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>
            }

        </div>
    );
};

export default Login;