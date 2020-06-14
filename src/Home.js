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
import Address from "./Address";
import Cart from "./Cart";
import Food from "./Food";
import Profile from "./Profile";

var { width } = Dimensions.get("window");
console.disableYellowBox = true;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      module: 1,
      // username: "",
    };
  }

  // componentDidMount() {
  //   const data = this.props.navigation.getParam("data", "some default value");
  //   this.setState({
  //     username: data,
  //   });
  // }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.module == 1 ? (
          <Food />
        ) : this.state.module == 2 ? (
          <Cart />
        ) : this.state.module == 3 ? (
          <Address />
        ) : (
          <Profile />
        )}
        <View style={styles.bottomTab}>
          <TouchableOpacity
            style={styles.itemTab}
            onPress={() => this.setState({ module: 1 })}
          >
            <Icon
              name="md-restaurant"
              size={20}
              color={this.state.module == 1 ? "#1654b8" : "gray"}
            />
            <Text>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemTab}
            onPress={() => this.setState({ module: 2 })}
          >
            <Icon
              name="md-basket"
              size={20}
              color={this.state.module == 2 ? "#1654b8" : "gray"}
            />
            <Text>Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemTab}
            onPress={() => this.setState({ module: 3 })}
          >
            <Icon
              name="md-locate"
              size={20}
              color={this.state.module == 3 ? "#1654b8" : "gray"}
            />
            <Text>Address</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemTab}
            onPress={() => this.setState({ module: 4 })}
          >
            <Icon
              name="md-contact"
              size={20}
              color={this.state.module == 4 ? "#1654b8" : "gray"}
            />
            <Text>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomTab: {
    height: 55,
    width: width,
    backgroundColor: "#c6cfc8",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
  },
  itemTab: {
    width: width / 4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
