//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
// create a component
function Sample({ navigation }) {
  // React.useEffect(() => {
  //   if (this.route.params?.post) {
  //     // Post updated, do something with `route.params.post`
  //     // For example, send the post to the server
  //   }
  // }, [this.route.params?.post]);
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: "",
  //   };
  // }
  //   componentDidMount() {
  //     const { params } = this.props.navigation.state;
  //     this.setState({
  //       data: params.data,
  //     });
  //   }
  // render() {
  // const { params } = this.props.navigation.state;
  return (
    <View style={styles.container}>
      <Text>
        afsak
        {navigation.getParam("data", "ấnlknkla")}
        {/* sflakla{this.state.data} {params.data} */}
      </Text>
    </View>
  );
  //
}
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
//make this component available to the app
export default Sample;
