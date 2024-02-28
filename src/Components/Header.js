import { useDispatch, useSelector } from "react-redux";
import { APP_LOGO, RES_IMG_URL, SEARCH_QUERY_IMAGE } from "../utils/constants";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { cacheResults, clearResults } from "../utils/searchSlice";

const Header = () => {

    const [isHovering, setIsHovering] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const TotalItems = useSelector(store => store.cartItem.items.item);
    const navigate = useNavigate();
    const searchCache = useSelector(store => store.search);



    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchCache !== null && searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            }
            if (searchQuery === "") {
                dispatch(clearResults());
            }

            else {
                searchFoodItems();
            }


        }, 500);


        return () => {
            clearTimeout(timer);
        }

    }, [searchQuery]);


    const searchFoodItems = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/search/suggest?lat=28.5355161&lng=77.3910265&str=" + searchQuery + "&trackingId=undefined");
        const json = await data.json();
        dispatch(cacheResults(json?.data?.suggestions));

    }




    const handleSignOut = () => {
        signOut(auth)
            .then(() => {

            }).catch((error) => {
                navigate("/Error");
            });
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in,checking authentication
                const { uid, email, displayName } = user;

                dispatch(
                    addUser(
                        {
                            uid: uid,
                            email: email,
                            displayName: displayName
                        }));

            } else {
                // User is signed out
                dispatch(removeUser());
                navigate('/')
            }
        });

        return () => {
            unsubscribe();
        }

    }, []);
    const handleMouseOver = () => {

        setIsHovering(true);


    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };


    return (
        <>
            <div className="flex shadow-lg">
                <div>
                    <img className="h-40 w-44 mx-32 mr-0 -mt-8" src={APP_LOGO} alt=""></img>
                </div>

                <div className="mt-8 ml-32">
                    <input
                        className="border border-slate-400 p-2 w-[41rem] rounded-lg"
                        type="text"
                        value={searchQuery}
                        placeholder="search"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}

                    >
                    </input>
                    <span><button className=" ml-3 border border-orange-400 bg-orange-400 text-white p-2 rounded-lg">Search</button></span>
                    {showSuggestions && (
                        <div className='absolute z-10 bg-white py-2 px-2 w-[41rem] my-1 rounded-lg shadow-xl border border-gray-100 overflow-y-scroll h-[500px]' onMouseLeave={() => setShowSuggestions(false)} >
                            <ul>

                                {searchCache === null ?
                                    <div className="w-auto mb-4 mt-[114px] ml-[152px]">
                                        <img
                                            className="ml-30 opacity-35"
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9SL-syk00PytaGYO7A34FpOZANnyui2Jo1-1hJ8PIecV1H80mVF1kjZHxHS2nz-a412k&usqp=CAU" alt=""></img>
                                        <h1 className=" font-sans text-xl font-bold ml-[65px] opacity-25">Search Food </h1>
                                    </div>
                                    : searchCache.map(s => (

                                        <div className="flex flex-wrap justify-between w-auto mb-4">

                                            <Link to={"/search?query=" + s?.text} >
                                                <li key={s} className='font-bold py-2 shadow-sm hover:bg-gray-100 cursor-pointer'> {s?.text}</li>
                                            </Link>
                                            <img className="rounded-lg w-20 h-20 " src={SEARCH_QUERY_IMAGE + s?.cloudinaryId} alt="" />
                                        </div>


                                    ))}

                            </ul>


                        </div>)}
                </div>

                <div className="mt-9 ml-20">
                    <button>👤Gaurav</button>
                </div>

                <Link to="/cart">
                    <div className=" mt-9 ml-24 flex cursor-pointer" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                        {isHovering &&
                            <ShowCartOnMover />}
                        <img
                            className="w-8 h-8 -mt-1"
                            src="https://images.emojiterra.com/google/android-11/512px/1f6d2.png" alt=""></img>

                        <h3>Cart</h3>
                        <p className=" h-[36px] w-[24px] mt-0 ml-0 text-center">{TotalItems.length}</p>
                    </div></Link>
                <button className="ml-[54px] mt-[33px] border border-orange-400 bg-orange-400 text-white font-bold p-2 h-[39px] " onClick={handleSignOut}>Logout</button>

            </div>

        </>
    )
}

const ShowCartOnMover = () => {
    const CartItems = useSelector((store) => store.cartItem.items.item);
    const ResNames = useSelector((store) => store.cartItem.items.name);
    const [totalFoodCost, setTotalFoodCost] = useState(0);

    useEffect(() => {
        CartTotal();
    }, []);


    const CartTotal = () => {
        let total = 0
        if (CartItems.length === 0) {
            setTotalFoodCost(0);
        } else {
            CartItems.map(item => {
                let ItemValue = item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100;
                total += ItemValue;
                setTotalFoodCost(Math.floor(total));
            })
        }
    }



    return CartItems.length !== 0 ? (
        <>
            <div className=" cursor-pointer float-right mr-[960px] border border-white shadow-2xl mt-[33px] w-[297px] h-auto absolute bg-white  border-t-orange-400 border-y-4 -ml-[213px]">
                <div className="w-auto">
                    <h1 className="text-xl font-bold">{ResNames}</h1>
                </div>
                <div className="w-auto">
                    {
                        CartItems.map(i => (
                            <>
                                <div>
                                    <div className="flex mt-6 overflow-hidden text-ellipsis justify-between w-auto">
                                        <span className=" font-bold text-[12px] overflow-hidden text-ellipsis float-right">{i.card.info.itemAttribute.vegClassifier === "VEG" ? "🟢" : "🔴"} {i.card.info.name} </span>
                                        <img className=" mr-2 rounded-lg w-18 h-16" src={RES_IMG_URL + i.card.info.imageId} alt="" />
                                    </div>
                                    <div className="flex justify-between w-auto">
                                        <p className=" ml-2 float-left text-sm">Total : </p>
                                        <p className="mr-2 float-right text-sm">₹{Math.floor(i.card.info.price ? i.card.info.price / 100 : i.card.info.defaultPrice / 100)}</p>
                                    </div>
                                    <p>----------------------------------------------</p>

                                </div>
                            </>
                        ))
                    }

                    <div className="flex justify-between w-auto">
                        <p className=" ml-2 float-left text-sm font-bold">Sub Total : </p>
                        <p className=" mr-2 float-right text-sm font-bold ">₹{totalFoodCost}</p>
                    </div>

                </div>
                <div className="w-auto mt-2">
                    <Link to="/cart"> <button className="border border-orange-400 bg-orange-400 text-white text-base font-bold w-56 ml-10 mr-10"> CHECKOUT</button></Link>
                </div>

            </div>
        </>
    ) : (
        <div className=" cursor-pointer float-right mr-[960px] border border-white shadow-2xl mt-[50px] w-[297px] h-[238px] absolute bg-white  border-t-orange-400 border-y-4 -ml-[264px]">
            <div className="w-auto flex justify-center mt-28">
                <h1 className="text-2xl">No Item in the Cart </h1>
            </div>
        </div>
    )
        ;
}

export default Header;