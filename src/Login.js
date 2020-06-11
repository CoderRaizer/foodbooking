import React, {Component} from 'react';
import {Text, View, TextInput,TouchableOpacity,TouchableWithoutFeedback,Dimensions, Keyboard,StyleSheet,} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import ValidationComponent from 'react-native-form-validator';
var {height , width} = Dimensions.get("window");
export default class login extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  login = () => {
    this.validate({
      username : {minlength:3, maxlength:7, required : true}
    })
    fetch('https://hardeepcoder.site/api/users', {
      method: 'POST',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.username,
        id: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.navigation.navigate('home');
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .done();
  };
  kiemtra() {
    if (this.state.userName == 'admin' && this.state.password == 'admin') {
      this.props.navigation.navigate('home');
    } else {
      if (this.state.userName == this.state.dataCategories.id) {
        alert('okx2');
      } else {
        alert('not ok' + this.state.dataCategories[1].id);
      }
    }
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
        <View style={styles.banner}>
        {/* <Image style={styles.image} resizeMode="contain" source={require("../image/grab.png")} /> */}
        </View>
          <View style={styles.down}>
            <View style={styles.inputcomponent}>
              <TextInput
                style={styles.input}
                TextContentType="emaiAddress"
                keyboardType="email-address"
                placeholder="Nhập email"
                onChangeText={(text) =>
                  this.setState({userName: text})
                }></TextInput>
            </View>
            <View style={styles.inputcomponent}>
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu"
                secureTextEntry={true}
                onChangeText={(text) =>
                  this.setState({password: text})
                }></TextInput>
            </View>
            <TouchableOpacity style={styles.btnLogin}>
              <Text style={styles.login} onPress={this.login}>
                Login
              </Text>
            </TouchableOpacity>
            <Divider style={styles.devider}></Divider>
            <FontAwesome.Button
              name="facebook"
              backgroundColor="#3b5998"
              style={styles.facebook}>
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
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#e9ebee',
  },
  banner: {
    width : width,
    alignItems : 'center'
  },
  image : {
    height : 100,
    width : width,
    margin : 5
  },
  up: {
    flex: 1,
  },
  down: {
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    width: 350,
    height: 45,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
  titleLogin: {
    fontSize : 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:2,
    marginBottom: 5
  },
  login: {
    fontSize: 18,
    color: '#fff',
  },
  btnLogin: {
    width: 280,
    height: 45,
    backgroundColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebook: {
    width: 280,
    height: 45,
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnFB: {
    color: '#fff',
  },
  line: {
    flex: 2,
    height: 1,
    backgroundColor: '#000',
  },
  textOr: {
    textAlign: 'center',
    flex: 1,
  },
  devider: {
    width: 280,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }

});
