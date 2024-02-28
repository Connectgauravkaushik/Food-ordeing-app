import { useState } from "react";
import HighRatedRestaurant from "./HighRatedRestaurants";
import PureVegRestaurants from "./PureVegRestaurants";
import FastDeliveryRestaurant from "./fastDeliveryRestaurants";
import Allrestaurants from "./AllRestaurants";

const RestaurantOnlineDelivery = () => {
    const [HighRatedRes, setHighRatedRes] = useState(false);
    const [showVeg, setShowVeg] = useState(false);
    const [fastDeliveryRestaurant, setFastDeliveryRestaurant] = useState(false);
    const [FilterCount, setFilterCount] = useState(null);

    return (
        <>
            <div>
                <h1 className="font-bold text-2xl ml-36 mt-5 h-10 absolute">Restaurants with online food delivery in Noida</h1>
                <div className="flex mt[13px] ml-36">
                    <div className="mt-[67px] ">
                        <button className={
                            FilterCount ? "border border-orange-400 text-black bg-orange-400 rounded-2xl p-1 w-32 ml-2"
                            : "border border-slate-300 text-black bg-white  rounded-2xl p-1 w-32 ml-2"
                        }
                        
                        >Filters {FilterCount}</button>
                        <button className={
                            fastDeliveryRestaurant ? "border border-green-500 text-black bg-green-500  rounded-2xl p-1 w-32 ml-2"
                                : "border border-slate-300 text-black bg-white  rounded-2xl p-1 w-32 ml-2"
                        }

                            onClick={() => {

                                setFastDeliveryRestaurant(!fastDeliveryRestaurant);
                                fastDeliveryRestaurant ? setFilterCount(() => FilterCount - 1) : setFilterCount(() => FilterCount + 1)

                            }}
                        >Fast delivery</button>
                        <button className={
                            HighRatedRes ? "border border-green-500 text-black bg-green-500  rounded-2xl p-1 w-32 ml-2"
                                : "border border-slate-300 text-black bg-white  rounded-2xl p-1 w-32 ml-2"
                        }
                            onClick={() => {
                                setHighRatedRes(!HighRatedRes);
                                HighRatedRes ? setFilterCount(() => FilterCount - 1) : setFilterCount(() => FilterCount + 1)

                            }}>Ratings 4.0+</button>

                        <button className={
                            showVeg ? "border border-green-500 text-black bg-green-500  rounded-2xl p-1 w-32 ml-2"
                                : "border border-slate-300 text-black bg-white  rounded-2xl p-1 w-32 ml-2"
                        }
                            onClick={() => {
                                setShowVeg(!showVeg);
                                setFilterCount(() => FilterCount + 1);
                                showVeg ? setFilterCount(() => FilterCount - 1) : setFilterCount(() => FilterCount + 1)
                            }}
                        >Pure veg</button>

                    </div>
                </div>
                <div className="flex flex-wrap ml-32 mr-32 mt-[7px]">
                    {
                        fastDeliveryRestaurant ? <FastDeliveryRestaurant /> : " "
                            && showVeg ? <PureVegRestaurants /> : " "
                                && HighRatedRes ? <HighRatedRestaurant /> : " "
                        && <Allrestaurants />
                    }
                </div>
            </div>
        </>
    );
}

export default RestaurantOnlineDelivery;