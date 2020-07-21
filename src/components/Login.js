import React from 'react'
import '../css/login.css';

function doLogin(e) {
    console.log("Doing Login");
    e.preventDefault();
    fetch('http://localhost:5000/auth/login').then(response => response.text()).then(body => {
            console.log(body);
            window.location.replace(body);
        });
  }

export const Login = () => {
    return (
        <div id='login'>
            <div id='loginButtons'>
                <h3>Please Login!</h3>
                <button className='myButton'onClick={doLogin}>
                    Click here to login!
                </button>
            </div>
        </div>
    );
}