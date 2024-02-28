import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { addRestaurants, clearRestaurants } from "../utils/searchResSlice";
import { SEARCH_RES_IMAGE } from "../utils/constants";
import ShimmerUI from "./shimmer";

const SearchRestaurant = () => {

    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const getSearchRestaurantData = useSelector(store => store.searchRes);

    useEffect(() => {
        getSearchRestaurant();

        return () => {
            dispatch(clearRestaurants());
        }
    }, []);



    const getSearchRestaurant = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.5355161&lng=77.3910265&str=" + searchParams.get("query") + "&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=bd52aa24-315d-fdcb-661a-6eba3e1ad819&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22VEG%22%2C%22cloudinaryId%22%3A%22dyhqamt6bjfjwm4pkbat%22%2C%22dishFamilyId%22%3A%22846627%22%2C%22dishFamilyIds%22%3A%5B%22846627%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D")
        const json = await data.json();
        const restauratsItems = json?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH.cards
        dispatch(addRestaurants(restauratsItems));
    }

    if (getSearchRestaurantData === null) return <ShimmerUI />
    return (
        <>
            <Header />
            <div className="flex flex-wrap ml-64 mr-64 justify-between ">
                {
                    getSearchRestaurantData.map(r => (
                        r?.card?.card?.info &&
                        <Link to={"/restaurant/" + r?.card?.card?.restaurant?.info?.id}>
                            <div className="-ml-16 w-[388px] h-[260px] mt-20 cursor-pointer border border-white bg-white shadow-xl rounded-2xl">
                                <div className="ml-[17px] mt-auto">
                                    <h3 className="font-bold text-base">{r?.card?.card?.restaurant?.info?.name}</h3>
                                    <img
                                        className="ml-[342px]"
                                        src="https://www.reshot.com/preview-assets/icons/STPW6DFVRY/bold-right-arrow-STPW6DFVRY-b83b2.svg" alt="" />
                                    <p>{r?.card?.card?.restaurant?.info?.avgRating}</p>
                                    <p >{r?.card?.card?.restaurant?.info?.sla.slaString}</p>
                                </div>

                                <div className=" flex justify-evenly">

                                    <h3 className="font-bold text-base  mt-5 ml-[17px]">{r?.card?.card?.info?.name}</h3>

                                    <img
                                        className="rounded-xl w-[109px] h-[94px] ml-[145px]"
                                        src={r?.card?.card?.info?.imageId
                                            ? SEARCH_RES_IMAGE + r?.card?.card?.info?.imageId
                                            : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"} alt=""></img>

                                </div>

                                <div className="w-[323px] ml-4 mt-2 h-auto truncate text-ellipsis">
                                    <p className="text-sm truncate text-ellipsis">{r.card?.card?.info?.description}</p>
                                </div>

                            </div></Link>

                    ))
                }
            </div>
        </>
    );
}

export default SearchRestaurant;