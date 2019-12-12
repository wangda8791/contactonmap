import React from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GradButton from "./buttons/GradButton";
import { importContacts } from "../services/Contacts";

class SideMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleImportContacts = this.handleImportContacts.bind(this);
    this.handleShowDirection = this.handleShowDirection.bind(this);
  }

  handleImportContacts() {
    Alert.alert(
      "Action",
      "Do you really want to import contacts?",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            this.doImportContacts();
          }
        }
      ],
      { cancelable: false }
    );
  }

  handleShowDirection() {
    this.props.navigation.navigate("Home");
  }

  async doImportContacts() {
    this.props.navigation.navigate("Contact");
    this.props.navigation.closeDrawer();

    try {
      let res = await importContacts(this.props.contacts);
      if (res.success) {
        Alert.alert("Success", "Importing contact is succeeded.");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Importing contact to server is failed.");
    }
  }

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
              style={styles.buttonStyle}
              textStyle={styles.buttonTextStyle}
              onPress={this.handleImportContacts}
            />
            <GradButton
              title="Show Direction"
              style={styles.buttonStyle}
              textStyle={styles.buttonTextStyle}
              onPress={this.handleShowDirection}
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
  buttonStyle: {
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  buttonTextStyle: {
    fontFamily: "Roboto",
    fontWeight: "300",
    fontSize: 16,
    letterSpacing: 0.48
  }
});

export default SideMenu;
