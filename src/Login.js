import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Keyboard,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome5";
import ValidationComponent from "react-native-form-validator";
import { AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

var { height, width } = Dimensions.get("window");
export default class login extends ValidationComponent {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      backgroundColorError: "",
      secureTextEntry: true,
      nameIcon: "md-eye",
      foodbooking: new Animated.Value(0),
    };
  }
  async componentDidMount() {
    Animated.sequence([
      Animated.timing(this.state.foodbooking, {
        toValue: 15,
        duration: 500,
      }),
    ]).start(() => {
      // this.props.navigation.navigate('login');
    });
  }
  // 'Content-Type': 'text/plain;charset=UTF-8',
  login() {
    AsyncStorage.clear();
    this.setState({
      errorEmail: "",
      errorPassword: "",
      // backgroundColorError: "",
    });
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email.trim().length < 10) {
      this.setState({
        error: "Email phải lớn hơn 10 ký tự",
        backgroundColorError: "black",
      });
    } else if (reg.test(this.state.email) !== true) {
      this.setState({
        error: "*Định dạng email không hợp lệ*",
        backgroundColorError: "black",
      });
    } else if (
      this.state.password.trim().length < 6 ||
      this.state.password.trim().length > 20
    ) {
      this.setState({
        error: "Mật khẩu từ 6 - 20 ký tự",
        backgroundColorError: "black",
      });
    } else {
      fetch("https://2ade04a20fa7.ngrok.io/api/auth/login-mobile", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
        // header: {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json',
        // },
        body: JSON.stringify({
          username: this.state.email,
          password: this.state.password,
          // email: "vonhuphu@gmail.com",
          // username: "vonhuphu@gmail.com",
          // password: "123456",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const user = data.data;
          if (data.data.name.trim().length != 0) {
            AsyncStorage.setItem("User", JSON.stringify(user));
            console.log(user);
            this.props.navigation.navigate("home");
          } else {
            alert("sáa");
          }
        })
        .catch((error) => {
          this.setState({
            error: "Tài khoản hoặc mật khẩu không đúng",
            // backgroundColorError: "black",
          });
          alert("sáa");
        })
        .done();
    }
  }
  _kiemtra = () => {
    if (this.state.email == "a" && this.state.password == "a") {
      this.props.navigation.navigate("home");
    } else {
      alert("okx2");
    }
  };
  _register() {
    this.props.navigation.navigate("register");
  }
  _hidePass() {
    var name = "";
    if (this.state.nameIcon == "md-eye") {
      name = "md-eye-off";
    } else {
      name = "md-eye";
    }
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
      nameIcon: name,
    });
  }
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
          {/* <ImageBackground
            // resizeMode="contain"
            source={require("./image/food2.png")}
            style={styles.imageNen}
          > */}
            <View style={styles.up}>
              <Image
                style={styles.image}
                // resizeMode="contain"
                source={require("./image/grab.png")}
              />
              <Animated.Text
                style={{ ...styles.title, marginLeft: this.state.foodbooking }}
              >
                Welcome to Foodbooking
              </Animated.Text>
            </View>
            <View style={styles.down}>
              <View>
                <Text
                  style={{
                    color: "red",
                    fontStyle: "italic",
                    fontSize: 18,
                    // backgroundColor: this.state.backgroundColorError,
                    marginBottom: 10,
                    padding: 5,
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderRadius: 20,
                  }}
                >
                  {this.state.error}
                </Text>
              </View>
              <View style={styles.inputcomponent}>
                {/* <Text style={styles.label}>Email: </Text> */}
                <TextInput
                  style={styles.input}
                  TextContentType="emaiAddress"
                  keyboardType="email-address"
                  placeholder="Nhập email"
                  onChangeText={(text) => this.setState({ email: text })}
                ></TextInput>
              </View>
              <View style={styles.inputcomponent}>
                {/* <Text style={styles.label}>Password: </Text> */}
                <View
                  style={{
                    ...styles.input,
                    flexDirection: "row",
                  }}
                >
                  <TextInput
                    style={{ flex: 9 }}
                    placeholder="Nhập mật khẩu"
                    secureTextEntry={this.state.secureTextEntry}
                    onChangeText={(text) => this.setState({ password: text })}
                  ></TextInput>
                  <TouchableOpacity
                    onPress={() => this._hidePass()}
                    style={{ flex: 1, top: 10 }}
                  >
                    <Icon
                      name={this.state.nameIcon}
                      size={20}
                      color={"black"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.btnLogin}
                onPress={() => this.login()}
              >
                <Text style={styles.login}>Login</Text>
              </TouchableOpacity>
              {/* <Divider style={styles.devider}></Divider>
            <FontAwesome.Button
              name="facebook"
              backgroundColor="#3b5998"
              style={styles.facebook}
            >
              <Text style={styles.btnFB}>Login with Facebook</Text>
            </FontAwesome.Button> */}
              <TouchableOpacity
                style={{
                  ...styles.btnLogin,
                  backgroundColor: "#333",
                }}
                onPress={() => this._register()}
              >
                <Text style={styles.login}>Register</Text>
              </TouchableOpacity>
            </View>
          {/* </ImageBackground> */}
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

    backgroundColor: "#fff",
    marginTop: 100,
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  imageNen: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  title: {
    color: "#333333",
    marginTop: 10,
    fontSize: 25,
  },
  up: {
    flex: 4,
    alignItems: "center",
  },
  down: {
    flex: 6,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputcomponent: {
    flexDirection: "row",
    marginLeft: 10,
  },
  label: {
    padding: 10,
    flex: 3,
    fontSize: 15,
    textAlign: "right",
  },
  input: {
    paddingLeft: 10,
    width: width - 40,
    height: 45,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    marginRight: 15,
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
    marginTop: 20,
    width: 280,
    height: 45,
    backgroundColor: "#0450c2",
    borderRadius: 10,
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
