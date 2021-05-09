import { createContext, useContext, useEffect, useReducer } from 'react';;
import commerce from '../utils/commerce';


const CartStateContext = createContext();
const CartDispatchContext = createContext();

const SET_CART = 'SET_CART';

const initialState = {
    total_items: 0,
    total_unique_items: 0,
    line_items: []
}

const reducer = (state, actions) => {
    switch (actions.type) {
        case SET_CART: return {...state, ...actions.payload}
        default: return state
    }
}

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        getCart();
    },[])

    const setCart = payload => dispatch({ type: SET_CART, payload })
    const getCart = async () => {
        try {
            const cart = await commerce.cart.retrieve()
            setCart(cart);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CartDispatchContext.Provider value={{ setCart }}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);

export default CartProvider;