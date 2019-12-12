import React from "react";
import { View, Picker, Dimensions, StyleSheet } from "react-native";
import Header from "../components/Header";
import { getContacts } from "../utils/System";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "../constants/Key";
import IconButton from "../components/buttons/IconButton";
import { Direction } from "../components/icons/Direction";

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
      fromContact: "",
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

  handleShowDirection() {}

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
              onValueChange={fromContact => this.setState({ fromContact })}
              style={styles.pickerStyle}
              mode={Picker.MODE_DIALOG}
            >
              <Picker.Item label="Please select contact" value="" />
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={this.state.toContact}
              onValueChange={toContact => this.setState({ toContact })}
              style={styles.pickerStyle}
              mode={Picker.MODE_DIALOG}
            >
              <Picker.Item label="Please select contact" value="" />
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
                console.log("Distance: ${result.distance} km");
                console.log("Duration: ${result.duration} min.");

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
                // console.log('GOT AN ERROR');
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
