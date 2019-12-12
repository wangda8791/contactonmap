import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/Header";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.screen}>
        <Header title="Test 1" />
        <View></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default HomeScreen;
