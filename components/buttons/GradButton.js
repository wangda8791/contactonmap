import React from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1D5D96',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.24,
    shadowRadius: 2,
    height: 48,
    borderRadius: 10
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: 'white',
    letterSpacing: 0.57
  }
});

export default GradButton = (props) => (
  <TouchableHighlight onPress={props.onPress} style={{ ...styles.button, ...props.style }} underlayColor="#2E75B5">
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ ...styles.text, ...props.textStyle }}>{props.title}</Text>
      <Text style={{ fontFamily: 'Roboto', fontWeight: '300', fontSize: 12, color: '#A0C3ED', display: props.subtitle ? 'flex' : 'none' }}>{props.subtitle}</Text>
    </View>
  </TouchableHighlight>
);
