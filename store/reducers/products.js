import PRODUCTS from "../../data/dummy-data (3)";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerID === "u1"),
};

export default (state = initialState, action) => {
  return state;
};
