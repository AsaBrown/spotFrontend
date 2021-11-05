// import { Login } from './components/Login'
import { Info } from './components/Info'
import React, { useCallback, useEffect, useState } from 'react';
import { PlaidLink, InstitutionsGetRequest } from 'react-plaid-link';
import axios from 'axios';

export const Plaid = () => {
    const [linkToken, setLinkToken] = useState(null);
    const onSuccess = useCallback((token, metadata) => {
        console.log(token);
    }, []);

    const onEvent = useCallback((eventName, metadata) => {
        console.log(eventName);
    }, []);

    useEffect(() => {
        let mounted = true;
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/plaid/getLinkToken/`)
        .then(response => {
            console.log(response.data.linkToken);
            if(mounted) {
                setLinkToken(response.data.linkToken);
            }
            
        }).catch(error => {
            console.log(error);
        });

        return () => {
            mounted = false;
        }
    }, []);
    
    const config = {
        onSuccess: onSuccess,
        token: linkToken,
        // required for OAuth:
        receivedRedirectUri: window.location.href,
        // if not OAuth, set to null or do not include:
    };

    const getBanks = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/plaid/banks/`)
        .then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }

    return linkToken === null ? (
        <div><h1>Loading</h1></div>
    ) : (
        <div>
            <Info />
            <PlaidLink
            token={linkToken}
            onSuccess={onSuccess}
            onEvent={onEvent}
            // onExit={...}
            // onEvent={...}
            >
            Connect a bank account
            </PlaidLink>
            <button onClick={getBanks()}>

            </button>
        </div>
    );
}
