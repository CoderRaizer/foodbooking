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

import { AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import ValidationComponent from "react-native-form-validator";

var { height, width } = Dimensions.get("window");
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
      nameIcon: "md-eye",
      name: "",
      email: "",
      password: "",
      confirm: "",
      phone: "",
      address: "",
      errorName: "",
      errorEmail: "",
      errorPassword: "",
      errorPhone: "",
      errorAddress: "",
      errorConfirm: "",
    };
  }
  _register() {
    // this.validate({
    //   name: { minlength: 5, maxlength: 20, required: true },
    //   email: { email: true },
    //   password: { minlength: 5, maxlength: 20, required: true },
    //   confirm: { minlength: 5, maxlength: 20, required: true },
    //   phone: { minlength: 5, maxlength: 12, required: true },
    //   address: { minlength: 5, maxlength: 50, required: true },
    // });
    // alert('mat khau sai');
    this.setState({
      errorName: "",
      errorEmail: "",
      errorPassword: "",
      errorPhone: "",
      errorAddress: "",
      errorConfirm: "",
    });

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      this.state.name.trim().length < 6 ||
      this.state.name.trim().length > 50
    ) {
      this.setState({ errorName: "*Tên phải từ 6 - 50 ký tự*" });
    } else if (
      this.state.email.trim().length < 6 ||
      this.state.email.trim().length > 20
    ) {
      this.setState({ errorEmail: "*Email phải từ 6 - 50 ký tự*" });
    } else if (reg.test(this.state.email) !== true) {
      this.setState({ errorEmail: "*Định dạng email không hợp lệ*" });
    } else if (
      this.state.password.trim().length < 6 ||
      this.state.password.trim().length > 20
    ) {
      this.setState({ errorPassword: "*Mật khẩu từ 6 - 20 ký tự*" });
    } else if (
      this.state.confirm.trim().length < 6 ||
      this.state.confirm.trim().length > 20
    ) {
      this.setState({ errorConfirm: "*Mật khẩu phải từ 6 - 20 ký tự*" });
    } else if (this.state.password != this.state.confirm) {
      this.setState({ errorConfirm: "*Mật khẩu không khớp*" });
    } else if (
      this.state.phone.trim().length < 6 ||
      this.state.phone.trim().length > 20
    ) {
      this.setState({ errorPhone: "*Số điện thoại phải từ 6 - 20 ký tự*" });
    } else if (isNaN(this.state.phone)) {
      this.setState({ errorPhone: "*Số điện thoại không hợp lệ*" });
    } else if (
      this.state.address.trim().length < 6 ||
      this.state.address.trim().length > 50
    ) {
      this.setState({ errorAddress: "*địa chỉ phải từ 6 - 50 ký tự*" });
    } else if (this.state.password != this.state.confirm) {
      this.setState({ errorConfirm: "*Mật khẩu không khớp*" });
    } else {
      fetch("https://b5f0433e28a1.ngrok.io/api/auth/register-mobile", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          phone: this.state.phone,
          address: this.state.address,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("dang ky thanh cong");
          // this.props.navigation.navigate("login");
        })
        .catch((error) => {
          alert('Lỗi server:' + error);
          // console.error("Error:", error);
        })
        .done();
    }
  }
  _kiemtra = () => {
    if (this.state.username == "a" && this.state.password == "a") {
      this.props.navigation.navigate("home");
    } else {
      alert("tk-mk sai");
    }
  };
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
  // _register() {
  //   this.props.navigation.navigate();
  // }
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
    // const rules = {any: /^(.*)$/};

    // <FormTest rules={rules} />

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.up}>
            <Text
              style={{
                fontSize: 25,
                color: "red",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Please enter information
            </Text>
          </View>
          <View style={styles.down}>
            <View style={styles.inputcomponent}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Name: </Text>
                <Text style={styles.textError}>{this.state.errorName}</Text>
              </View>

              <TextInput
                ref="name"
                style={styles.input}
                placeholder="Enter your name"
                onChangeText={(text) => this.setState({ name: text })}
              ></TextInput>
            </View>

            <View style={styles.inputcomponent}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Email: </Text>
                <Text style={styles.textError}>{this.state.errorEmail}</Text>
              </View>
              <TextInput
                ref="email"
                style={styles.input}
                TextContentType="emaiAddress"
                keyboardType="email-address"
                placeholder="Enter your email"
                onChangeText={(text) => this.setState({ email: text })}
              ></TextInput>
            </View>
            <View style={styles.inputcomponent}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ ...styles.label, left: 10 }}>Password: </Text>
                <Text style={{ ...styles.textError, marginLeft: 10 }}>
                  {this.state.errorPassword}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", positon: "realative", left: 10 }}
              >
                <TextInput
                  ref="password"
                  style={styles.input}
                  placeholder="Enter your password"
                  secureTextEntry={this.state.secureTextEntry}
                  onChangeText={(text) => this.setState({ password: text })}
                ></TextInput>
                <TouchableOpacity
                  onPress={() => this._hidePass()}
                  style={{ positon: "absolute", right: 30, top: 10 }}
                >
                  <Icon name={this.state.nameIcon} size={20} color={"black"} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputcomponent}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ ...styles.label, left: 10 }}>
                  Confirm password:{" "}
                </Text>
                <Text style={styles.textError}>{this.state.errorConfirm}</Text>
              </View>
              <View
                style={{ flexDirection: "row", positon: "realative", left: 10 }}
              >
                <TextInput
                  ref="confirm"
                  style={styles.input}
                  placeholder="Enter your password"
                  secureTextEntry={this.state.secureTextEntry}
                  onChangeText={(text) => this.setState({ confirm: text })}
                ></TextInput>
                <TouchableOpacity
                  onPress={() => this._hidePass()}
                  style={{ positon: "absolute", right: 30, top: 10 }}
                >
                  <Icon name={this.state.nameIcon} size={20} color={"black"} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputcomponent}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Phone: </Text>
                <Text style={styles.textError}>{this.state.errorPhone}</Text>
              </View>
              <TextInput
                ref="phone"
                style={styles.input}
                placeholder="Enter your phone"
                onChangeText={(text) => this.setState({ phone: text })}
              ></TextInput>
            </View>

            <View style={styles.inputcomponent}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Address: </Text>
                <Text style={styles.textError}>{this.state.errorAddress}</Text>
              </View>
              <TextInput
                ref="address"
                style={styles.input}
                placeholder="Enter your address"
                onChangeText={(text) => this.setState({ address: text })}
              ></TextInput>
            </View>
            <TouchableOpacity
              style={{
                ...styles.btnLogin,
                backgroundColor: "#661a00",
              }}
              onPress={() => this._register()}
            >
              <Text style={styles.login}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.btnLogin, marginTop: 10 }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={styles.login}>Login</Text>
            </TouchableOpacity>
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
    backgroundColor: "#ccccff",
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
    paddingTop: 20,
    flex: 1,
  },
  down: {
    flex: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  label: {
    // marginLeft: 10,
    fontSize: 16,
    justifyContent: "center",
  },
  input: {
    paddingLeft: 10,
    width: width - 40,
    height: 40,
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
    fontWeight: "bold",
    width: 280,
    height: 45,
    backgroundColor: "red",
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
  textError: {
    marginLeft: 10,
    color: "red",
    fontStyle: "italic",
  },
});
