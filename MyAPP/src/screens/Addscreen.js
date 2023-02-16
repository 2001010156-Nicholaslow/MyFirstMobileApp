import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AddOptionscreen from "../screens/AddOptionscreen";
import AddOtherscreen from "../screens/AddOthersceen";

// const AddOptionName = "1";
// const AddOtherName = "2";

const Tab = createMaterialTopTabNavigator();

export default function Addscreen({ navigation }) {
    return (

            <Tab.Navigator style={{ padding: 2, height: "8%", marginTop: "10%" }}>
                <Tab.Screen name="Options" component={AddOptionscreen} />
                <Tab.Screen name="Others" component={AddOtherscreen} />
            </Tab.Navigator>


    );
}

const styles = StyleSheet.create({

    form: {
        padding: 15,
        // backgroundColor : "#e3e3e3",
        marginTop: 10
    },
    txtClose: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "right"
    },
});