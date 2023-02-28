import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, FlatList, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Modal from "react-native-modalbox";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import db from '../Database';

const { width, height } = Dimensions.get("window");

const Tab = createMaterialTopTabNavigator();
const BtTab = createBottomTabNavigator();

function Historyscreen({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [popupBx, setpopupBx] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

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
      <Modal isOpen={popupBx} animationType="slide" style={styles.modalBox}>
        <View style={styles.popupBxModal}>
          <Text style={styles.itemTitle}>{selectedItem.name}</Text>
          <Text style={styles.itemDescription}>Date : {selectedItem.date}</Text>
          <Text style={styles.itemDescription}>Strike Price: ${selectedItem.strikeprice}</Text>
          <Text style={styles.itemDescription}>Type: {selectedItem.type}</Text>
          <Text style={styles.itemDescription}>Premium: {selectedItem.price}</Text>
          <Text style={styles.itemDescription}>Unit : {selectedItem.amt}</Text>
          <TouchableOpacity onPress={() => handlePopUpClose()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM watchlist;',
        [],
        (_, { rows }) => setWatchlist(rows._array)
      );
    });
    console.log("Item 1; ", watchlist[0])
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
            onPress={() => navigation.goBack()}
            style={styles.btnContainer}
          >
            <Text style={styles.textButton}>
              My Portfolio
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.btnContainer}
          >
            <Text style={styles.textButton1}>
              History
            </Text>
          </TouchableOpacity>
        </View>

      </Modal>
    );
  };



  return (
    <View style={styles.container}>
      <View style={styles.port}>
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

      <View style={styles.container}>
        <View style={styles.containerDetails}>
          <View style={styles.boxDetails}>
            <Text style={styles.iconDetails}>$500</Text>
            <Text style={styles.textDetails}>Total Money</Text>
          </View>
          <View style={styles.boxDetails}>
            <Text style={styles.iconDetails}>$330</Text>
            <Text style={styles.textDetails}>Invested</Text>
          </View>
          <View style={styles.boxDetails}>
            <Text style={styles.iconDetails}>$22</Text>
            <Text style={styles.textDetails}>P/L($)</Text>
          </View>
        </View>
        <View>
          <View style={styles.textInputHeader}>
            <Text>Name</Text>
            <Text style={{ left: 25 }}>Invested</Text>
            <Text>Premium</Text>
          </View>
          <FlatList
            data={watchlist}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleItemSelected(item)}>
                <View style={styles.text_input}>
                  <Text>{item.name}</Text>
                  <Text>${item.strikeprice}</Text>
                  <Text>${item.price}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
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
  }, 
  containerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    borderBottomColor: "black",
    borderColor: "black"
  },
  boxDetails: {
    flex: 1,
    alignItems: 'center',
    borderColor: 'grey',
    paddingLeft: 10,
  },
  iconDetails: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textDetails: {
    fontSize: 16,
    textAlign: 'center',
  },
})

export default Historyscreen;