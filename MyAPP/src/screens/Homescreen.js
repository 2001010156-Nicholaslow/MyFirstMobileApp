import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList,
    Button
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import db from '../Database';




function Homescreen({ navigation }) {
    const [watchlist, setWatchlist] = useState([]);

    const [selectedDataPoint, setSelectedDataPoint] = useState(null);
    const [visible, setVisble] = useState(false);

    const handleDataPointClick = (data) => {
        setSelectedDataPoint(data);
    };

    const handleVisibleModal = () => {
        setVisble(!visible)
    }

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

            //  tx.executeSql(
            //    'INSERT INTO watchlist (amt, name, date, strikeprice, type, price, filled) VALUES (?, ?,?,?,?,?,?);',
            //   [1, 'Shop', '2-5-2023', 10, 'Call', 5, 0],
            //    (_, { insertId }) => console.log('Row inserted with ID:', insertId),
            //    (_, error) => console.log('Error inserting row:', error)
            //  );

            tx.executeSql(
                'SELECT * FROM watchlist;',
                [],
                (_, { rows }) => setWatchlist(rows._array),
                (_, { rows }) => console.log('Result:', rows._array),
                (_, error) => console.log('Error selecting rows:', error)
            );
        });
    }, []);

    const data = {

        datasets: [
            {
                data: [60, 60, 62, 69, 63, 65, 60, 55, 52, 51, 52, 40],
                color: (opacity = 1) => `rgba(59, 89, 152, ${opacity})`,
                strokeWidth: 2
            },
        ]
    };

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

    return (
        <View style={styles.container}>
            {reloadpage()}
            <Modal
                animationType="slide"
                visible={visible}
            >
                <SafeAreaView>
                    <View>
                        <TouchableOpacity
                            onPress={handleVisibleModal}
                        >
                            <Text style={styles.txtClose}>
                                Close
                            </Text>
                        </TouchableOpacity>
                        <Text>
                            Hello I was hiding
                        </Text>
                    </View>
                </SafeAreaView>
            </Modal>

            <View style={styles.container2}>
                <View style={styles.textContainer}>
                    <View style={styles.topheader}>
                        <Text style={styles.headerText}>
                            Portfolio Value
                        </Text>
                        <TouchableOpacity
                            onPress={handleVisibleModal}
                            style={{ right: 25, top: 10 }}
                        >
                            <FontAwesome
                                name="angle-down"
                                size={35}
                                color="black"
                                onPress={handleVisibleModal}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.moneyText}>
                        $1080.00
                    </Text>




                </View>
                <View
                    style={{ right: 80, paddingTop: "10%" }}>
                    <LineChart
                        data={data}
                        width={500}
                        height={220}
                        chartConfig={{
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientToOpacity: 0,
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: '0',
                            },
                            propsForBackgroundLines: {
                                strokeOpacity: 0,
                            },
                            useShadowColorFromDataset: false
                        }}
                        onDataPointClick={handleDataPointClick}
                        withHorizontalLabels={false}
                        bezier
                    />
                    {/* {selectedDataPoint && ( // Render details only when a data point is selected
                        <View style={styles.detailsContainer}>
                            <Text style={styles.detailsText}>
                                Value: {selectedDataPoint.value}
                            </Text>
                            <Text style={styles.detailsText}>
                                Dataset index: {selectedDataPoint.datasetIndex}
                            </Text>
                            <Text style={styles.detailsText}>
                                Label: {selectedDataPoint.label}
                            </Text>
                        </View>
                    )} */}
                    <LinearGradient
                        colors={['rgba(217, 217, 217, 1)', 'rgba(242, 242, 242, 1)']}
                        style={styles.gradient}
                    />
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.headerText}>Recent Order :</Text>
                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            paddingTop: 5,
                        }}
                    />
                    <FlatList
                        data={watchlist.slice(0, 1)}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Text style={styles.itemTitle}>{item.name}</Text>
                                <Text style={styles.itemDescription}>Date :{item.date}</Text>
                                <Text style={styles.itemDescription}>Strike Price: {item.strikeprice}</Text>
                                <Text style={styles.itemDescription}>Type : {item.type}</Text>
                                <Text style={styles.itemDescription}>Premium : {item.price}</Text>
                            </View>
                        )}
                    />
                </View>

            </View>

        </View >


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container2: {
        flex: 1,
        paddingTop: "12%",
        paddingLeft: 2
    },
    textContainer: {
        paddingLeft: "6%",
        paddingTop: "3%"
    },
    form: {
        padding: 15,
        // backgroundColor : "#e3e3e3",
        marginTop: 10
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 22
    },
    moneyText: {
        fontWeight: "bold",
        fontSize: 22,
        color: '#3b5998',
    },
    topheader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    txtClose: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "right"
    },
    text_input: {
        padding: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        marginTop: 10
    },
    header_container: {
        padding: 15,
        backgroundColor: "#eeeeee",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    txt_main: {
        fontSize: 22,
        fontWeight: "bold"
    },
    item_course: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#e2e2e2",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    txt_name: {
        fontSize: 18,
        marginTop: 5,
        fontWeight: "bold"
    },
    txt_item: {
        fontSize: 14,
        marginTop: 5
    },
    txt_enabled: {
        fontSize: 14,
        marginTop: 5,
        color: "green",
        fontWeight: "bold"
    },
    txt_disabled: {
        fontSize: 14,
        marginTop: 5,
        color: "green",
        fontWeight: "bold"
    },
    txt_del: {
        fontSize: 14,
        marginTop: 5,
        color: "red",
        fontWeight: "bold"
    },
    txt_edit: {
        fontSize: 14,
        marginTop: 5,
        color: "blue",
        fontWeight: "bold"
    },
    btnContainer: {
        display: 'flex',
        padding: 15,
        backgroundColor: "#3b5998",
        marginTop: 20,
    },
    textButton: {
        textAlign: "center",
        fontSize: 15,
        color: "#FFF",
    }, selectedDataContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    selectedDataLabel: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    selectedDataValue: {
        fontSize: 16,
        marginTop: 5
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        width: 10000,
        height: '40%'
    },
    containerText: {
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, // for Android
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 24
    },
    itemContainer: {
        paddingTop: 10,
        marginBottom: 16
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8
    },
    itemDescription: {
        fontSize: 14,
        color: '#666'
    },
})
export default Homescreen;