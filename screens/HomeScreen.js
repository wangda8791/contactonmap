import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import beautify from "json-beautify";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.screen}>
        <Header title="Test 1" />
        {this.props.contacts.length > 0 && (
          <ScrollView style={{ flexDirection: "column", padding: 20 }}>
            <Text style={{ flex: 1 }}>
              {beautify(this.props.contacts, null, 2, 80)}
            </Text>
          </ScrollView>
        )}
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
