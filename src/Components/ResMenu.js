import { useSelector } from "react-redux";
import ListItems from "./ListItems";
import { useState } from "react";
import ShowVegItemsOnly from "./VegOnlyItems";

const ResMenu = ({ showVeg }) => {
   const [showItem, setShowItems] = useState(false);
   const [menuName, setMenuName] = useState();
   const [showPopUp, setShowPopUp] = useState(false);
   const resItem = useSelector(store => store.restaurantsItem.cards[4].groupedCard.cardGroupMap.REGULAR);
   const categoriesItem = resItem?.cards.filter(c => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

   return (
      <>
         {
            categoriesItem.map((c) => (
               <>

                  {c.card.card.title !== undefined &&
                     <div className="ml-72 mt-[170px] mr-72" key={c.card.card.title} >
                        <div className=" border border-white rounded-lg h-auto shadow-2xl -mt-[133px]" id={c.card.card.title} >
                           <div className="mt-8 ml-10 cursor-pointer"
                              onClick={(e) => {
                                 const val = e.target.innerText;
                                 setMenuName(val);
                                 setShowItems(!showItem);

                              }}>

                              <h2 className="text-xl font-bold -mt-[16px]">{c.card.card.title}</h2>
                              <p className="ml-[999px] -mt-[12px] ">{showItem ? "🔽" : "⬆️"}</p>

                           </div>
                           {showItem && menuName === (c.card.card.title) && showVeg ? (<ShowVegItemsOnly items={c.card.card.itemCards} key={c.card.card.title} veg={showVeg} />)
                              : (showItem && menuName === (c.card.card.title) && <ListItems item={c.card.card.itemCards} key={c.card.card.title} />)
                           }
                        </div>
                     </div>
                  }

               </>
            ))
         }
         {showPopUp && <ShowMenuPopUp />}
         <div className="sticky bottom-[10px]" >
            <button className="border rounded-2xl text-white bg-orange-400 p-1 w-44  ml-[732px]" 
            onClick={() => setShowPopUp(!showPopUp)}>BROWSE MENU</button>
         </div>
      </>



   );
}



const ShowMenuPopUp = () => {
   const resItem = useSelector(store => store.restaurantsItem.cards[4].groupedCard.cardGroupMap.REGULAR);
   const categoriesItem = resItem?.cards.filter(c => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

   return (
      <div className="sticky bottom-[50px] border  border-white bg-white shadow-2xl left-[50%] h-[300px] ml-96 mr-96 overflow-y-scroll">
         {
            categoriesItem.map(c => (
               <a href={"#"+c.card.card.title}><div className="p-2 ml-3 mt-5 flex justify-between bg-gray-100 font-bold font-sans">
                  <button>{c.card.card.title}</button><p>{c.card.card.itemCards.length}</p>
               </div></a>
            ))
         }

      </div>
   );
}

export default ResMenu;
