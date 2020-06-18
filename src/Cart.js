import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { AsyncStorage } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

var { width } = Dimensions.get("window");

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCart: [],
      dataCartSend: [],
      isEmptyCart: true,

      itemFoods: [],

      screen: 1,
      _idUser: "",
      user: {},
      name: "",
      phone: "",
      address: "",
      errorName: "",
      errorPhone: "",
      errorAddress: "",
      pay: 0,
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("cart")
      .then((cart) => {
        if (cart !== null) {
          // We have data!!

          const cartfood = JSON.parse(cart);
          // this.state.dataCartSend => call
          // code đây xếp
          // const itemcart = {
          //   idFood: cartfood.food._id,
          //   quantity: cartfood.quantity,
          // };
          console.log(cartfood);
          // var singleItem = {
          //   idFood: "",
          //   quantity: 0,
          // };
          // cartfood.map((element) => {
          //   singleItem.idFood = element.data.food._id;
          //   singleItem.quantity = element.data.quantity;
          //   this.setState({
          //     itemFoods: this.state.itemFoods.push(singleItem),
          //   });
          // });

          // console.log(this.state.itemFoods);
          this.setState({
            // todo : render item for cart
            dataCart: cartfood,

            // dataCartSend: this.state.dataCartSend.push(itemcart),
          });

          // todo : setup payload body

          this.state.isEmptyCart = false;
        } else {
          this.state.isEmptyCart = true;
        }
      })
      .catch((err) => {
        alert(err);
      });
    AsyncStorage.getItem("User")
      .then((user) => {
        if (user !== null) {
          // We have data!!
          const userdata = JSON.parse(user);
          // TODO : Danger zone
          fetch("https://dae38e3f286c.ngrok.io/api/access/user/" + userdata._id)
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({
                isLoading: false,
                user: responseJson.data,

                name: responseJson.data.name,
                phone: responseJson.data.phone,
                address: responseJson.data.address,
              });
            })
            .catch((error) => {
              console.log(error);
            });
          console.log(this.state.userData);
        }
      })
      .catch((err) => {
        alert(err);
      });
    // TODO : Fetch Data User From DataBase
  }

  onChangeQual(i, type) {
    const dataCar = this.state.dataCart;
    let cantd = dataCar[i].quantity;

    if (type) {
      // true
      dataCar[i].quantity = cantd + 1;
    } else if (type == false && cantd >= 2) {
      dataCar[i].quantity = cantd - 1;
    } else if (type == false && cantd == 1) {
      dataCar.splice(i, 1);
    }

    this.setState({ dataCart: dataCar });

    // Check is empty cart
    if (dataCar.length > 0) {
      this.state.isEmptyCart = false;
    } else {
      this.state.isEmptyCart = true;
    }

    AsyncStorage.setItem("cart", JSON.stringify(dataCar));
  }

  _checkOut() {
    // alert('ok');
    var tong = 0;
    this.state.dataCart.forEach(function (i) {
      tong += i.price * i.quantity;
    });

    this.setState({
      screen: 0,
      pay: tong,
    });
  }
  _Cart() {
    this.setState({
      screen: 1,
    });
  }
  _thanhtoan() {
    this.setState({
      errorName: "",
      errorPhone: "",
      errorAddress: "",
    });
    if (
      this.state.name.trim().length < 6 ||
      this.state.name.trim().length > 50
    ) {
      this.setState({ errorName: "*Tên phải từ 6 - 50 ký tự*" });
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
    } else {
      fetch("http://dae38e3f286c.ngrok.io/api/access/order:create", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          userId: this.state._idUser,
          Itemfood: this.state.dataCartSend,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            screen: 2,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .done();
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {this.state.screen == 1 ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View style={{ height: 20 }} />
            <Text
              style={{ fontSize: 32, fontWeight: "bold", color: "#33c37d" }}
            >
              Cart food
            </Text>
            <View style={{ height: 10 }} />

            <View style={{ flex: 1 }}>
              <ScrollView>
                {this.state.dataCart.map((item, i) => {
                  return (
                    <View
                      style={{
                        width: width - 20,
                        margin: 10,
                        backgroundColor: "transparent",
                        flexDirection: "row",
                        borderBottomWidth: 2,
                        borderColor: "#cccccc",
                        paddingBottom: 10,
                      }}
                    >
                      <Image
                        resizeMode={"contain"}
                        style={{ width: width / 3, height: width / 3 }}
                        source={{ uri: item.food.pathImage }}
                      />
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: "trangraysparent",
                          padding: 10,
                          justifyContent: "space-between",
                        }}
                      >
                        <View>
                          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                            {item.food.name}
                          </Text>
                          <Text>Lorem Ipsum de food</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                              color: "#33c37d",
                              fontSize: 20,
                            }}
                          >
                            ${item.price * item.quantity}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => this.onChangeQual(i, false)}
                            >
                              <Icon
                                name="ios-remove-circle"
                                size={35}
                                color={"#33c37d"}
                              />
                            </TouchableOpacity>
                            <Text
                              style={{
                                paddingHorizontal: 8,
                                fontWeight: "bold",
                                fontSize: 18,
                              }}
                            >
                              {item.quantity}
                            </Text>
                            <TouchableOpacity
                              onPress={() => this.onChangeQual(i, true)}
                            >
                              <Icon
                                name="ios-add-circle"
                                size={35}
                                color={"#33c37d"}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}

                <View style={{ height: 10 }} />
                {/* {buttonCheckout} */}
                <TouchableOpacity
                  onPress={() => this._checkOut()}
                  style={{
                    backgroundColor: "#33c37d",
                    width: width - 40,
                    alignItems: "center",
                    padding: 10,
                    borderRadius: 10,
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
                    CHECKOUT
                  </Text>
                </TouchableOpacity>
                <View style={{ height: 10 }} />
              </ScrollView>
            </View>
          </View>
        ) : this.state.screen == 0 ? (
          <View style={styles.container}>
            <TouchableOpacity style={styles.cart} onPress={() => this._Cart()}>
              <Icon name="md-cart" size={30} color={"red"} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "green",
                }}
              >
                Back
              </Text>
            </TouchableOpacity>
            <View style={styles.inputcomponent}>
              <Text style={styles.label}>Email: </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={this.state.user.email}
                editable={false}
              ></TextInput>
            </View>
            <View style={styles.inputcomponent}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Name: </Text>
                <Text style={styles.textError}>{this.state.errorName}</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
                onSubmitEditing={() => {
                  this.secondTextInput.focus();
                }}
                // blurOnSubmit={false}
              ></TextInput>
            </View>
            <View style={styles.inputcomponent}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Phone: </Text>
                <Text style={styles.textError}>{this.state.errorPhone}</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone"
                onChangeText={(text) => this.setState({ phone: text })}
                value={this.state.phone}
                ref={(input) => {
                  this.secondTextInput = input;
                }}
                onSubmitEditing={() => {
                  this.thirdTextInput.focus();
                }}
                // blurOnSubmit={false}
              ></TextInput>
            </View>
            <View style={styles.inputcomponent}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Address: </Text>
                <Text style={styles.textError}>{this.state.errorAddress}</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter your address"
                onChangeText={(text) => this.setState({ address: text })}
                value={this.state.address}
                ref={(input) => {
                  this.thirdTextInput = input;
                }}
              ></TextInput>
            </View>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 30,
                textAlign: "center",
                color: "red",
              }}
            >
              Tổng tiền: {this.state.pay} $
            </Text>
            <TouchableOpacity
              onPress={() => this._thanhtoan()}
              style={{
                backgroundColor: "#000",
                width: width - 40,
                marginLeft: 20,
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
                borderRadius: 5,
                padding: 5,
              }}
            >
              <Text style={{ marginLeft: 10, fontSize: 30, color: "#fff" }}>
                ĐẶT HÀNG
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 20 }}>
              Đặt hàng thành công, vui lòng chờ...
            </Text>
            <TouchableOpacity
              onPress={() => this.setState({ screen: 1 })}
              style={{
                backgroundColor: "#000",
                width: width - 40,
                marginLeft: 20,
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
                borderRadius: 5,
                padding: 5,
              }}
            >
              <Text style={{ marginLeft: 10, fontSize: 30, color: "#fff" }}>
                Xong
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    width: width,
    flex: 1,
    // justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#00b3b3",
  },
  cart: {
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: 10,
    width: 100,
    backgroundColor: "#ffff99",
    padding: 7,
    borderRadius: 5,
  },
  inputcomponent: {
    // flexDirection: "row",
    // justifyContent: "center",
  },
  label: {
    marginLeft: 10,
    // flex: 3,
    fontSize: 20,
    // paddingTop: 10,
    justifyContent: "center",
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    // flex: 9,
    height: 45,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
  },
  textError: {
    marginLeft: 10,
    color: "red",
    fontStyle: "italic",
  },
});
