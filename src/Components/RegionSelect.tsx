import * as React from 'react';
import { PickerIOS, Picker } from '@react-native-community/picker';
import { View, Modal, Platform, Text, StyleSheet, useWindowDimensions} from 'react-native';



export interface IRegionSelectProps {
  
}

export function RegionSelect ({modalVisible ,setModalVisible, regions,setRegionValue,regionValue,setFieldValue }:any) {
  const {width} = useWindowDimensions()
  const selectRegion = (id:any) => {
    const  desiredRegion =  regions.find((i:any) => i.id === id)
    setRegionValue(desiredRegion)
    setFieldValue('region', desiredRegion, true)
    setModalVisible(false)
  } 
  return (
    <View style={styles.container}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false)
      }}
    >
      <View style={styles.container}>
        <View style={{...styles.modalView, width: width}}>
    <Text>Выбранный регион: {regionValue.name}</Text>
          {
            Platform.OS === 'ios' ? 
            <PickerIOS
              
              style ={{ marginTop : -25}}
              selectedValue={regionValue}
              onValueChange={regid =>{
                selectRegion(regid)
              }}
            >
              {
              regions.map( (i:any) => 
                <Picker.Item 
                  key = {i.id} 
                  label = {i.name}
                  value = {i.id} /> )
              }
            </PickerIOS>
            :
            <Picker>

            </Picker>
          }
        </View>
        </View>
    </Modal>
  </View>
);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    backgroundColor: "white",
    height: 220,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    marginBottom: 15
  }
});

export default RegionSelect