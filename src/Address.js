import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/Ionicons";
import { AsyncStorage } from "react-native";

var { height, width } = Dimensions.get("window");

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: "",
      don: [],
      chitiets: [],
      lastList: 1,
    };
  }
  componentDidMount() {
    // const url = "https://tutofox.com/foodapp/api.json";
    AsyncStorage.getItem("User")
      .then((user) => {
        if (user !== null) {
          const userdata = JSON.parse(user);
          // this.setState({
          //   idUser: userdata._id,
          // });
          // console.log("daslfknal" + this.state.idUser);
          const url =
            "https://2ade04a20fa7.ngrok.io/api/access/order:fetchByUserId/" +
            userdata._id;
          return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({
                isLoading: false,
                don: responseJson.data,
              });
              console.log(responseJson.data);
            })
            .catch((error) => {
              // console.log(error);
            });
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  _datafood(item) {
    const url =
      "https://2ade04a20fa7.ngrok.io/api/access/order:fetchDetail/" + item._id;
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          chitiets: responseJson.data,
        });
        this.setState({
          lastList: 0,
        });
        console.log("dât" + responseJson.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  _renderItemFoods(item) {
    return (
      <TouchableOpacity
        // onPress={() => this._detail(item)}
        style={styles.divFood}
      >
        <Image
          style={styles.imageFood}
          resizeMode="contain"
          source={{ uri: item.food.pathImage }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 15, textAlign: "center" }}>
          {item.name}
        </Text>
        <Text>{item.description}</Text>
        <Text>Quantity: {item.quantity}</Text>
        {/* <Text>{item.description}</Text> */}
        <Text style={{ fontSize: 18, color: "green" }}>Price: ${item.food.price}</Text>

        
      </TouchableOpacity>
    );
  }
  // abc() {}
  _renderItem(item) {
    return (
      <TouchableOpacity
        onPress={() => this._datafood(item)}
        // onPress={() => console.log(this.state.chitiets)}
        style={styles.divFood}
      >
        <View
          style={{
            height: width / 2 - 20 - 200,
            backgroundColor: "transparent",
            width: width - 20,
          }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 15, textAlign: "center" }}>
          ID: {item._id}
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 15, textAlign: "center" }}>
          Ngày: {item.timeOrder}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.lastList == 1 ? (
          <View style={styles.container}>
            <View style={{ height: 20 }} />
            <Text style={styles.titleCategory}>Lịch sử mua hàng</Text>
            <FlatList
              data={this.state.don}
              numColumns={1}
              renderItem={({ item }) => this._renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={{ height: 20 }} />
            <TouchableOpacity
              style={styles.cart}
              onPress={() =>
                this.setState({
                  lastList: 1,
                })
              }
              style={{
                width: width / 4 - 10,
                backgroundColor: "black",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 5,
                padding: 4,
                marginTop: 20,
              }}
            >
              <Icon name="md-arrow-back" size={20} color={"#fff"} />
              <Text
                style={{ fontSize: 18, color: "#ffff66", fontWeight: "bold" }}
              >
                Back
              </Text>
            </TouchableOpacity>
            <Text style={styles.titleCategory}>Mặt hàng đã mua</Text>
            <FlatList
              data={this.state.chitiets}
              numColumns={1}
              renderItem={({ item }) => this._renderItemFoods(item)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
    );
  }
}

// =============== STYLE =============== //
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
    height: 100,
    backgroundColor: "transparent",
  },
  divFood: {
    // backgroundColor: "red",
    justifyContent: "flex-start",
    width: width - 20,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 0,
    alignItems: "center",
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: "white",
  },
  imageDetail: {
    height: width - 40,
    width: width,
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
});
