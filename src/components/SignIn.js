import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {FcGoogle} from "react-icons/fc"
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import logo from "../assets/CSILogo.png"

import { loginUser } from "../actions";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(255, 255, 255,0.9)',
        padding: '2rem',
        borderRadius: '1rem',
    },
    avatar: {
        margin: theme.spacing(1),
        background: "transparent",
        width:"100px",
        height:"100px"
    },
    logo:{
        width: "100%",
    },
    google:{
        background:"white",
        margin:"0 10Px",
        borderRadius:"100%"

    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#026aa7'
    },
}));

export default function SignIn(props) {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [state, setState] = useState({
        toFrontpage: false,
    });

    async function handleSignIn(e) {
        e.preventDefault();
        dispatch(loginUser(props.history,() => props.history.push("/")));
        setState({ toFrontpage: true });
    };

    const redirect = (
        <Redirect to="/" />
    );

    const signIn = (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    {/* <LockOutlinedIcon /> */}
                    <img src={logo} className={classes.logo} alt="logo"></img>
                </Avatar>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSignIn}
                    >
                        <FcGoogle className={classes.google} size={35}/> Sign In With Google
                    </Button>
            </div>
        </Container>
    );

    if (state.toFrontpage) {
        return redirect;
    } else {
        return signIn;
    }
}