import { myFirebase } from "../firebase/firebase";
import firebase from "firebase";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
};

const receiveLogin = user => {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

const loginError = () => {
    return {
        type: LOGIN_FAILURE
    };
};

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

const logoutError = () => {
    return {
        type: LOGOUT_FAILURE
    };
};

const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST
    };
};

const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS
    };
};

export const loginUser = (history) => async dispatch => {
    dispatch(requestLogin());
    var provider = new firebase.auth.GoogleAuthProvider();

    myFirebase.auth()
        .signInWithPopup(provider)
        .then(user => {
            const userId=user.user.uid
            const email=user.user.email.replace(".", ",");
            const name=user.user.displayName;
            console.log(user)
            console.log(userId,email,name)
            myFirebase.database().ref('/users/' + userId).set({
                email: email,
                name: name
            });
            myFirebase.database().ref('/emailToUid/').child(email).set({
                userId
            })

                dispatch(receiveLogin(user));
                history.push("/");
            
        })
        .catch(error => {
            //Do something with the error if you want!
            console.log(error)
            dispatch(loginError());
        });
};



export const logoutUser = () => async dispatch => {
    dispatch(requestLogout());
    myFirebase
        .auth()
        .signOut()
        .then(() => {
            dispatch(receiveLogout());
        })
        .catch(error => {
            //Do something with the error if you want!
            dispatch(logoutError());
        });
};

export const verifyAuth = () => async dispatch => {
    dispatch(verifyRequest());
    myFirebase.auth().onAuthStateChanged(user => {
        if (user !== null) {
            dispatch(receiveLogin(user));
            dispatch(verifySuccess());
        } else {
            dispatch(loginError());
        }
    });
};