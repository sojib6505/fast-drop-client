
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import AuthContext from './AuthContext'
import auth from '../../firebase/firebase.init'
import { useEffect, useState } from 'react'

export default function AuthProvider({children}) {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    // signUp
    const signUp = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }
    // signIn
    const signIn = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    //signOut
    const signOutUser = () => {
        return signOut(auth)
    }
    //reset password
    const resetPassword =(email)=>{
        return sendPasswordResetEmail(auth,email)
    }
    // update user profile
    const updateUserProfile = (userProfile) => {
        return updateProfile(auth.currentUser,userProfile)
    }
    //observer
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(user)=>{
            setUser(user)
            setLoading(false)
        })
        return () =>{
            unSubscribe()
        }
    },[])
    const authInfo = {
        signUp,
        signIn,
        signOutUser,
        resetPassword,
        updateUserProfile,
        user,
        loading
    }
  return (
    <AuthContext value={authInfo}>
         {children}
    </AuthContext>
  )
}
