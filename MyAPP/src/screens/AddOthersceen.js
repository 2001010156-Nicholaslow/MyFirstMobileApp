import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker'; //ios
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import FontAwesome from '@expo/vector-icons/FontAwesome';


function AddOtherscreen({ navigation }) {

    const [option, setOption] = useState();
    const [selected, setSelected] = React.useState("");

    const [actionSell, setActionSell] = useState("");
    const [actionCallPut, setActionCallPut] = useState("");
    const [amount, setAmount] = useState("");
    const [stockName, setStockName] = useState("");
    const [strickPrice, setStrickPrice] = useState("");
    const [stockGive, setStockGive] = useState("");
    const [inout, setInOut] = useState("");

    const actionData = [
        { key: '1', value: 'Options', },
        { key: '2', value: 'Deposit/Others' },
    ]

    const [date, setDate] = useState(new Date());

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
           <Text style={styles.text_input2}>
                Deposit/Others
                </Text>
            <TextInput
                style={styles.text_input}
                value={amount}
                keyboardType='number-pad'
                placeholder="Amount"
                onChange={(e) => { setAmount(e.target.value) }}
            />

            <TextInput
                style={styles.text_input}
                value={stockName}
                placeholder="Symbol"
                onChange={(e) => { setStockName(e.target.value) }}
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
                onChange={(e) => { setStrickPrice(e.target.value) }}
            />

            <TextInput
                style={styles.text_input}
                value={actionCallPut}
                placeholder="Type Call/Put"
                onChange={(e) => { setActionCallPut(e.target.value) }}
            />

            <TextInput
                style={styles.text_input}
                value={stockGive}
                keyboardType='number-pad'
                placeholder="Price"
                onChange={(e) => { setStockGive(e.target.value) }}
            />

            <TouchableOpacity
                //onPress={handelSave}
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
        marginTop: 10
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
    text_input2: {
        padding: 13,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        marginTop: 10,
        fontSize: 15
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
export default AddOtherscreen;