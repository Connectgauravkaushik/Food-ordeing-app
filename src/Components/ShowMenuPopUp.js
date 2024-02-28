import { useSelector } from "react-redux";


const ShowMenuPopUp = () => {
    const resItem = useSelector(store => store.restaurantsItem.cards[4].groupedCard.cardGroupMap.REGULAR);
    const categoriesItem = resItem?.cards.filter(c => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

    return (
        <div className="sticky bottom-[50px] border  border-white bg-white shadow-xl left-[50%] h-[300px] ml-96 mr-96 overflow-y-scroll">
            {
                categoriesItem.map(c => (
                    <div className="p-2 ml-3 mt-5 flex justify-between bg-gray-100 font-bold font-sans">
                        <button>{c.card.card.title}</button><p>{c.card.card.itemCards.length}</p>
                    </div>
                ))
            }

        </div>
    );
}

export default ShowMenuPopUp;