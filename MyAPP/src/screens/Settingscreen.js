import * as React from "react";
import {View, Text } from 'react-native';

export default function Settingscreen({navigation}){
    return(
        <View style={{ flex:1, alignContent: 'center', justifyContent: 'center'}}>
            <Text 
                onPress={() => navigation.navigate('Home')}
                >Settings
            </Text>
            <Text 
                onPress={() => navigation.navigate('Screen for Options')}
                >Settings
            </Text>
        </View>
    )
}