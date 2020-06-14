import React, { Component } from 'react';
import { Text, View, TextInput, Image,ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

var { width } = Dimensions.get("window")
export default class Cart extends Component {

  constructor(props) {
     super(props);
     this.state = {
       dataCart:[],
       isEmptyCart : true
     };
  }

  componentDidMount(){
    AsyncStorage.getItem('cart').then((cart)=>{
      if (cart !== null) {
        // We have data!!
        const cartfood = JSON.parse(cart)
        this.setState({dataCart:cartfood})

        this.state.isEmptyCart = false;

      } else {
        this.state.isEmptyCart = true;
      }
    })
    .catch((err)=>{
      alert(err)
    })
  }

  onChangeQual(i,type){
   const dataCar = this.state.dataCart
   let cantd = dataCar[i].quantity;

   if (type) { // true
    dataCar[i].quantity = cantd + 1
   }
   else if (type==false&&cantd>=2){
    dataCar[i].quantity = cantd - 1
   }
   else if (type==false&&cantd==1){
    dataCar.splice(i,1)
   }

   this.setState({dataCart:dataCar})

   // Check is empty cart
   if (dataCar.length > 0){
     this.state.isEmptyCart = false;
   }else {
     this.state.isEmptyCart = true;
   }

   AsyncStorage.setItem('cart',JSON.stringify(dataCar))
 }

  render() {

    const buttonCheckout = <TouchableOpacity style={{
        backgroundColor:"#33c37d",
        width:width-40,
        alignItems:'center',
        padding:10,
        borderRadius:5,
        margin:20
      }}>

      <Text style={{
          fontSize:24,
          fontWeight:"bold",
          color:'white'
        }}>
        CHECKOUT
      </Text>
    </TouchableOpacity>

    return (
      <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
         <View style={{height:20}} />
         <Text style={{fontSize:32,fontWeight:"bold",color:"#33c37d"}}>Cart food</Text>
         <View style={{height:10}} />

         <View style={{flex:1}}>

           <ScrollView>

             {
               this.state.dataCart.map((item,i)=>{
                 return(
                   <View style={{width:width-20,margin:10,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:2, borderColor:"#cccccc", paddingBottom:10}}>
                     <Image resizeMode={"contain"} style={{width:width/3,height:width/3}} source={{uri: item.food.pathImage}} />
                     <View style={{flex:1, backgroundColor:'trangraysparent', padding:10, justifyContent:"space-between"}}>
                       <View>
                         <Text style={{fontWeight:"bold", fontSize:20}}>{item.food.name}</Text>
                         <Text>Lorem Ipsum de food</Text>
                       </View>
                       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                         <Text style={{fontWeight:'bold',color:"#33c37d",fontSize:20}}>${item.price*item.quantity}</Text>
                         <View style={{flexDirection:'row', alignItems:'center'}}>
                           <TouchableOpacity onPress={()=>this.onChangeQual(i,false)}>
                             <Icon name="ios-remove-circle" size={35} color={"#33c37d"} />
                           </TouchableOpacity>
                           <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:18}}>{item.quantity}</Text>
                           <TouchableOpacity onPress={()=>this.onChangeQual(i,true)}>
                             <Icon name="ios-add-circle" size={35} color={"#33c37d"} />
                           </TouchableOpacity>
                         </View>
                       </View>
                     </View>
                   </View>
                 )
               })
             }

             <View style={{height:10}} />
              {buttonCheckout}
             <View style={{height:10}} />
           </ScrollView>

         </View>

      </View>
    );
  }


}// END class
