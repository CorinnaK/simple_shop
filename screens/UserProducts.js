import React from "react";
import { StyleSheet, Button, Platform, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/UI/HeaderButton";
import ProductItem from "../components/shop/ProductItem";
import Colors from "../constants/Colors";

const UserProducts = (props) => {
  const adminUserProducts = useSelector((state) => state.products.userProducts);
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
    });
  });

  return (
    <FlatList
      data={adminUserProducts}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          onSelect={() => {}}
        >
          <Button color={Colors.primary} title="Edit" onPress={() => {}} />
          <Button color={Colors.primary} title="Delete" onPress={() => {}} />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default UserProducts;
