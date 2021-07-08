import React from "react";
import {
  StyleSheet,
  Button,
  Platform,
  FlatList,
  Alert,
  View,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as productsActions from "../store/actions/products";
import HeaderButton from "../components/UI/HeaderButton";
import ProductItem from "../components/shop/ProductItem";
import Colors from "../constants/Colors";

const UserProducts = (props) => {
  const adminUserProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert("Deleting is permanent!", "Are you sure you want to delete?", [
      { text: "Cancel", style: "default" },
      {
        text: "Confirm",
        style: "destructive",
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        },
      },
    ]);
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: "Your Products",
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add"
            iconName={
              Platform.OS === "android" ? "md-add-circle" : "ios-add-circle"
            }
            onPress={() => {
              props.navigation.navigate("EditProduct");
            }}
          />
        </HeaderButtons>
      ),
    });
  });

  if (adminUserProducts.length === 0) {
    return (
      <View style={styles.empty}>
        <Text>No Products found. You will need to add a product.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={adminUserProducts}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserProducts;
