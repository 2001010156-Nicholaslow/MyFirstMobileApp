import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

function PortScreen({ navigation }) {
    return (
        <View style={style.container}>
            <View style={{ top: "8%", flex: 1 }}>
                <Text>
                    History
                </Text>
            </View>

            <ScrollView>

            </ScrollView>

            <View>
                <Text>
                    inputs
                </Text>
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
        flex: 1
    }
})

export default PortScreen;