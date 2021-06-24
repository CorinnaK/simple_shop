import React, { useState, useCallback, useReducer, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../components/UI/HeaderButton";
import Input from "../components/UI/Input";
import Colors from "../constants/Colors";
import * as productsActions from "../store/actions/products";

const FORM_INPUT_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value.toString(),
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditProduct = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const { productId } = props.route.params;
  const edittedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: edittedProduct ? edittedProduct.title : "",
      imageUrl: edittedProduct ? edittedProduct.imageUrl : "",
      price: edittedProduct ? edittedProduct.price.toString() : "",
      description: edittedProduct ? edittedProduct.description : "",
    },
    inputValidities: {
      title: edittedProduct ? true : false,
      imageUrl: edittedProduct ? true : false,
      price: edittedProduct ? true : false,
      description: edittedProduct ? true : false,
    },
    formIsValid: edittedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Something went wrong. ", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Alert", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (edittedProduct) {
        await dispatch(
          productsActions.updateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, productId, formState]);

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

  const onInputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={5}
    >
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Input
              id="title"
              label="Title"
              errorText="Please enter a valid title"
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              onInputChange={onInputChangeHandler}
              initialValue={edittedProduct ? edittedProduct.title : ""}
              initiallyValid={!!edittedProduct}
              required
            />
            <Input
              id="imageUrl"
              label="ImageUrl"
              errorText="Please enter a valid url for your image"
              keyboardType="default"
              returnKeyType="next"
              onInputChange={onInputChangeHandler}
              initialValue={edittedProduct ? edittedProduct.imageUrl : ""}
              initiallyValid={!!edittedProduct}
              required
            />
            <Input
              id="price"
              editable={edittedProduct ? false : true}
              label="Price"
              errorText="Please enter a valid price"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={onInputChangeHandler}
              initialValue={
                edittedProduct ? edittedProduct.price.toString() : ""
              }
              initiallyValid={!!edittedProduct}
              required
              min={0.1}
            />
            <Input
              id="description"
              label="Description"
              errorText="Please enter a valid description"
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              multiline
              numberOfLines={3}
              onInputChange={onInputChangeHandler}
              initialValue={edittedProduct ? edittedProduct.description : ""}
              initiallyValid={!!edittedProduct}
              required
              minLength={10}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProduct;
