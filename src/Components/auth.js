import { APP_LOGO, BG_IMAGE, CAROUSEL_IMG_1, CAROUSEL_IMG_2, CAROUSEL_IMG_3, PHONE_MENU_IMG, PHONE_MENU_IMG_2 } from "../utils/constants";
import { useEffect, useState } from "react";
import LoginPage from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { addloginState } from "../utils/loginPageSlice";

const Auth = () => {
    const [headingText, setHeadingText] = useState("Good night?");
    const [opacity, setOpacity] = useState()
    const Headings = ["Late night at office ?", "Cooking gone wrong ?", "Unexpected guests?", "Movie Marathon?", "Hungry?", "Game night?"];
    const dispatch = useDispatch();
    const getloginState = useSelector(store => store.loginState);

    useEffect(() => {

        const interval = setInterval(() => {
            setHeadingText(Headings[Math.floor(Math.random() * Headings.length)]);
        }, 2000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    const OpenLoginPage = () => {
        dispatch(addloginState(true))
        setOpacity("blur-sm");

    }

    return (
        <>
            <div className={getloginState ? opacity : "blur-none"}>
                <div className="w-[50%] float-left ">
                    <img className="h-60 w-60 mx-36 mr-0" src={APP_LOGO} alt=""></img>

                    <div className="float-right -my-32">
                        <span><button className="font-bold  hover:text-orange-400"  onClick={OpenLoginPage}>Login</button></span>
                        <span><button className="mx-5 bg-black text-white text-sm px-6 py-2 font-bold cursor-pointer" onClick={OpenLoginPage}>SignUp</button></span>
                    </div>
                    <div className="mx-36">
                        <h1 className="font-bold text-4xl">{headingText}</h1>
                        <h2 className="text-2xl my-4">Order food from favourite restaurants near you.</h2>
                    </div>

                    <div className="mx-36">
                        <input className="border border-slate-300 p-3 w-[420px]"></input><span><button className="border border-orange-400 bg-orange-400 text-white p-3 font-bold">Find Food</button></span>
                    </div>

                    <div className="mx-36">
                        <p className="my-4">POPULAR CITIES IN INDIA</p>
                        <p className="my-2">Ahmedabad Bangalore Chennai Delhi Gurgaon Hyderabad Kolkata Mumbai Pune & more.</p>
                    </div>

                </div>
                <aside className=" float-right w-[46%] relative -z-10">
                    <img className="h-full" src={BG_IMAGE} alt=""></img>
                </aside>
                <br />

                <div className="w-full h-96 bg-[#2b1e16] mt-[590px] ">
                    <div className=" flex justify-between">
                        <div>
                            <img className="h-60 mx-64" src={CAROUSEL_IMG_1} alt=""></img>
                            <div className="ml-60 text-lg text-white mt-5 font-bold">No Minimum Order</div>
                            <div className="text-white ml-48 mt-3 text-sm">Order in for yourself or for the group, with no restrictions on order value</div>
                        </div>
                        <div>
                            <img className="h-60 mx-56" src={CAROUSEL_IMG_2} alt=""></img>
                            <div className="ml-60 text-lg text-white mt-5 font-bold">Live Order Tracking</div>
                            <div className="text-white ml-48 mt-3 text-sm">Know where your order is at all times, from the restaurant to your doorstep</div>
                        </div>
                        <div>
                            <img className="h-60 mx-56" src={CAROUSEL_IMG_3} alt=""></img>
                            <div className="ml-60 text-lg text-white mt-5 font-bold">Lightning-Fast Delivery</div>
                            <div className="text-white ml-52 mt-3 text-sm">Experience Swiggy's superfast delivery for food delivered fresh & on time</div>
                        </div>
                    </div>
                </div>

                <div className="">
                    <div className="font-bold text-3xl w-[20%] ml-60 mt-56">Restaurants in your pocket</div>
                    <div className="text-xl my-4 w-[20%] ml-60">Order from your favorite restaurants & track on the go, with the all-new food explorer app.</div>
                    <div className=" flex m-2 ml-60 w-[20%]">
                        <a href="https://play.google.com/store/apps/details?id=in.swiggy.android" alt="">
                            <img className="w-52"
                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/play_ip0jfp" alt=""></img></a>

                        <a href="https://apps.apple.com/in/app/swiggy-food-grocery-delivery/id989540920" alt="">
                            <img className="w-52"
                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/iOS_ajgrty" alt=""></img></a>
                    </div>

                    <img
                        className="float-right -mt-[470px] h-[500px] mr-[460px]"
                        src={PHONE_MENU_IMG} alt=""></img>
                    <img
                        className="float-right -mt-[230px] h-[500px] ml-[700px] "
                        src={PHONE_MENU_IMG_2} alt=""></img>
                </div>
            </div>
            { getloginState &&
                    <div className="relative z-10 blur-none -mt-96 ">
                        <LoginPage />
                    </div>
            }

        </>
    )
}

export default Auth;