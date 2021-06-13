import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import ProductOverview from "../screens/ProductOverview";
import ProductDetails from "../screens/ProductDetails";
import CartScreen from "../screens/CartScreen";
import OrderScreen from "../screens/OrderScreen";
import UserProducts from "../screens/UserProducts";

import Colors from "../constants/Colors";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const navOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: { fontFamily: "open-sans-bold" },
  headerBackTitleStyle: { fontFamily: "open-sans" },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={navOptions}>
      <Stack.Screen name="ProductsOverview" component={ProductOverview} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

const OrdersNavigator = () => {
  return (
    <Stack.Navigator screenOptions={navOptions}>
      <Stack.Screen name="Orders" component={OrderScreen} />
    </Stack.Navigator>
  );
};
const AdminNavigator = () => {
  return (
    <Stack.Navigator screenOptions={navOptions}>
      <Stack.Screen name="UserProducts" component={UserProducts} />
    </Stack.Navigator>
  );
};

const ShopNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: Colors.primary,
        }}
      >
        <Drawer.Screen
          name="Products"
          component={ProductsNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Icon
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={23}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Orders"
          component={OrdersNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Icon
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Icon
                name={Platform.OS === "android" ? "md-create" : "ios-create"}
                size={23}
                color={color}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default ShopNavigator;
