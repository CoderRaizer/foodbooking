import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
  StyleSheet,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome5";
import ValidationComponent from "react-native-form-validator";
import { AsyncStorage } from "react-native";

var { height, width } = Dimensions.get("window");
export default class login extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      // user: {},
    };
  }
// 'Content-Type': 'text/plain;charset=UTF-8',
  login = () => {
    this.validate({
      username: { minlength: 3, maxlength: 7, required: true },
    });
    fetch("http://9e603c3c61f4.ngrok.io/api/auth/login-mobile", {
      method: "POST",
      headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
      // header: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      // },
      body: JSON.stringify({
        // username: this.state.username,
        // password: this.state.password,
        username: "vonhuphu@gmail.com",
        password: "123456"
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        
        const user = data.data;
        AsyncStorage.setItem("User",JSON.stringify(user));
        this.props.navigation.navigate("home");
        console.log(user);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .done();
      
  };
  _kiemtra = () => {
    if (this.state.userName == "a" && this.state.password == "a") {
      this.props.navigation.navigate("demo", {
        data: "this.state.userName",
      });
      // alert("ok");
      // this.props.navigation.navigate("home");
    } else {
      // if (this.state.userName == this.state.dataCategories.id) {
      //   alert('okx2');
      // } else {
      //   alert('not ok' + this.state.dataCategories[1].id);
      // }
    }
  };
  render() {
    const Divider = (props) => {
      return (
        <View {...props}>
          <View style={styles.line}></View>
          <Text style={styles.textOr}>OR</Text>
          <View style={styles.line}></View>
        </View>
      );
    };

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.up}>
            {/* <Image style={styles.image} resizeMode="contain" source={require("../image/grab.png")} /> */}
          </View>
          <View style={styles.down}>
            <View style={styles.inputcomponent}>
              <TextInput
                style={styles.input}
                TextContentType="emaiAddress"
                keyboardType="email-address"
                placeholder="Nhập email"
                onChangeText={(text) => this.setState({ username: text })}
              ></TextInput>
            </View>
            <View style={styles.inputcomponent}>
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu"
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ password: text })}
              ></TextInput>
            </View>
            <TouchableOpacity style={styles.btnLogin} onPress={this.login}>
              <Text style={styles.login}>Login</Text>
            </TouchableOpacity>
            <Divider style={styles.devider}></Divider>
            <FontAwesome.Button
              name="facebook"
              backgroundColor="#3b5998"
              style={styles.facebook}
            >
              <Text style={styles.btnFB}>Login with Facebook</Text>
            </FontAwesome.Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#e9ebee",
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
  up: {
    flex: 4,
  },
  down: {
    flex: 6,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    width: 350,
    height: 45,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
  },
  titleLogin: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 2,
    marginBottom: 5,
  },
  login: {
    fontSize: 18,
    color: "#fff",
  },
  btnLogin: {
    width: 280,
    height: 45,
    backgroundColor: "black",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  facebook: {
    width: 280,
    height: 45,
    justifyContent: "center",
    borderRadius: 10,
  },
  btnFB: {
    color: "#fff",
  },
  line: {
    flex: 2,
    height: 1,
    backgroundColor: "#000",
  },
  textOr: {
    textAlign: "center",
    flex: 1,
  },
  devider: {
    width: 280,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
