import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Platform, Button, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import ProductOverview from "../screens/ProductOverview";
import ProductDetails from "../screens/ProductDetails";
import CartScreen from "../screens/CartScreen";
import OrderScreen from "../screens/OrderScreen";
import UserProducts from "../screens/UserProducts";
import EditProduct from "../screens/EditProduct";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";

import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

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
      <Stack.Screen
        name="EditProduct"
        component={EditProduct}
        initialParams={{ productId: false }}
      />
    </Stack.Navigator>
  );
};

const ShopNavigator = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (state.isLoading) {
    return <StartupScreen />;
  }
  if (!state.token) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={navOptions}>
          <Stack.Screen name="Login" component={AuthScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContentOptions={{
              activeTintColor: Colors.primary,
            }}
            drawerContent={(props) => {
              return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                  <SafeAreaView
                    forceInset={{ top: "always", horizontal: "never" }}
                  >
                    <DrawerItemList {...props} />
                    <Button
                      title="Logout"
                      color={Colors.primary}
                      onPress={() => {
                        dispatch(authActions.logout());
                      }}
                    />
                  </SafeAreaView>
                </View>
              );
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
                    name={
                      Platform.OS === "android" ? "md-create" : "ios-create"
                    }
                    size={23}
                    color={color}
                  />
                ),
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
};

export default ShopNavigator;
