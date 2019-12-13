import React from "react";
import { View, Picker, Alert, Dimensions, StyleSheet } from "react-native";
import Header from "../components/Header";
import { getContacts } from "../utils/System";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "../constants/Key";
import IconButton from "../components/buttons/IconButton";
import { Direction } from "../components/icons/Direction";
import { getFullName } from "../utils/Util";
import Geocoder from "react-native-geocoding";

const { width, height } = Dimensions.get("window");

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fromContact: null,
      toContact: null,
      coordinates: null
    };
    this.mapView = null;

    this.handleShowDirection = this.handleShowDirection.bind(this);
  }

  async componentDidMount() {
    try {
      Geocoder.init(GOOGLE_MAPS_APIKEY);
    } catch (err) {
      if (err.origin) {
        Alert.alert("Error", err.origin.error_message);
      } else {
        Alert.alert("Error", err.message);
      }
    }
    let contacts = await getContacts();
    this.props.contactLoaded(contacts);
  }

  handleFromContactChange(contact) {
    if (contact && contact == this.state.toContact) {
      Alert.alert("Notice", "Please choose different contact than other one.");
    } else {
      this.setState({ fromContact: contact });
    }
  }

  handleToContactChange(contact) {
    if (contact && contact == this.state.fromContact) {
      Alert.alert("Notice", "Please choose different contact than other one.");
    } else {
      this.setState({ toContact: contact });
    }
  }

  async handleShowDirection() {
    const { fromContact, toContact } = this.state;
    if (!fromContact || !toContact) {
      Alert.alert("Notice", "Please choose both of contacts.");
      return;
    }
    let fromCoord = Geocoder.from(
      fromContact.addresses[0].formattedAddress
    ).then(json => json.results[0].geometry.location);
    let toCoord = Geocoder.from(toContact.addresses[0].formattedAddress).then(
      json => json.results[0].geometry.location
    );
    try {
      let coords = await Promise.all([fromCoord, toCoord]);
      this.setState({
        coordinates: [
          {
            latitude: coords[0].lat,
            longitude: coords[0].lng
          },
          {
            latitude: coords[1].lat,
            longitude: coords[1].lng
          }
        ]
      });
    } catch (err) {
      if (err.origin) {
        Alert.alert("Error", err.origin.error_message);
      } else {
        Alert.alert("Error", err.message);
      }
      console.log(err);
    }
  }

  render() {
    return (
      <View style={styles.screen}>
        <Header title="Show Direction" />
        <View
          style={{
            position: "absolute",
            top: 100,
            left: 0,
            flexDirection: "column",
            width: "100%",
            zIndex: 100
          }}
        >
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={this.state.fromContact}
              onValueChange={fromContact =>
                this.handleFromContactChange(fromContact)
              }
              style={styles.pickerStyle}
              itemStyle={{ height: 300 }}
            >
              <Picker.Item label="Please select contact" value={null} />
              {this.props.contacts.map(contact => (
                <Picker.Item
                  key={contact.id}
                  label={getFullName(contact)}
                  value={contact}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={this.state.toContact}
              onValueChange={toContact => this.handleToContactChange(toContact)}
              style={styles.pickerStyle}
            >
              <Picker.Item label="Please select contact" value={null} />
              {this.props.contacts.map(contact => (
                <Picker.Item
                  key={contact.id}
                  label={getFullName(contact)}
                  value={contact}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.directionButtonStyle}>
          <IconButton onPress={this.handleShowDirection}>
            <Direction />
          </IconButton>
        </View>
        <MapView
          style={{ flex: 1 }}
          ref={c => (this.mapView = c)}
          onPress={this.onMapPress}
        >
          {this.state.coordinates &&
            this.state.coordinates.map((coordinate, index) => (
              <MapView.Marker
                key={`coordinate_${index}`}
                coordinate={coordinate}
              />
            ))}
          {this.state.coordinates && this.state.coordinates.length >= 2 && (
            <MapViewDirections
              origin={this.state.coordinates[0]}
              mode="WALKING"
              waypoints={
                this.state.coordinates.length > 2
                  ? this.state.coordinates.slice(1, -1)
                  : null
              }
              destination={
                this.state.coordinates[this.state.coordinates.length - 1]
              }
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
              optimizeWaypoints={true}
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`
                );
              }}
              onReady={result => {
                if (!result) {
                  Alert.alert(
                    "Notice",
                    "Server cannot route this contacts. Please choose different contacts."
                  );
                  return;
                }
                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 20,
                    bottom: height / 20,
                    left: width / 20,
                    top: height / 20
                  }
                });
              }}
              onError={errorMessage => {
                Alert.alert(
                  "Notice",
                  "Invalid route. Please choose different contacts."
                );
                console.log(errorMessage);
              }}
            />
          )}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column"
  },
  pickerWrapper: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#99c2e6",
    overflow: "hidden"
  },
  pickerStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.8)"
  },
  directionButtonStyle: {
    position: "absolute",
    right: 20,
    bottom: 20,
    zIndex: 100
  }
});

export default HomeScreen;
