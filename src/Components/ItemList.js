import { useSelector } from "react-redux";
import ShimmerUI from "./shimmer";
import ResMenu from "./ResMenu";
import { useState } from "react";


const ResItemList = () => {
    const [vegOptions, setVegOption] = useState(false);
    const resItem = useSelector(store => store.restaurantsItem);
    if (resItem === null) return <ShimmerUI />

    const { name, cuisines, areaName, costForTwoMessage, avgRating, totalRatingsString } = resItem.cards[2].card.card.info;

    return (
        <>
            <div>

                <div className="mt-20">
                    <h1 className="text-2xl font-bold ml-36">{name}</h1>
                    <h3 className="text-xl ml-36">{cuisines.join(',')}</h3>
                    <p className="ml-36">{areaName}</p>
                    <p className="ml-36">{costForTwoMessage}</p>
                    <span className="ml-36">⭐{avgRating}</span><span className="ml-2">|</span><span className="ml-3">{totalRatingsString}</span>
                    <br />
                    <label className="relative inline-flex items-center cursor-pointer my-5 ml-36">
                        <input type="checkbox" value={vegOptions} className="sr-only peer" onChange={(e) => {
                            vegOptions === false ? setVegOption(true) : setVegOption(false);
                        }} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer dark:bg-slate-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium font-sans ">veg Only</span>
                    </label>
                </div>
                <input type="text" className="border float-right mr-36 -mt-24 rounded-l-xl p-2 border-slate-300" />
                <button className="border border-orange-400 float-right mr-20 bg-orange-400 text-white w-16 -mt-24 p-2 rounded-r-xl">Search</button>

            </div>
            <ResMenu key={name} showVeg={vegOptions} />
        </>
    )
}

export default ResItemList;