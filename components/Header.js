import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MenuButton from "./buttons/MenuButton";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.header}>
        <LinearGradient
          style={styles.gradient}
          colors={["rgba(55, 105, 150, 0)", "rgba(46, 117, 181, 1)"]}
        >
          <MenuButton style={styles.leftButton} />
          <View style={styles.headerTitle}>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 84,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#376996"
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    paddingLeft: 22,
    paddingRight: 22
  },
  headerTitle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    paddingRight: 32
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    textAlign: "center"
  },
  leftButton: {
    width: 32,
    height: 32
  }
});

export default Header;
