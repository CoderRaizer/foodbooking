import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// TODO : Import Component
import Login from "./src/Login";
import Home from "./src/Home";
import Cart from "./src/Cart";
import Food from "./src/Food";
import Address from "./src/Address";
import Profile from "./src/Profile";


import Sample from "./src/demo";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

var { width } = Dimensions.get("window");
console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            style={{ backgroundColor: "black" }}
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="demo"
            component={Sample}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
