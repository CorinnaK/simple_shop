import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../components/UI/HeaderButton";
import * as productsActions from "../store/actions/products";

const EditProduct = (props) => {
  const { productId } = props.route.params;
  const edittedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const [title, setTitle] = useState(
    edittedProduct ? edittedProduct.title : ""
  );
  const [imageUrl, setImageUrl] = useState(
    edittedProduct ? edittedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState(
    edittedProduct ? edittedProduct.price.toString() : ""
  );
  const [description, setDescription] = useState(
    edittedProduct ? edittedProduct.description : ""
  );
  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    if (edittedProduct) {
      dispatch(
        productsActions.updateProduct(productId, title, description, imageUrl)
      );
    } else {
      dispatch(
        productsActions.createProduct(title, description, imageUrl, +price)
      );
    }
    props.navigation.goBack();
  }, [dispatch, productId, title, description, imageUrl, price]);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: productId ? "Edit Product" : "Add Product",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
          ></TextInput>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          ></TextInput>
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            editable={edittedProduct ? false : true}
            style={styles.input}
            value={price}
            onChangeText={(text) => setPrice(text)}
          ></TextInput>
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          ></TextInput>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: { fontFamily: "open-sans-bold", marginVertical: 8 },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProduct;
