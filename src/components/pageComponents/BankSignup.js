import { useEffect } from 'react';
import axios from 'axios';
import React from 'react'
// import TellerConnect from '../../scripts/connect';

export const BankSignup = () => {
    const [tellerApi, setTellerApi] = React.useState(null);

    const saveTellerToken = (enrollment) => {
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_BACKEND_URL}/teller/account/create`,
            data: `${enrollment}`,
            withCredentials: true
        }).then((res) => {
            console.log(res);
        });
    }

    function loadScript(elementId, src) {
        if (!document.getElementById(elementId)) {
            const script = document.createElement('script');
            script.src = src;
            script.id = elementId;
            document.head.appendChild(script);
        }
    }
    
    function loadTellerConnect() {
        return new Promise((resolve) => {
            function check() {
                if (window.TellerConnect) {
                return resolve(window.TellerConnect);
                }
                loadScript('teller-script', 'https://cdn.teller.io/connect/connect.js');
                setTimeout(check, 300);
            }
             check();
        });
    }

    const teller = useTellerAPI({
        applicationId: "",
        environment: "sandbox",
        onInit: function() {
            console.log("Teller Connect has initialized");
        },
        onSuccess: function(enrollment) {
            console.log("User enrolled successfully");
            saveTellerToken(enrollment);

        },
        onExit: function() {
            console.log("User closed Teller Connect");
        }
    }); 

    function useTellerAPI(setupArgs) {
        const [tellerApi, setTellerApi] = React.useState(null);
        React.useEffect(() => {
            loadTellerConnect().then((teller) => {
                setTellerApi(teller.setup(setupArgs));
            });
        }, []);
        return tellerApi;
    }

    return (
        <div>
                <button id='myButton' className='myButton' onClick={() => teller?.open()} disabled={!teller}>Login to site</button>
        </div>
    );
}