import React, { useState, useEffect } from "react";
import axios from "axios";
import CartDetail from "../components/CartDetail";
import { useParams } from "react-router";

const CartContainer = () => {
    const {cid} = useParams()
    const [cartData, setCartData] = useState(null);
    
    const SERVER_PORT = 8080;


    useEffect(() => {
        axios.get(`http://localhost:${SERVER_PORT}/api/carts/${cid}`)
            .then(response => {
                setCartData(response.data.payload);
            })
            .catch(error => {
                console.error("Error fetching cart:", error);
            });
    }, [cid]);
    
    if (!cid) {
        return <p>No cart ID provided.</p>;
    }

    return (
        <div>
            {cartData ? <CartDetail cart={cartData} cid={cid} /> : <p>Loading cart...</p>}
        </div>
    );
}

export default CartContainer;