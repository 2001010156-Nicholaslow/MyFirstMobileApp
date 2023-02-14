import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import DatePicker from '@react-native-community/datetimepicker';


function Addscreen({ navigation }) {

    const [option, setOption] = useState();
    const [selected, setSelected] = React.useState("");
    const [currentState, setCurrentState] = useState(1);
    const [actionDateStart, setActionDateStart] = useState(new Date())

    const [actionSell, setActionSell] = useState("");
    const [actionCallPut, setActionCallPut] = useState("");
    const [actionDate, setActionDate] = useState("");
    const [amount, setAmount] = useState("");
    const [stockName, setStockName] = useState("");
    const [strickPrice, setStrickPrice] = useState("");
    const [stockGive, setStockGive] = useState("");
    const [inout, setInOut] = useState("");

    const actionData = [
        { key: '1', value: 'Options', },
        { key: '2', value: 'Deposit/Others' },
    ]

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
                placeholder="Amount"
                onChange={(e) => { setAmount(e.target.value) }}
            />

            <TextInput
                style={styles.text_input}
                value={stockName}
                placeholder="Symbol"
                onChange={(e) => { setStockName(e.target.value) }}
            />

            <TextInput
                style={styles.text_input}
                value={actionDate}
                placeholder="Date"
                onChange={(e) => { setActionDate(e.target.value) }}
            />

            <DatePicker
                style={{ width: 200 }}
                date={actionDateStart}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2022-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                }}
                onDateChange={(e) => { setActionDate(e.target.value)  }}
            />

            <TextInput
                style={styles.text_input}
                value={strickPrice}
                placeholder="Strick price"
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