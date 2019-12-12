import React from "react";
import { TouchableHighlight } from "react-native-gesture-handler";

const TransButton = props => (
  <TouchableHighlight
    onPress={props.onPress}
    underlayColor={
      props.underlayColor ? props.underlayColor : "rgba(0,0,0,0.2)"
    }
    style={{ justifyContent: "center", alignItems: "center", ...props.style }}
  >
    {props.children}
  </TouchableHighlight>
);

export default TransButton;
