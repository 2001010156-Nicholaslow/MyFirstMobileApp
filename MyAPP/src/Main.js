import React, { useEffect, useState } from "react";
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import db from './Database';

//Screens
import HomeScreen from "./screens/Homescreen";
import PortScreem from "./screens/PortScreen";
import SettingsScreen from "./screens/Settingscreen";
import AddScreen from "./screens/Addscreen";
import AddOptionscreen from "./screens/AddOptionscreen";
import AddOtherscreen from "./screens/AddOthersceen";
import Historyscreen from "./screens/Historyscreen";
import Optionscreen from "./screens/Optionscreen";

const HomeName = "Home";
const PortName = "List";
const SettingsName = "Settings";
const AddName = "Add";
const AddOptionName = "Options";
const AddOtherName = "Others";
const HistoryName = "Historyscreen";
const OptionName = "Optionscreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={HomeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === HomeName) {
            iconName = focused ? 'home' : 'home-outline';

          } else if (rn === PortName) {
            iconName = focused ? 'list' : 'list-outline';

          } else if (rn === SettingsName) {
            iconName = focused ? 'settings' : 'settings-outline';

          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { padding: 2, height: "8%" },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 8, fontSize: 10, }
      }}>

      <Tab.Screen name={HomeName} component={HomeScreen} options={{ header: () => null }} />
      <Tab.Screen name={PortName} component={PortScreem} options={{ header: () => null }} />
      <Tab.Screen name={SettingsName} component={SettingsScreen} />
    </Tab.Navigator>
  );
}


const App = () => {
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS watchlist (id INTEGER PRIMARY KEY AUTOINCREMENT, amt TEXT, name TEXT, date TEXT, strikeprice TEXT , type TEXT, price TEXT, filled TEXT);',
        []    );
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name={HomeName} component={TabStack} options={{ header: () => null }} />
        <Stack.Screen name={PortName} component={PortScreem} options={{ header: () => null }} />
        <Stack.Screen name={SettingsName} component={SettingsScreen} options={{ header: () => null }} />
        <Stack.Screen name={AddName} component={AddScreen} options={{ header: () => null }} />
        <Stack.Screen name={AddOptionName} component={AddOptionscreen} options={{ header: () => null }} />
        <Stack.Screen name={AddOtherName} component={AddOtherscreen} options={{ header: () => null }} />
        <Stack.Screen name={HistoryName} component={Historyscreen} options={{ header: () => null }} />
        <Stack.Screen name={OptionName} component={Optionscreen} options={{ header: () => null }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;