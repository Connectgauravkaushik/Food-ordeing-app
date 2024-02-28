import { useRef, useState } from "react";
import { LOGIN_PAGE_IMAGE } from "../utils/constants";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { checkValidData } from "../utils/validate";
import PopUpMessage from "./LoginSuccessAlert";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { addloginState } from "../utils/loginPageSlice";

const LoginPage = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const Name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const hideloginpage = () => {
        dispatch(addloginState(false))
    }


    const handleButtonClick = () => {

        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;
        if (!isSignInForm) {
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value)

                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    email.current.value = null;

                    updateProfile(user, {
                        displayName: Name.current.value
                    }).then(() => {
                        const { uid, email, displayName } = auth.currentUser;
                        dispatch(
                            addUser({
                                uid: uid,
                                email: email,
                                displayName: displayName
                            }));

                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });
                    navigate('/home');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage)
                });


        } else { // sign In logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;

                    email.current.value = null;
                    password.current.value = null;
                    setSuccessMsg(<PopUpMessage />)
                    navigate('/home');

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage)
                });

        }
    }

    return (
        <>
            <div id="fadeInRight" className="float-right w-[35%] shadow-lg h-[51rem] relative z-10 -top-[1790px] bg-white">

                <div className="ml-20">
                    <button className=" mt-12" onClick={hideloginpage}>❌</button>
                    <h2 className="mt-20 text-2xl font-bold">{isSignInForm ? "Sign Up" : "Login"}</h2>
                    <span>or</span><span onClick={toggleSignInForm} className="m-2 text-orange-400 text-base cursor-pointer font-bold">{isSignInForm ? "Login to your account" : "create a new accont"}</span>
                    <div className="font-bold mt-5">___</div>
                    <img className="float-right mr-28 -mt-36 h-40"
                        src={LOGIN_PAGE_IMAGE} alt=""></img>
                </div>
                <div className="ml-20 mt-20">

                    <form onSubmit={(e) => { e.preventDefault() }} >

                        {!isSignInForm && <input type="text" className="border w-96 border-slate-300 p-4" placeholder="Name" ref={Name}></input>}
                        <br />
                        <input type="email" className="border border-slate-300 w-96 p-4 " placeholder="Email" ref={email}></input>
                        <br />
                        <input type="password" className="border border-slate-300 w-96 p-4" placeholder="password" ref={password}></input>
                        <br />
                        <br />

                        <p className="text-red-500 font-bold text-lg ">{errorMessage}</p>
                        <p>{successMsg}</p>

                        <button className="border border-orange-400 bg-orange-400 text-white p-3 font-bold w-96 text-xl" onClick={handleButtonClick}> {isSignInForm ? "Continue" : "Login"}</button>
                        <p className="text-sm  mt-2">By creating an account, I accept the Terms & Conditions & Privacy Policy</p>

                    </form>

                </div>
            </div>
        </>
    );
}

export default LoginPage;