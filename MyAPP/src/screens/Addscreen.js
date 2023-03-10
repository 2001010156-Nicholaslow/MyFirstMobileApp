import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker'; //ios
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import db from '../Database';


function Addscreen({ navigation }) {

    const [option, setOption] = useState();
    const [selected, setSelected] = React.useState("");

    const [actionSell, setActionSell] = useState("");
    const [actionCallPut, setActionCallPut] = useState("");
    const [amount, setAmount] = useState("");
    const [stockName, setStockName] = useState("");
    const [strickPrice, setStrickPrice] = useState("");
    const [stockGive, setStockGive] = useState("");
    const [inout, setInOut] = useState("");
    const [date, setDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState("")

    const actionData = [
        { key: '1', value: 'Options', },
        { key: '2', value: 'Deposit/Others' },
    ]
    
    const handelSave = () => {
        // setFinalDate(date.getDate().toString() +"-"+ date.getMonth().toString() +"-"+ date.getFullYear().toString())
        // console.log(amount, stockName, finalDate, strickPrice, actionCallPut, stockGive)
         db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS watchlist (id INTEGER PRIMARY KEY AUTOINCREMENT, amt TEXT, name TEXT, date TEXT, strikeprice TEXT , type TEXT, price TEXT, filled TEXT);',
                [],
                (_, result) => console.log('Table created:', result)
            );
        });

        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO watchlist (amt, name, date, strikeprice, type, price, filled) VALUES (?,?,?,?,?,?,?);',
                [amount, stockName, date.getDate().toString() +"-"+ date.getMonth().toString() +"-"+ date.getFullYear().toString(), strickPrice, actionCallPut, stockGive, 0],
                //[1, 'Shop', 12-12-2023, 15, 21, 12, 0],
                (_, { insertId }) => alert(`Item has been successfully added`),
                (_, error) => console.log('Error inserting row:', error)
            );
        })
         navigation.navigate('Home')
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };


    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };


    return (
        <View style={styles.form}>
            <Text
                style={styles.txtClose}
                onPress={() => navigation.navigate('Home')}
            >Back
            </Text>

            <SelectList
                style={styles.text_input}
                setSelected={(val) => setSelected(val)}
                data={actionData}
                save="value"
            />
            <TextInput
                style={styles.text_input}
                value={amount}
                keyboardType='number-pad'
                placeholder="Amount"
                onChangeText={(e) => { setAmount(e) }}
            />

            <TextInput
                style={styles.text_input}
                value={stockName}
                placeholder="Symbol"
                //onChange={(e) => { setStockName(e.target.value) }}
                onChangeText={(e) => { setStockName(e) }}

            />

            <View
                style={styles.text_input}>
                <Text style={styles.txt_item}>{date.toLocaleDateString()}</Text>
                <View style={{ flex: 1, alignItems: 'center', position: 'absolute', left: '90%' }}>
                    <FontAwesome.Button name="calendar" size={25} color="#3b5998" backgroundColor="transparent" onPress={showDatepicker} />
                </View>
            </View>


            <TextInput
                style={styles.text_input}
                value={strickPrice}
                keyboardType='number-pad'
                placeholder="Strick price"
                onPress={showDatepicker}
                onChangeText={(e) => { setStrickPrice(e) }}
            />

            <TextInput
                style={styles.text_input}
                value={actionCallPut}
                placeholder="Type Call/Put"
                onChangeText={(e) => { setActionCallPut(e) }}
            />

            <TextInput
                style={styles.text_input}
                value={stockGive}
                keyboardType='number-pad'
                placeholder="Premium"
                onChangeText={(e) => { setStockGive(e) }}

            />

            <TouchableOpacity
                onPress={handelSave}
                style={styles.btnContainer}
            >
                <Text style={styles.textButton}>
                    Save
                </Text>
            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({

    form: {
        padding: 15,
        // backgroundColor : "#e3e3e3",
        marginTop: 14
    },

    txtClose: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "right",
        paddingBottom: 2
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
    },
})
export default Addscreen;