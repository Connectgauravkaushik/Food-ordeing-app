import { Provider } from "react-redux";
import Auth from "./Components/auth";
import appStore from "./utils/appStore";
import { Outlet, createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import RestaurantMenu from "./Components/RestaurantsMenu";
import RestaurantItemList from "./Components/CuisinesRestaurant";
import ShowCartItems from "./Components/ShowCartItems";
import SearchRestaurant from "./Components/SearchRestaurants";
import PaymentGateway from "./Components/paymentGateway";

function App() {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Auth />
    },
    {
      path: "/home",
      element: <RestaurantMenu />
    },
    {
      path:"/restaurant/:resId",
      element:<RestaurantItemList/>
    },
    {
      path:"/cart",
      element:<ShowCartItems/>
    },
    {
      path:"/search",
      element:<SearchRestaurant/>
    },
    {
      path:"/payment",
      element:<PaymentGateway/>
    }
  ]);

  return (

    <div className="App">
      <Provider store={appStore}>
        <RouterProvider router={appRouter} />
        <Outlet />
      </Provider>

    </div>
  );
}

export default App;
