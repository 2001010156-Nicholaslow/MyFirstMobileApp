import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Modal from "react-native-modalbox";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import db from '../Database';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get("window");

const Tab = createMaterialTopTabNavigator();
const BtTab = createBottomTabNavigator();

function Historyscreen({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [portView, setPortView] = useState(true);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
      db.transaction(tx => {
          tx.executeSql(
              'SELECT * FROM watchlist;',
              [],
              (_, { rows }) => setWatchlist(rows._array)
          );
      });
     console.log("Item 1; " , watchlist[0])
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
            onPress={() => navigation.goBack()}
            style={style.btnContainer}
          >
            <Text style={style.textButton}>
              My Portfolio
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={style.btnContainer}
          >
            <Text style={style.textButton1}>
              History
            </Text>
          </TouchableOpacity>
        </View>

      </Modal>
    );
  };



  return (
    <View style={style.container}>
      <View style={style.port}>
        <FontAwesome.Button
          name="angle-down"
          size={35}
          color="black"
          style={{ paddingTop: 0, marginTop: 0, fontWeight: 'bold', backgroundColor: "white" }}
          onPress={() => setModalVisible(true)}>
          History
        </FontAwesome.Button>
        <View style={{ flexDirection: "row" }}>
        </View>
      </View>

      {getModal()}

      <View>
        <View style={style.container}>
          {watchlist.map(item => (
            <View style={style.item} key={item.id}>
              <Text style={style.name}>{item.name}</Text>
              <Text style={style.price}>{item.price}</Text>
            </View>
          ))}
        </View>
      </View>
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
  },
  item: {
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
})

export default Historyscreen;