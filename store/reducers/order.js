import Order from "../../models/Order";
import { ADD_ORDER } from "../actions/order";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount.toFixed(2),
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }
  return state;
};
