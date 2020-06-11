import React, {Component} from 'react';
import {StyleSheet,Text,View,FlatList,Dimensions,ScrollView,TextInput,TouchableOpacity, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import { AsyncStorage } from 'react-native';

var {height , width} = Dimensions.get("window");

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      dataBanner:[],
      categories:[],
      foods:[],
      selectedCategory: 0
    }
  }

  componentDidMount(){
    const url = "http://tutofox.com/foodapp/api.json";
    return fetch (url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading:false,
        dataBanner: responseJson.banner,
        categories : responseJson.categories,
        foods : responseJson.food
      });
    })
    .catch((error) => {
      console.log(error)
    });
  }

// TODO : Render Display
render(){
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image style={styles.image} resizeMode="contain" source={require("../image/grab.png")} />
        <View style={{ flex: 1 }}>
          <Swiper style={{height:width/2}}  showsButtons={false} autoplay={true} autoplayTimeout={1}>
            {
              this.state.dataBanner.map((itembann)=>{
                return(
                  <Image style={styles.imageBanner} resizeMode="contain" source={{uri:itembann}}/>
                )
              })
            }
          </Swiper>
          </View>
        <View style={{height:20}} />
      </View>



      <View style={{width:width, borderRadius:20, paddingVertical:20, backgroundColor:'white'}}>

      <View style={{height:5}} />
      <Text style={styles.titleCategory} >Danh Mục</Text>
        <FlatList
          horizontal={true}
          data={this.state.categories}
          renderItem={({item})=> this._renderItemCategories(item)}
          keyExtractor = {(item,index) => index.toString()}
          />

        <Text style={styles.titleCategory} >Danh Sách Thực Đơn</Text>
        <FlatList
          data={this.state.foods}
          numColumns={2}
          renderItem={({item})=> this._renderItemFoods(item)}
          keyExtractor={(item,index) => index.toString()}
          />

      </View>

    </View>
    </ScrollView>
  );
}
// ===================================== METHOD ================================== //


_renderItemFoods(item){
  let cate = this.state.selectedCategory;
  if (cate == 0 || cate == item.categorie){
    return(
        <TouchableOpacity style={styles.divFood}>
          <Image
            style={styles.imageFood}
            resizeMode="contain"
            source={{uri:item.image}} />
            <View style={{height:((width/2)-20)-200, backgroundColor:'transparent', width:((width/2)-20)-10}} />
            <Text style={{fontWeight:'bold',fontSize:15,textAlign:'center'}}>
              {item.name}
            </Text>
            <Text>Mô tả đang trống</Text>
            <Text style={{fontSize:20,color:"green"}}>${item.price}</Text>

            <TouchableOpacity
            onPress={()=>this.onClickAddCart(item)}
              style={{
                width:(width/2)-40,
                backgroundColor:'#33c37d',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:"center",
                borderRadius:5,
                padding:4
                }}>
            <Text style={{fontSize:18, color:"white", fontWeight:"bold"}}>Add Cart</Text>
             <View style={{width:10}} />
             <Icon name="ios-add-circle" size={30} color={"black"} />
            </TouchableOpacity>
          </TouchableOpacity>
        )
  }
}

_renderItemCategories(item){
  return(
    <TouchableOpacity style={[styles.divCategory,{backgroundColor:item.color}]}
      onPress={()=>this.setState({selectedCategory:item.id})}>
      <Image style={{width:100, height:100}} resizeMode="contain" source={{uri:item.image}} />
      <Text style={{fontWeight:'bold',fontSize:15}}>{item.name}</Text>
    </TouchableOpacity>
  )
}

onClickAddCart(data){

 const itemcart = {
   food: data,
   quantity:  1,
   price: data.price
 }

 AsyncStorage.getItem('cart').then((datacart)=>{
     if (datacart !== null) {
       // We have data!!
       const cart = JSON.parse(datacart)
       cart.push(itemcart)
       AsyncStorage.setItem('cart',JSON.stringify(cart));
     }
     else{
       const cart  = []
       cart.push(itemcart)
       AsyncStorage.setItem('cart',JSON.stringify(cart));
     }
     alert("Add Cart")
   })
   .catch((err)=>{
     alert(err)
   })
}

}// END CLASS

// =============== STYLE =============== //
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
