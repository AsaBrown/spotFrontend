import React from 'react'
// import { Login } from './components/Login'
import QueryForm from './components/QueryForm'
import { ViewLogs } from './components/ViewLogs';
import { Info } from './components/Info'

export const Home = () => {
    return (
        <div>
            <ViewLogs />
            <QueryForm />
              {/* <Login /> */}
            <Info />
        </div>
    );
}
