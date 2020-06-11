import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity,Dimensions,StyleSheet } from 'react-native';

var {width} = Dimensions.get("window")
export default class Profile extends Component {

  constructor(props) {
     super(props);
     this.state = {
       data:"",
     };
  }

  render() {
    return (
      <View style={{width:width-20,margin:10,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:2, borderColor:"#cccccc", paddingBottom:10}}>
        <View style={{flex:1, backgroundColor:'trangraysparent', padding:10, justifyContent:"space-between"}}>
          <View>
            <Text style={{fontWeight:'bold',color:"#33c37d",fontSize:20}}>Vo Duy Khanh</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text>Address : Man Thien</Text>
            <Text>SDT : 0931061891</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
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
  imageBanner: {
    height:width/2,
    width:width-40,
    borderRadius:10,
    marginHorizontal:20
  },
  titleCategory: {
    fontSize : 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:2,
    marginBottom: 5
  },
  divCategory:{
    backgroundColor:'red',
    margin:5, alignItems:'center',
    borderRadius:10,
    padding:10
  },
  imageFood:{
    width : ((width/2) - 20)-10,
    height : ((width/2) - 20)-30,
    backgroundColor:'transparent'
  },
  divFood:{
    width:(width/2)-20,
    // height:(width/2),
    padding:10,
    borderRadius:5,
    marginTop:20,
    marginBottom:0,
    marginLeft:12,
    alignItems:'center',
    elevation:8,
    shadowOpacity:0.3,
    shadowRadius:50,
    backgroundColor:'white'
  }
});
