import React, { Component } from "react";
import { Text, View, Dimensions } from "react-native";

var { height, width } = Dimensions.get("window");

export default class Header extends Component {
  render() {
    return <View style={{ height: 18, width: width, backgroundColor: "black" }}></View>;
  }
}
