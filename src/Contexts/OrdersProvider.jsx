/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

import { BASE_URL } from "../Constants/BASE_URL";

const OrdersContext = createContext();
const initialState = {
  orders: [],
  loading: true,
};
function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "setOrders":
      return {
        ...state,
        orders: payload,
        loading: false,
      };
    case "saveEdit":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === payload.id ? payload : order,
        ),
      };
    case "addOrder":
      return { ...state, orders: [...state.orders, payload.order] };
    default:
      throw new Error("Unknow action");
  }
}

function OrdersProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(
    function () {
      const fetchData = async () => {
        try {
          const res = await fetch(`${BASE_URL}/orders`);
          const data = await res.json();
          const addCheckBox = data.map((order) => {
            return { ...order, checked: false, editMode: false };
          });
          dispatch({ type: "setOrders", payload: addCheckBox });
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    },
    [dispatch],
  );
  return (
    <OrdersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </OrdersContext.Provider>
  );
}

function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) throw new Error("Using context outside Provider");
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { OrdersProvider, useOrders };
