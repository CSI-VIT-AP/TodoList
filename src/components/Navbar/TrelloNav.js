import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import logo from "../../assets/CSILogo.png"

import { logoutUser } from "../../actions";

const MainNav = styled.div`
    /*background: ${(props) => props.color || 'rgba(2, 106, 167, 1)'};*/
    margin: auto;
    width: 100%;
    padding: 4px;
    display: flex;
    justify-content: space-between;
    position: relative;
    background-color: rgba(0,0,0,0.25);
`;

const Logo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    right: 50%;
`;
const LogoHeading=styled.p`
    margin:0;
    padding:0 5px;
    color:white;
    font-weight:900
`
const Img = styled.img`
    opacity: 0.7;
    width: 6rem;
    height: 2rem;
    :hover {
        opacity: 0.8;
        cursor: pointer;
    }
`;

const Buttons = styled.div`
    justify-content: flex-end;
    display: inline-flex;
    align-items: center;
`;

const SignButton = styled.div`
    border-radius: .3rem;
    background-color: rgba(0,0,0,0.16);
    color: white;
    padding: 0.4rem 0.6rem 0.4rem 0.6rem;
    &:hover {
        background-color: rgba(255,255,255,0.35);
        cursor: pointer;
    }
    margin: 0 4px 0 4px;
`;



const TrelloNav = (props) => {
    const { isAuthenticated, isLoading } = props;
    

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSignOut = () => {
        dispatch(logoutUser());
        history.push('/signin');
    }

    const isLoggedIn = (
        <SignButton onMouseDown={handleSignOut}>Sign out</SignButton>
    );
    return (
        <MainNav>
            <Link to="/">
                <SignButton>
                    <FontAwesomeIcon icon={faHome} size="lg" />
                </SignButton>
            </Link>
            <Link to="/">
                <Logo>
                    <Img src={logo} />
                    <LogoHeading>TodoList</LogoHeading>
                </Logo>
            </Link>
            <Buttons>
                {!isLoading ? (isAuthenticated ? isLoggedIn : null) : null}
            </Buttons>
        </MainNav>
    );
}


export default TrelloNav;
