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

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fromContact: null,
      toContact: "",
      coordinates: [
        {
          latitude: 37.3317876,
          longitude: -122.0054812
        },
        {
          latitude: 37.771707,
          longitude: -122.4053769
        }
      ]
    };
    this.mapView = null;

    this.handleShowDirection = this.handleShowDirection.bind(this);
  }

  async componentDidMount() {
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

  handleShowDirection() {
    // Name	Type	Description
    // street	string	Street name.
    // city	string	City name.
    // country	string	Country name.
    // region	string	Region or state name.
    // neighborhood	string	Neighborhood name.
    // postalCode	string	Local post code.
    // poBox	string	P.O. Box.
    // isoCountryCode	string	Standard code.
    // id	string	Unique ID.
    // label	string	Localized display name.
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
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          style={{ flex: 1 }}
          ref={c => (this.mapView = c)}
          onPress={this.onMapPress}
        >
          {this.state.coordinates.map((coordinate, index) => (
            <MapView.Marker
              key={`coordinate_${index}`}
              coordinate={coordinate}
            />
          ))}
          {this.state.coordinates.length >= 2 && (
            <MapViewDirections
              origin={this.state.coordinates[0]}
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
    elevation: 100
  }
});

export default HomeScreen;
