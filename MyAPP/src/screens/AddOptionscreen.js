import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Modal from "react-native-modalbox";
import FontAwesome from '@expo/vector-icons/FontAwesome';

//import {verticalScale} from './Utils/ScreenUtils';

const { width, height } = Dimensions.get("window");

export default function AddOptionscreen({ navigation }) {

    const [modalVisible, setModalVisible] = useState(true);
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, paddingTop: 50 }}>
                <FontAwesome.Button
                    name="angle-down"
                    size={25}
                    color="black"
                    style={{ paddingTop: 0, marginTop: 0, fontWeight: 'bold', backgroundColor: "white" }}
                    onPress={() => navigation.navigate('Home')}>
                    My Portfolio
                </FontAwesome.Button>
                
            </View>

            <TouchableOpacity style={{ flex: 1, alignItems: 'center', bottom: '3%', right: '10%', position: 'absolute', }}>
                <View>
                    <FontAwesome.Button name="plus" size={15} backgroundColor="#3b5998">
                        Add
                    </FontAwesome.Button>
                </View>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center"
    },
    modalBox: {
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        height,
        width,
        backgroundColor: "transparent"
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
});