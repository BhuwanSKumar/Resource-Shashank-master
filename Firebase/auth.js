import {auth } from "./firebase";
import {CreateUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth"
export const doCreateUserWithEmailAndPassword = async(email,password)=>{
    return CreateUserWithEmailAndPassword(auth,email,password)
}
export const doSignInWithEmailAndPassword = async(email,password)=>{
    return SignInWithEmailAndPassword(auth,email,passowrd)
}