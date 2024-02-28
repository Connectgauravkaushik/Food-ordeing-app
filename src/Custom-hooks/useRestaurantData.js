import { useEffect } from "react";
import { MENU_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addCusinesData } from "../utils/resCuisinesSlice";
import { addFastDeliveryRestaurants, addHighRatedItems, addPureVegRestaurants, addResItems } from "../utils/resNamesSlice";


export const UseRestaurantCuisines = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(MENU_URL);
        const json = await data.json();
        const HighRatedRestaurant = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle.restaurants;
        const filteredRestaurant = HighRatedRestaurant.filter((res) => res?.info.avgRating > 4.4);
        const pureVegRes = HighRatedRestaurant.filter((res) => res?.info?.veg);
        const fastDeliveryRestaurant = HighRatedRestaurant.filter((res) => res?.info?.sla?.deliveryTime < 35);

        dispatch(addCusinesData(json.data.cards[0].card.card.imageGridCards));
        dispatch(addResItems(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle));
        dispatch(addHighRatedItems(filteredRestaurant));
        dispatch(addPureVegRestaurants(pureVegRes));
        dispatch(addFastDeliveryRestaurants(fastDeliveryRestaurant));

    }
}