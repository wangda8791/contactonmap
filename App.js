import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Platform } from "@unimodules/core";
import { createAppContainer } from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import SideMenu from "./components/SideMenu";
import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";
import { reducer } from "./reducers";
import { contactLoaded } from "./actions/ContactAction";
import ContactScreen from "./screens/ContactScreen";
import { getAddressableContact } from "./selectors/ContactSelector";

const mapContactStateToProps = state => ({ contacts: state.reducer.contacts });
const mapAddressContactStateToProps = state => ({
  contacts: getAddressableContact(state)
});
const mapDispatchToProps = dispatch => ({
  contactLoaded: contacts => dispatch(contactLoaded(contacts))
});

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: connect(
        mapAddressContactStateToProps,
        mapDispatchToProps
      )(HomeScreen)
    },
    Contact: {
      screen: connect(mapContactStateToProps, mapDispatchToProps)(ContactScreen)
    },
    Index: {
      screen: connect(
        mapAddressContactStateToProps,
        mapDispatchToProps
      )(HomeScreen)
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Index",
    mode: Platform.OS === "ios" ? "modal" : "card"
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Main: {
      screen: MainNavigator
    }
  },
  {
    contentComponent: connect(mapContactStateToProps)(SideMenu),
    defaultNavigationOptions: {
      gesturesEnabled: false
    },
    drawerWidth: 320,
    drawerBackgroundColor: "transparent"
  }
);

const AppContainer = createAppContainer(AppDrawerNavigator);

const store = createStore(combineReducers({ reducer }));

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;
