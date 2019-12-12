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

const mapStateToProps = state => ({ contacts: state.reducer.contacts });
const mapDispatchToProps = dispatch => ({
  contactLoaded: contacts => dispatch(contactLoaded(contacts))
});

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
    },
    Contact: {
      screen: connect(mapStateToProps, mapDispatchToProps)(ContactScreen)
    },
    Index: {
      screen: connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
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
    contentComponent: connect(mapStateToProps)(SideMenu),
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
