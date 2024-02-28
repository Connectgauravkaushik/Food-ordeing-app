import { useSelector } from "react-redux";
import { MEDIA_IMG_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const MultipleRestaurants = () => {

    const multipleRestaurants = useSelector(store => store?.restaurants?.restaurants?.restaurants);
    
    const sliderLeft = () => {
        var element = document.getElementById("restaurants");
        element.scrollLeft -= 500;

    }

    const sliderRight = () => {
        var element = document.getElementById("restaurants");
        element.scrollLeft += 500;
    }
    

    return (
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
            <div className="overflow-hidden scroll-smooth whitespace-nowrap ml-[139px] mt-5 " id="restaurants">
                <h1 className="font-bold text-2xl ml-[10px] mt-5 h-10 absolute">Top restaurant chains in Noida</h1>
                <div className="inline-flex overflow-hidden scroll-smooth whitespace-nowrap ml-[0] mr-[39px] mt-[5.25rem]">

                    {
                        multipleRestaurants.map((r) => (
                            <Link key={r.info.id} to={"/restaurant/" + r.info.id }> 
                            <div className="-ml-16 w-[388px] h-[380px] mt-38 ">
                                <img
                                    className="rounded-3xl w-[303px] h-[246px] ml-20"
                                    src={MEDIA_IMG_URL + r.info.cloudinaryImageId} alt=""></img>
                                <div className="ml-[100px]">
                                    <h3 className="font-bold text-xl  mt-5 overflow-hidden">{r.info.name}</h3>
                                    <p className="overflow-hidden text-ellipsis">{r.info.cuisines.join(',')}</p><span></span>
                                    <span className="font-bold">{r.info.sla.slaString}</span><span className="ml-2 font-bold">| {r.info.avgRating} ⭐ ratings</span>
                                    <p>{r.info.areaName}</p>
                                </div>
                            </div></Link>
                        ))
                    }
                </div>
            </div>
            <hr className="mt-2 ml-32 mr-32 border border-slate-200" />
        </>
    );
}

export default MultipleRestaurants;