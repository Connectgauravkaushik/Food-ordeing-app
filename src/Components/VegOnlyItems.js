import { useDispatch, useSelector } from "react-redux";
import { RES_IMG_URL } from "../utils/constants";
import { addCartItems, addResName } from "../utils/createStoreSlice";

const ShowVegItemsOnly = ({ items, veg }) => {
  const resItem = useSelector(store => store.restaurantsItem);
  const { name } = resItem.cards[2].card.card.info;

  const dispatch = useDispatch();
  const addItemInCart = (item) => {
    dispatch(addCartItems(item));
    dispatch(addResName(name));


  }

  return veg && (

    <div>
      {items.map(item =>
        <div>{item.card.info.itemAttribute.vegClassifier === "VEG" &&
          (<div key={item.card.info.id} className="p-2 m-2 border-b border-black flex justify-between ">
            <div>
              <div className=" mx-6">
                <span className="font-bold py-2 mx-1">{item.card.info.name} | {item.card.info.itemAttribute.vegClassifier === "VEG" ? "🟢" : "🔴"}</span>
                <p className="py-2 mx-1">₹{Math.floor(item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100)}</p>
              </div>
              <p className="mx-6 py-2 text-sm">{item.card.info.description}</p>
            </div>
            <img className="rounded-lg w-44 h-40" src={RES_IMG_URL + item.card.info.imageId} alt="" />
            <button className="bg-white shadow-lg absolute p-2 mx-[916px] z-20 w-24 my-[123px] rounded-md text-green-500 font-serif font-bold"
              onClick={() => addItemInCart(item)}>Add Item</button>
          </div>)
        }
        </div>
      )}

    </div>
  )
}

export default ShowVegItemsOnly;