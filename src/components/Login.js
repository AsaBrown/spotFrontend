import React from 'react'
import '../css/login.css';


function doLogin(e) {
    console.log("Doing Login");
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/spotify/login`).then(response => response.text()).then(body => {
            console.log(body);
            window.location.replace(body);
        });
}

const doSiteLogin = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/site/login`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: document.getElementById('loginUsername').value,
            password: document.getElementById('loginPassword').value
        })
    }).then(response => response.text()).then(body => {
        console.log(body);
        // window.location.replace(body);
        // store jwt token in cookies
    });
}

const doSiteSignup = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/site/signUp`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: document.getElementById('signupUsername').value,
            password: document.getElementById('signupPassword').value
        })
    }).then(response => response.text()).then(body => {
        //display account created successfully, redirect to login
    });
}

export const Login = () => {
    return (
        <div id='login'>
            <form>
                <input type="text" id="loginUsername" name="loginUsername" placeholder="Username" />
                <br/>
                <input type="text" id="loginPassword" name="loginPassword" placeholder="Password" />
                <br />
                <button className='myButton' onClick={doSiteLogin}>Login to site</button>
            </form>
            <br /><br />
            <form>
                <input type="text" id="signupUsername" name="user" placeholder="Username" />
                <br/>
                <input type="text" id="signupPassword" name="pass" placeholder="Password" />
                <br />
                <button className='myButton' onClick={doSiteSignup}>Signup for site</button>
            </form>
            <br /><br />
            <form>
                <input type="text" id="user" name="user" placeholder="Username" />
                <br/>
                <input type="text" id="pass" name="pass" placeholder="Password" />
                <br />
                <button className='myButton' onClick={doLogin}>Query Songs</button>
            </form>
        </div>
    );
}