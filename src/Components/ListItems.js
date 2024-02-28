import { useDispatch, useSelector } from "react-redux";
import { RES_IMG_URL } from "../utils/constants";
import { addCartItems, addResName } from "../utils/createStoreSlice";

const ListItems = ({ item }) => {
    const resItem = useSelector(store => store.restaurantsItem);
    const { name } = resItem.cards[2].card.card.info;

    const dispatch = useDispatch();
    const addItemInCart = (i) => {
        dispatch(addCartItems(i));
        dispatch(addResName(name));


    }

    return (
        <>
   
            <div>

                {item.map(i =>
                       
                    <div data-testid="foodItems" key={i.card.info.id} className="p-2 m-2 border-b border-black flex justify-between mt-12">
                      
                        <div>
                            <div className=" mx-6">
                                <span className="font-bold py-2 mx-1">{i.card.info.name} | {i.card.info.itemAttribute.vegClassifier === "VEG" ? "🟢" : "🔴"}</span>
                                <p className="py-2 mx-1">₹{Math.floor(i.card.info.price ? i.card.info.price / 100 : i.card.info.defaultPrice / 100)}</p>
                            </div>
                            <p className="mx-6 py-2 text-sm">{i.card.info.description}</p>
                        </div>
                        <img className="rounded-lg w-44 h-40" src={RES_IMG_URL + i.card.info.imageId} alt="" />
                        <button className="bg-white shadow-lg absolute p-2 mx-[916px] z-20 w-24 my-[123px] rounded-md text-green-500 font-serif font-bold"
                            onClick={() => addItemInCart(i)}
                        >Add Item</button>

                    </div>
                 
                )
                
                
                }


            </div>  
        </>
    );
}

export default ListItems;