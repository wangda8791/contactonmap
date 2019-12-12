import React from "react";
import { StyleSheet } from "react-native";
import { Menu } from "../icons/Menu";
import TransButton from "./TransButton";
import { withNavigation } from "react-navigation";

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  }
});

class MenuButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  handleButtonPress() {
    this.props.navigation.openDrawer();
  }

  render() {
    return (
      <TransButton
        onPress={this.handleButtonPress}
        style={{ ...styles.button, ...this.props.style }}
      >
        <Menu />
      </TransButton>
    );
  }
}

export default withNavigation(MenuButton);
