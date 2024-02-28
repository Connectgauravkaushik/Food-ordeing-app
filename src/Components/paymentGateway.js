import { useCallback, useEffect } from "react";
import useRazorpay from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { RES_IMG_URL, RazorPayConfig } from "../utils/constants";
import { clearCartItem } from "../utils/createStoreSlice";

const PaymentGateway = () => {
    const [Razorpay, isLoaded] = useRazorpay();
    const ResNames = useSelector((store) => store.cartItem.items.name);
    const CartItems = useSelector((store) => store?.cartItem?.items?.item);
    const dispatch = useDispatch();

    const handlePayment = useCallback(() => {
        const order = "";

        const options = {
            key: RazorPayConfig.apiKey,
            amount: CartItems.reduce((acc, curr) => (
                acc = acc + curr.card.info.price

            ), 0),
            currency: "INR",
            name: ResNames,
            description: "Test Transaction",
            image: RES_IMG_URL + CartItems[0]?.card?.info?.imageId,
            order_id: order.id,
            handler: (res) => {
                console.log(res);
                if (true) {
                    dispatch(clearCartItem());
                }
            },
            prefill: {
                name: "Gaurav",
                email: "youremail@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
    }, [Razorpay]);

    useEffect(() => {
        if (isLoaded) {
            handlePayment();
        }

    }, [isLoaded, handlePayment])

    return CartItems.length !== 0 && (
        <div className="border border-green-500 bg-green-400 p-2  text-white font-bold rounded-lg ml-[47%] mr-[38%]">
            <button
                className="ml-20"
                onClick={handlePayment}>Pay Now</button>
        </div>

    );
}

export default PaymentGateway;