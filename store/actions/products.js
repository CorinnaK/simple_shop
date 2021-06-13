export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";

export const deleteProduct = (productId) => {
  return { type: "DELETE_PRODUCT", pid: productId };
};
export const editProduct = (productId) => {
  return { type: "EDIT_PRODUCT", pid: productId };
};
