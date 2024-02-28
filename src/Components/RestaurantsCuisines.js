import { useDispatch, useSelector } from "react-redux";
import { UseRestaurantCuisines } from "../Custom-hooks/useRestaurantData";
import { BANNER_IMG } from "../utils/constants";
import ShimmerUI from "./shimmer";
import MultipleRestaurants from "./MultipleRestaurants";
import RestaurantOnlineDelivery from "./RestaurantOnlineDelivery";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { removeRestaurantItems } from "../utils/resItemsSlice";

const Restaurants = () => {
    const user = useSelector(store => store.user);
    UseRestaurantCuisines();

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(removeRestaurantItems());
        }
    })

    const cusinesdata = useSelector(store => store?.cuisines?.info);
    if (cusinesdata === null) return;

    const sliderLeft = () => {
        var element = document.getElementById("cuisines");
        element.scrollLeft -= 400;

    }
    const sliderRight = () => {
        var element = document.getElementById("cuisines");
        element.scrollLeft += 400;

    }

    return cusinesdata ? (
        <>
            <div className="flex float-right mr-20 mt-[23px] ">
                <img
                    className="w-8 cursor-pointer"
                    onClick={sliderLeft}
                    src="https://www.reshot.com/preview-assets/icons/4NA6KJF8CU/arrow-left-4NA6KJF8CU.svg" alt=""></img>
                <img
                    className="w-8 ml-4 cursor-pointer"
                    onClick={sliderRight}
                    src="https://www.reshot.com/preview-assets/icons/ZP2WDL9B8N/arrow-right-ZP2WDL9B8N.svg" alt=""></img>
            </div>
            <div className="overflow-hidden scroll-smooth whitespace-nowrap ml-32" id="cuisines">
                <h1 className="font-bold text-2xl ml-34 mt-5 h-10 absolute">
                     Gaurav, What's in Your mind ?
                    </h1>
                <div className="inline-flex ml-34 mt-[70px]">
                    {
                        cusinesdata.map((c) => (
                            <div className="w-[150px] ">
                                <Link to="">
                                    <img
                                        className=""
                                        src={BANNER_IMG + c.imageId} alt=""></img></Link>

                            </div>

                        ))
                    }
                </div>
            </div>
            <hr className="mt-10 ml-36 mr-36 border border-slate-200" />

            <MultipleRestaurants />
            <RestaurantOnlineDelivery />

        </>
    ) : (
        <ShimmerUI />
    )
}

export default Restaurants;