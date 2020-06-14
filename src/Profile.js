import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { AsyncStorage } from "react-native";

var { width } = Dimensions.get("window");
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      name: "",
      phone: "",
      address: "",
    };
  }

  // TODO : Mount data
  componentDidMount() {
    AsyncStorage.getItem("User")
      .then((user) => {
        if (user !== null) {
          // We have data!!
          const userdata = JSON.parse(user);
          this.setState({ userData: userdata });
          this.state.name = this.state.userData.name;
          this.state.phone = userdata.phone;
          this.state.address = userdata.address;
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          // width: width - 20,
          // margin: 10,
          backgroundColor: "transparent",
          flexDirection: "row",
          borderBottomWidth: 2,
          borderColor: "#cccccc",
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "trangraysparent",
            padding: 10,
            justifyContent: "center",
          }}
        >
          <View style={styles.inputcomponent}>
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu"
              // secureTextEntry={true}
              // onChangeText={(text) => this.setState({ password: text })}
              value={this.state.userData.email}
            ></TextInput>
          </View>
          <View style={styles.inputcomponent}>
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu"
              // secureTextEntry={true}
              value={this.state.userData.name}
              // onChangeText={(text) => this.setState({ name: text })}
            ></TextInput>
          </View>
          <View style={styles.inputcomponent}>
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu"
              // secureTextEntry={true}
              value={this.state.phone}
              onChangeText={(text) => this.setState({ phone: text })}
            ></TextInput>
          </View>
          <View style={styles.inputcomponent}>
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu"
              // secureTextEntry={true}
              value={this.state.address}
              onChangeText={(text) => this.setState({ address: text })}
            ></TextInput>
          </View>
          <TouchableOpacity
            onpress={this._updateInfo()}
            style={{
              backgroundColor: "#33c37d",
              width: width - 40,
              alignItems: "center",
              padding: 10,
              borderRadius: 5,
              margin: 20,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
              }}
            >
              UPDATE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  _updateInfo = () => {
    fetch(
      "http://9e603c3c61f4.ngrok.io/api/access/user:update/" +
        this.state.userData._id,
      {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },

        body: JSON.stringify({
          name: this.state.name,
          phone: this.state.phone,
          address: this.state.address,
        }),
      }
    )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .done();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    width: width,
    alignItems: "center",
  },
  image: {
    height: 100,
    width: width,
    margin: 5,
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  titleCategory: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 2,
    marginBottom: 5,
  },
  divCategory: {
    backgroundColor: "red",
    margin: 5,
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  imageFood: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: "transparent",
  },
  divFood: {
    width: width / 2 - 20,
    // height:(width/2),
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 0,
    marginLeft: 12,
    alignItems: "center",
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: "white",
  },

  input: {
    width: 280,
    height: 45,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
  },
});
