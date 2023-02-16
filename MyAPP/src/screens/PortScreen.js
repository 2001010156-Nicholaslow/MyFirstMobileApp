import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import Historyscreen from "../screens/Historyscreen";
import Optionscreen from "../screens/Optionscreen";

const Tab = createMaterialTopTabNavigator();

function PortScreen({ navigation }) {


    return (
        <View style={style.container}>
            <View style={{flex: 1 }}>
                <Tab.Navigator style={{ paddingTop: 0, marginTop: 0 }}>
                    <Tab.Screen name="Options" component={Historyscreen} />
                    <Tab.Screen name="Others" component={Optionscreen} />
                </Tab.Navigator>
            </View>

            <TouchableOpacity style={{ flex: 1, alignItems: 'center', bottom: '3%', right: '10%', position: 'absolute', }}>
                <View>
                    <FontAwesome.Button name="plus" size={15} backgroundColor="#3b5998" onPress={() => navigation.navigate('Add')}>
                        Add
                    </FontAwesome.Button>
                </View>
            </TouchableOpacity>
        </View>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default PortScreen;