import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoIosHome } from 'react-icons/io';
import { IoIosLogIn } from 'react-icons/io';
import { IoLogoUsd } from 'react-icons/io';

const StyledSideBar = styled.div`   
    position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
    height: 100%;
    width: 75px;     /* Set the width of the sidebar */
    z-index: 1;      /* Stay on top of everything */
    // top: 0px;      /* Stay at the top */
    // margin: 2px;
    background-color: rgba(34,34,34,0.75); /* Black */
    overflow-x: hidden;     /* Disable horizontal scroll */
    padding-top: 10px;
`;

export const SideBar = () => {

    const [items] = useState([
        {
            path: '/home',
            name: 'Home',
            css: <IoIosHome/>,
            key: 1
        }, 
        {
            path: '/login',
            name: 'Login',
            css: <IoIosLogIn/>,
            key: 2
        },
        // {
        //     path: '/teller',
        //     name: 'Bank',
        //     css: <IoLogoUsd/>,
        //     key: 3
        // }
    ]);

    let location = useLocation();
    const [activePath, setActivePath] = useState('');

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    return (
        <StyledSideBar>
        {
            items.map((item) => {
                return (
                    <NavItem 
                        path={item.path}
                        name={item.name}
                        css={item.css}
                        active={item.path === activePath}
                        key={item.key}
                    />
                );
            })
        }
    </StyledSideBar>
    );
}

const StyledNavItem = styled.div`
    height: auto;
    width: 75px; /* width must be same size as NavBar to center */
    text-align: center; /* Aligns <a> inside of NavIcon div */
    // margin-bottom: 0;   /* Puts space between NavItems */
    font-family: Raleway;
    text-decoration: none;
    display: inline-block;
    a {
        font-size: 2.5em;
        color: ${(props) => props.active ? "white" : "#9FFFCB"};
        :hover {
            opacity: 0.7;
        }  
        text-decoration: none;
    }
    a p {
        font-size:14px;
        height: auto;
        margin-top: -7px;
    }
`;

const NavLink = (props => {
    return (
        <div>
            {props.css}
            <p>{props.name}</p>
        </div>
    );
});

const NavItem = (props) => {
    return (
        <StyledNavItem active={props.active}>
                <Link to={props.path} className={props.css} >
                    <NavLink css={props.css} name={props.name}/>
                </Link>
        </StyledNavItem>
    );
}