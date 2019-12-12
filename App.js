import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Platform } from "@unimodules/core";
import { createAppContainer } from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import SideMenu from "./components/SideMenu";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Index: { screen: HomeScreen }
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
    contentComponent: SideMenu,
    defaultNavigationOptions: {
      gesturesEnabled: false
    },
    drawerWidth: 320,
    drawerBackgroundColor: "transparent"
  }
);

const AppContainer = createAppContainer(AppDrawerNavigator);

const App = () => <AppContainer />;

export default App;
