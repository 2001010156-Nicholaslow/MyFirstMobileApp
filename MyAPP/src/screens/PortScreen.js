import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Modal from "react-native-modalbox";
import db from '../Database';

const { width, height } = Dimensions.get("window");

const HomeName = "Home";
const PortName = "List";
const SettingsName = "Settings";

const Tab = createMaterialTopTabNavigator();

function PortScreen({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [portView, setPortView] = useState(true);
    const [watchlist, setWatchlist] = useState([]);

    const reloadpage = () => {
        db.transaction(tx => {

            tx.executeSql(
                'SELECT * FROM watchlist;',
                [],
                (_, { rows }) => setWatchlist(rows._array),
                (_, { rows }) => console.log('Result:', rows._array),
                (_, error) => console.log('Error selecting rows:', error)
            );
        }
        )
    };

    useEffect(() => {

        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS watchlist (id INTEGER PRIMARY KEY AUTOINCREMENT, amt TEXT, name TEXT, date TEXT, strikeprice TEXT , type TEXT, price TEXT, filled TEXT);',
                [],
                (_, result) => console.log('Table created:', result)
            );
        });

        db.transaction(tx => {
            //  tx.executeSql(
            //    'INSERT INTO watchlist (amt, name, date, strikeprice, type, price, filled) VALUES (?, ?,?,?,?,?,?);',
            //   [1, 'Banana Inc.', '12-2-2023', 142.90, 'Call', 15, 0],
            //    (_, { insertId }) => console.log('Row inserted with ID:', insertId),
            //    (_, error) => console.log('Error inserting row:', error)
            //  );

            // tx.executeSql(
            //   'DROP watchlist;',
            //   [],
            //   (_, result) => console.log('Table cleared:', result)
            // );

            // tx.executeSql(
            //   'DELETE FROM watchlist;',
            //   [],
            //   (_, result) => console.log('Table cleared:', result)
            // );


            tx.executeSql(
                'SELECT * FROM watchlist;',
                [],
                (_, { rows }) => setWatchlist(rows._array),
                (_, { rows }) => console.log('Result:', rows._array),
                (_, error) => console.log('Error selecting rows:', error)
            );
        });


        console.log("listofItems: ", watchlist);
    }, []);

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
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={style.btnContainer}
                    >
                        <Text style={style.textButton1}>
                            My Portfolio
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Historyscreen')}
                        style={style.btnContainer}
                    >
                        <Text style={style.textButton}>
                            History
                        </Text>
                    </TouchableOpacity>
                </View>

            </Modal>
        );
    };

    return (
        <View style={style.container}>
            {reloadpage()}
            <View style={style.port}>
                <FontAwesome.Button
                    name="angle-down"
                    size={35}
                    color="black"
                    style={{ paddingTop: 0, marginTop: 0, fontWeight: 'bold', backgroundColor: "white" }}
                    onPress={() => setModalVisible(true)}>
                    My Portfolio
                </FontAwesome.Button>
                <View style={{ flexDirection: "row" }}>
                </View>
            </View>

            {getModal()}

            <View>
                <FlatList
                    data={watchlist}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={style.text_input}>
                            <Text>{item.amt}</Text>
                            <Text>{item.name}</Text>
                            <Text>{item.date}</Text>
                            <Text>{item.strikeprice}</Text>
                            <Text>{item.type}</Text>
                            <Text>{item.price}</Text>
                            <Text></Text>
                        </View>
                    )}
                />
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
        height: 200,
        borderTopLeftRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 20,
        backgroundColor: "white"
    },
    textStyle: {
        fontSize: 22
    },
    textButton: {
        fontSize: 20,
        color: "black",
    },
    textButton1: {
        fontSize: 20,
        color: "#3b5998",
        fontWeight: 'bold',
    },
    btnContainer: {
        display: 'flex',
        padding: 20,
        backgroundColor: "white",
        marginTop: 2,
        width: "100%",
        borderBottomColor: "black",
        borderBottomWidth: 1,
    }, item: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'Black'
    },
    price: {
        fontSize: 16,
    },
    text_input: {
        padding: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        marginTop: 10
    },
})

export default PortScreen;