import React from 'react'
import '../css/login.css';

function doLogin(e) {
    console.log("Doing Login");
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`).then(response => response.text()).then(body => {
            console.log(body);
            window.location.replace(body);
        });
  }

export const Login = () => {
    return (
        <div id='login'>
            <form>
                <input type="text" id="user" name="user" placeholder="Username" />
                <br/>
                <input type="text" id="pass" name="pass" placeholder="Password" />
                <br />
                <button type="submit">Login</button>
            </form>
            <br /><br />
            <form>
                <input type="text" id="user" name="user" placeholder="Username" />
                <br/>
                <input type="text" id="pass" name="pass" placeholder="Password" />
                <br />
                <button type="submit">Sign Up</button>
                <button className='myButton' onClick={doLogin}>Query Songs</button>
            </form>
        </div>
    );
}