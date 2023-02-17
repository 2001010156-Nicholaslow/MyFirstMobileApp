import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, SafeAreaView,Button, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Modal from "react-native-modalbox";

const { width, height } = Dimensions.get("window");

//Screens
import HomeScreen from "../screens/Homescreen";
import PortScreem from "../screens/PortScreen";
import SettingsScreen from "../screens/Settingscreen";
import Historyscreen from "../screens/Historyscreen";
import Optionscreen from "../screens/Optionscreen";

const HomeName = "Home";
const PortName = "List";
const SettingsName = "Settings";

const Tab = createMaterialTopTabNavigator();

function PortScreen({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);

    const getModal = () => {
        return (
            <Modal
                entry="bottom"
                backdropPressToClose={true}
                isOpen={modalVisible}
                style={style.modalBox}
                onClosed={() => setModalVisible(false)}
            >
                <View style={style.content}>
                    <Text style={style.textStyle}>Test</Text>
                </View>

            </Modal>
        );
    };


    return (
        <View style={style.container}>
            <View style={style.port}>
                <FontAwesome.Button
                    name="angle-down"
                    size={35}
                    color="black"
                    style={{ paddingTop: 0, marginTop: 0, fontWeight: 'bold', backgroundColor: "white"}}
                    onPress={() => navigation.navigate('Options')}>
                    My Portfolio
                </FontAwesome.Button>
                <View style={{ flexDirection: "row" }}>
                    <View>
                        <Button onPress={() => navigation.navigate('Home')}
                            title="Learn More"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button" />
                    </View>
                    <View >
                        <Button onPress={() => navigation.navigate('Home')}
                            title="Learn More"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button" />
                    </View>
                </View>
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
    },
    port: {
        paddingTop: '15%',
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center"
    },
    modalBox: {
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        height,
        width,
        backgroundColor: "transparent",
    },
    content: {
        position: "absolute",
        bottom: 0,
        width,
        height: 250,
        borderTopLeftRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 20,
        backgroundColor: "white"
    },
    textStyle: {
        fontSize: 22
    }
})

export default PortScreen;