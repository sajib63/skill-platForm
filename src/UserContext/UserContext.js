import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import app from '../firebase/firebase.init';

export const AuthContext=createContext();
const auth=getAuth(app)

const UserContext = ({children}) => {
    const [user, setUser]=useState({name:'sajib'});
    const [loader, setLoader]=useState(false)

    const googleProvider=new GoogleAuthProvider();
    const gitProvider=new GithubAuthProvider();

    // create user 
    const createUser=(email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // loginUser
    const loginUser=(email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }


    // loginWithGoogle
    const googleLogin=()=>{
        return signInWithPopup(auth, googleProvider);
    }



    // gitLogin
    const gitLogin=()=>{
        return signInWithPopup(auth, gitProvider);
    }

    // logoutUser

    const logOutUser=()=>{
        return signOut(auth)
    }



    // useEffect

    useEffect(()=>{
        const unsubscribed=onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            setLoader(true)
        })
        return ()=> unsubscribed();
    },[])

    const userInfo={
        user,
        createUser,
        loginUser,
        logOutUser,
        googleLogin,
        gitLogin,
        loader
    }
    return (
       <AuthContext.Provider value={userInfo}>
    {children}
       </AuthContext.Provider>
    );
};

export default UserContext;