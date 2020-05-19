import React, {Component} from 'react';
import {StyleSheet,Text,View,FlatList,Dimensions,ScrollView,TextInput,TouchableOpacity, Image} from 'react-native';
import Swiper from 'react-native-swiper';

var {height , width} = Dimensions.get("window");

export default class AppFood extends Component{

  constructor(props){
    super(props);
    this.state = {
      dataBanner:[],
      categories:[],
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
        categories : responseJson.categories
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
        <Image style={styles.image} resizeMode="contain" source={require("./image/grab.png")} />
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
      <Text style={styles.titleCategory} >Categories {this.state.selectedCategory}</Text>
        <FlatList horizontal={true} data={this.state.categories}
          renderItem={({item})=> this._renderItem(item)}
          keyExtractor = {(item,index) => index.toString()}
          />
      </View>

    </View>
    </ScrollView>
  );
}

_renderItem(item){
  return(
    <TouchableOpacity style={[styles.divCategory,{backgroundColor:item.color}]}
      onPress={()=>this.setState({selectedCategory:item.id})}>
      <Image style={{width:100, height:100}} resizeMode="contain" source={{uri:item.image}} />
      <Text style={{fontWeight:'bold',fontSize:15}}>{item.name}</Text>
    </TouchableOpacity>
  )
}

}

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
});
