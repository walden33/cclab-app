import { createContext, useContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const createUser = (email, pwd) => {
        return createUserWithEmailAndPassword(auth, email, pwd);
    };

    const signIn = (email, pwd) => {
        return signInWithEmailAndPassword(auth, email, pwd);
    };

    const logOut = () => {
        return signOut(auth);
    };

    // Configure signin by Google
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        return signInWithRedirect(auth, provider);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    });

    return (
        <UserContext.Provider
            value={{ createUser, user, signIn, logOut, googleSignIn }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};
