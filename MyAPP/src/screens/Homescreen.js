import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';



function Homescreen({ navigation }) {

    const [visible, setVisble] = useState(false);

    const handleVisibleModal = () => {
        setVisble(!visible)
        // setHideId(null)
    }

    return (
        <View style={{top: "8%"}}>
            <TouchableOpacity
                onPress={handleVisibleModal}
                style={styles.btnNewContainer}
            >
                <Text >New Course</Text>
            </TouchableOpacity>

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



            <View style={{ flex: 1, alignItems: 'center', bottom: '3%', right: '10%', position: 'absolute', }}>
                <FontAwesome.Button name="plus" size={15} backgroundColor="#3b5998" onPress={() => navigation.navigate('Add')}>
                    Add
                </FontAwesome.Button>
            </View>

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
export default Homescreen;