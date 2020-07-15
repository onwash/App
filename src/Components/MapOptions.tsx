import React from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {Icon, Divider, ListItem, Button} from 'react-native-elements';
import {Colors} from './Colors';
//import { mapSortingOptions } from "./../Core/data"
import {useQuery} from 'react-apollo';
import gql from 'graphql-tag';
import {IMapSettings} from './../types/';

export const GET_MAP_SETTINGS = gql`
  query {
    getmapsettings {
      id
      title
      subtitle
      selected
      useInMapOption
      archived
      icon {
        id
        link
        size
        storeRoute
      }
      creator {
        login
      }
    }
  }
`;

const MapOptions = ({modalVisible, setModalVisible}: any) => {
  const {data, loading, error} = useQuery(GET_MAP_SETTINGS);
  const {width, height} = useWindowDimensions();

  if (error) return <Text>Error: {error}</Text>;
  if (loading) return <Text>loading ...</Text>;

  console.log(data);

  return (
    <ScrollView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{...styles.bluestripe, width: width, top: height - 200}} />
        <View style={{top: height / 2.4}}>
          <View
            style={{
              ...styles.modalView,
              height: height / 1.9,
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
            }}>
            <View style={styles.header}>
              <Text style={styles.header_text}>Настройки карты</Text>
              <TouchableHighlight
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Icon name="close" />
              </TouchableHighlight>
            </View>
            <Divider style={{height: 1, width: width - 60}} />

            <ScrollView showsVerticalScrollIndicator={false}>
              {data.getmapsettings.map((l: IMapSettings, i: number) =>
                l.useInMapOption === true && l.archived === false ? (
                  <ListItem
                    subtitleStyle={{fontSize: 10, color: '#999', marginTop: 2}}
                    titleStyle={{color: '#333'}}
                    key={i}
                    title={l.title}
                    subtitle={l.subtitle}
                    bottomDivider
                    checkBox={{
                      // checkedIcon: 'circle',
                      // uncheckedIcon: 'circle',
                      checkedColor: Colors.themeblue,
                      // uncheckedColor: '#B6BF80',
                      onPress: () => {},
                      checked: l.selected,
                    }}
                  />
                ) : null,
              )}
            </ScrollView>
            <Button
              buttonStyle={{backgroundColor: Colors.themeblue, marginTop: 15}}
              title="Сохранить фильтр"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    position: 'absolute',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    position: 'relative',
    padding: 0,
    margin: 0,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  header_text: {
    fontSize: 20,
    fontWeight: '500',
  },
  closeButton: {
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  bluestripe: {
    backgroundColor: Colors.themeblue,
    position: 'absolute',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: 200,
  },
});

export default MapOptions;
