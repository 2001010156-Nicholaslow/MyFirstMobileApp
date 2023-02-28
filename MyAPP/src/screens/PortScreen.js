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
    const [popupBx, setpopupBx] = useState(false);
    const [watchlist, setWatchlist] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);

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
                style={styles.modalBox}
                onClosed={() => setModalVisible(false)}
            >
                <View style={styles.content}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={styles.btnContainer}
                    >
                        <Text style={styles.textButton1}>
                            My Portfolio
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Historyscreen')}
                        style={styles.btnContainer}
                    >
                        <Text style={styles.textButton}>
                            History
                        </Text>
                    </TouchableOpacity>
                </View>

            </Modal>
        );
    };

    const handleItemSelected = (item) => {
        setSelectedItem(item);
        setpopupBx(true);
    };

    const handlePopUpClose = () => {
        setSelectedItem([]);
        setpopupBx(false);
    }

    const popupBxrender = () => {
        return (
            <Modal isOpen={popupBx}  backdropPressToClose={true} animationType="slide" style={styles.modalBox}>
                <View style={styles.popupBxModal}>
                    <Text style={styles.itemTitle}>{selectedItem.name}</Text>
                    <Text style={styles.itemDescription}>Date : {selectedItem.date}</Text>
                    <Text style={styles.itemDescription}>Strike Price: ${selectedItem.strikeprice}</Text>
                    <Text style={styles.itemDescription}>Type: {selectedItem.type}</Text>
                    <Text style={styles.itemDescription}>Premium: {selectedItem.price}</Text>
                    <Text style={styles.itemDescription}>Unit : {selectedItem.amt}</Text>
                    <TouchableOpacity onPress={() => handlePopUpClose()} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Option filled</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }

    return (
        <View style={styles.container}>
            {reloadpage()}
            <View style={styles.port}>
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
                <View style={styles.textInputHeader}>
                    <Text>Name</Text>
                    <Text>Date</Text>
                    <Text>Price</Text>
                </View>
                <FlatList
                    data={watchlist}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleItemSelected(item)}>
                            <View style={styles.text_input}>
                                <Text>{item.name}</Text>
                                <Text>{item.date}</Text>
                                <Text>${item.strikeprice}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            {popupBxrender()}
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

const styles = StyleSheet.create({
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
    textInputHeader: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "gray",
        borderRadius: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text_input: {
        padding: 13,
        borderBottomWidth: 1,
        borderColor: "gray",
        borderRadius: 0,
        marginTop: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }, modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center'
    }, modalButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    closeButton: {
        backgroundColor: '#3b5998',
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    popupBxModal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        margin: 20,
        alignItems: "center",
        width: '90%',
        height: 'auto',
        maxHeight: '70%',

    },
})

export default PortScreen;