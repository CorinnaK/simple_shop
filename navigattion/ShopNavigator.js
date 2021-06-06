import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Platform } from "react-native";

import ProductOverview from "../screens/ProductOverview";
import ProductDetails from "../screens/ProductDetails";
import Colors from "../constants/Colors";

const ProductsNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
          },
          headerTitleStyle: { fontFamily: "open-sans-bold" },
          headerBackTitleStyle: { fontFamily: "open-sans" },
          headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
        }}
      >
        <Stack.Screen name="ProductsOverview" component={ProductOverview} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ProductsNavigator;
