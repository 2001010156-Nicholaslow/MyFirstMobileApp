import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SettingScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <TouchableOpacity style={styles.optionContainer}>
                <Feather name="user" size={30} color="black" />
                <Text style={styles.optionText}>Account</Text>
                <Feather name="chevron-right" size={34} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionContainer}>
                <Feather name="trending-up" size={30} color="black" />
                <Text style={styles.optionText}>Trading</Text>
                <Feather name="chevron-right" size={34} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionContainer}>
            <Feather name="archive" size={30} color="black" />
                <Text style={styles.optionText}>Archive</Text>
                <Feather name="chevron-right" size={34} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionContainer}>
                <Feather name="bell" size={30} color="black" />
                <Text style={styles.optionText}>Notifications</Text>
                <Feather name="chevron-right" size={34} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionContainer}>
                <Feather name="help-circle" size={30} color="black" />
                <Text style={styles.optionText}>Help</Text>
                <Feather name="chevron-right" size={34} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionContainer}>
                <Feather name="log-out" size={30} color="black" />
                <Text style={styles.optionText}>Log out</Text>
                <Feather name="chevron-right" size={34} color="black" />
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 14,
    },
    optionText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});
export default SettingScreen;