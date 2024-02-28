import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MEDIA_IMG_URL } from "../utils/constants";


const FastDeliveryRestaurant = () => {
    const fastDeliveryRest = useSelector((store) => store?.restaurants?.fastDeliveryRestaurants)

    return (
        <>

            {
                fastDeliveryRest.map((r) => (
                    <Link key={r.info.id} to={"/restaurant/" + r.info.id}>
                        <div className="-ml-16 w-[388px] h-[380px] mt-24 cursor-pointer">
                            <img
                                className="rounded-3xl w-[303px] h-[246px] ml-20"
                                src={MEDIA_IMG_URL + r.info.cloudinaryImageId} alt=""></img>
                            <div className="ml-[100px]">
                                <h3 className="font-bold text-xl  mt-5 overflow-hidden">{r.info.name}</h3>
                                <p className="overflow-hidden text-ellipsis">{r.info.cuisines.join(',')}</p><span></span>
                                <p>{r.info.avgRating} ⭐ ratings</p>
                                <p>{r.info.sla.slaString}</p>
                                <p>{r.info.areaName}</p>
                            </div>
                        </div></Link>
                ))
            }
        </>
    );
}

export default FastDeliveryRestaurant;