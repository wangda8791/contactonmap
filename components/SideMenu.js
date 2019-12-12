import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GradButton from "./buttons/GradButton";

class SideMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleImportContacts = this.handleImportContacts.bind(this);
  }

  handleImportContacts() {}

  render() {
    return (
      <View style={{ ...styles.screen }}>
        <View style={styles.header}>
          <LinearGradient
            style={styles.gradient}
            colors={["rgba(55, 105, 150, 0)", "rgba(46, 117, 181, 1)"]}
          >
            <View
              style={{
                flexGrow: 1,
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <Text style={styles.menuText}>Menu</Text>
            </View>
          </LinearGradient>
        </View>
        <View
          style={{
            flex: 1,
            padding: 25,
            backgroundColor: "white"
          }}
        >
          <View style={{ flexGrow: 1 }}>
            <GradButton
              title="Import Contacts"
              style={styles.importButton}
              textStyle={styles.importButtonText}
              onPress={this.handleImportContacts}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
    paddingTop: 24,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5.5 },
    shadowOpacity: 0.24,
    shadowRadius: 5,
    elevation: 5
  },
  header: {
    height: 60,
    backgroundColor: "#376996"
  },
  gradient: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    padding: 22
  },
  menuText: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 16,
    color: "white"
  },
  importButton: {
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  importButtonText: {
    fontFamily: "Roboto",
    fontWeight: "300",
    fontSize: 16,
    letterSpacing: 0.48
  }
});

export default SideMenu;
