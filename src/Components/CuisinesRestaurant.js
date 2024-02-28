import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Menu_API_URL } from "../utils/constants";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { addRestaurantItems } from "../utils/resItemsSlice";
import ResItemList from "./ItemList";
import ShimmerUI from "./shimmer";

const RestaurantItemList = () => {
    const { resId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchRestaurantData(resId);
    }, []);

    const fetchRestaurantData = async (resId) => {
        const data = await fetch(Menu_API_URL + resId);
        const json = await data.json();
        dispatch(addRestaurantItems(json.data));
        const pureVeg = json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[0].card.card.isPureVeg;
        console.log(pureVeg);
       
    }

    return (
        <>
            <div>
                <Header />
                <ResItemList/>
            </div>
        </>
    );
}

export default RestaurantItemList;