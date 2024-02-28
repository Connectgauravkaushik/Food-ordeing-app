import { useDispatch, useSelector } from "react-redux";
import { RES_IMG_URL } from "../utils/constants";
import Header from "./Header";
import { clearCartItem, deleteBreak } from "../utils/createStoreSlice";
import PaymentGateway from "./paymentGateway";
import { useEffect, useState } from "react";


const ShowCartItems = () => {
    const [totalFoodCost, setTotalFoodCost] = useState(null);
    const CartItems = useSelector((store) => store.cartItem.items.item);
    const ResNames = useSelector((store) => store.cartItem.items.name);
    const dispatch = useDispatch();

    const clearCart = () => {
        dispatch(clearCartItem());

    }
    dispatch(deleteBreak());



    useEffect(() => {
        CartTotal();
        
    }, [CartItems]);


    const CartTotal = () => {
        let total = 0
        if (CartItems.length === 0) {
            setTotalFoodCost(0);
        } else {
            CartItems.map(item => {
                let ItemValue = item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100;
                total += ItemValue;
                setTotalFoodCost(Math.floor(total));
            })
        }
    }

    return (
        <>
            <Header />
            <div>
                <h1 className="text-2xl text-center font-bold mt-10">Cart Items</h1>
                <button className="border border-blue-600 bg-blue-600 p-2 w-32 text-white rounded-lg float-right mr-72 -mt-[4px] cursor-pointer"
                    onClick={clearCart}
                >Clear Cart</button>

                <div>
                   {ResNames!==null && <h1 className="text-2xl font-bold ml-72">{ResNames}</h1>}
                </div>
                {CartItems.map(i =>
                    <>
                        <div data-testid="foodItems" key={i.card.info.id} className="p-2 m-2 border-b border-black flex justify-between mt-12 ml-64 mr-64">
                            <div>
                                <div className=" mx-6">
                                    <span className="font-bold py-2 mx-1">{i.card.info.name} | {i.card.info.itemAttribute.vegClassifier === "VEG" ? "🟢" : "🔴"}</span>
                                    <p className="py-2 mx-1">₹{Math.floor(i.card.info.price ? i.card.info.price / 100 : i.card.info.defaultPrice / 100)}</p>
                                </div>
                                <p className="mx-6 py-2 text-sm">{i.card.info.description}</p>
                            </div>
                            <img className="rounded-lg w-44 h-40" src={RES_IMG_URL + i.card.info.imageId} alt="" />
                            <button className="bg-white shadow-lg absolute p-2 mx-[990px] z-20 w-32 my-[123px] rounded-md text-green-500 font-serif font-bold"
                                onClick={() => {
                                    dispatch(deleteBreak(i.card.info.id))
                                }}
                            >Delete</button>
                        </div>
                    </>

                )}
                {ResNames!==null && <div className="flex justify-between w-auto ml-72 mr-72">
                    <p className=" ml-2 float-left text-xl font-bold">Sub Total : </p>
                    <p className=" mr-2 float-right text-xl font-bold ">₹{totalFoodCost}</p>
                      
                </div>}
                <PaymentGateway cost={totalFoodCost} />
            </div>
          
        </>
    );
}

export default ShowCartItems;