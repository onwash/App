import React, {useState, useRef} from 'react';
import {usePosition} from './../Core/usePostion';
import MapView, {Marker} from 'react-native-maps';
import {View, StyleSheet, Alert, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyLocation from './../Components/MyLocation';
import MapOptions from './../Components/MapOptions';
import WashMiniDescription from './../Components/WashMiniDescription';
import {IMiniWashDes} from './../types';
import {useQuery, useLazyQuery} from '@apollo/react-hooks';
import {GET_WASH_COORDINATES} from './../Core/graphql';
import gql from 'graphql-tag';

Icon.loadFont();

type serverresponse = {
  id: string;
  longitude: number;
  latitude: number;
  createdAt: any;
  updatedAt: any;
  __v: number;
};
const GET_MINI_DESC = gql`
  query getAllWashDescriptions($coordinatesId: String) {
    getAllWashDescriptions(coordinatesId: $coordinatesId) {
      washname
      postCount
      coordinatesId
      uptime
    }
  }
`;
const BaseMap = (props: any) => {
  const [getAllWashDescriptions, query] = useLazyQuery(GET_MINI_DESC);
  const {loading, error, data} = useQuery(GET_WASH_COORDINATES);
  const mapRef = useRef<MapView | null>(null);
  const userLocation = usePosition();
  const [showOptions, setShowOptions] = useState(false);
  const [showWashMiniDesc, setShowWashMiniDesc] = useState(false);
  const [appropriateWash, setAppropriateWash] = useState<
    IMiniWashDes | {} | undefined
  >({});
  //const [washscoordinates, setwashscoordinates] = useState<serverresponse[]>([])

  const setMiniDescModalVisible = async (id: string) => {
    await getAllWashDescriptions({variables: {coordinatesId: id}});
    if (query && query.data) {
      const result = query.data.getAllWashDescriptions;
      console.log(result);
      if (result !== undefined) {
        setAppropriateWash(result[0]);
        setShowWashMiniDesc(true);
      } else {
        return Alert.alert('Возникли проблемы');
      }
    }
  };

  const showMyLocation = async () => {
    let b = mapRef.current;
    if (!userLocation.error) {
      b!.animateToCoordinate({...userLocation});
    } else Alert.alert(userLocation.error);
  };
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error! {error.message}</Text>;

  return (
    <View style={{flex: 1}}>
      <MapView
        //onPress={(a:any)=>console.log('preess', a.nativeEvent )}
        showsCompass={false}
        ref={mapRef}
        style={{flex: 1}}
        initialRegion={{
          latitude: 59.93863,
          longitude: 30.41413,
          latitudeDelta: 0.5222,
          longitudeDelta: 0.5221,
        }}>
        <Marker
          coordinate={{
            latitude: 59.966639,
            longitude: 30.298041,
          }}
          title={'Home'}
          description={'home with wine'}
          onPress={() => setShowOptions(true)}
        />
        {console.log(data)}
        {data.getWashCoordinates.length === 0
          ? null
          : data.getWashCoordinates.map((i: serverresponse) => {
              return (
                <Marker
                  key={i.id}
                  identifier={i.id}
                  coordinate={{
                    latitude: i.latitude,
                    longitude: i.longitude,
                  }}
                  onPress={() => setMiniDescModalVisible(i.id)}
                />
              );
            })}

        <MyLocation myLocation={userLocation} />
      </MapView>

      <MapOptions modalVisible={showOptions} setModalVisible={setShowOptions} />
      {appropriateWash === undefined ? null : (
        <WashMiniDescription
          wash={appropriateWash}
          modalVisible={showWashMiniDesc}
          setModalVisible={setShowWashMiniDesc}
        />
      )}

      <Button
        type="outline"
        buttonStyle={styled.circlebutton}
        containerStyle={{
          position: 'absolute',
          top: 80,
          left: 20,
        }}
        icon={<Icon name="bars" size={30} color="black" />}
        onPress={() => props.navigation.openDrawer()}
      />
      <Button
        type="outline"
        buttonStyle={styled.circlebutton}
        containerStyle={{
          position: 'absolute',
          top: 80,
          left: 350,
        }}
        icon={<Icon name="sliders" size={30} color="black" />}
        onPress={() => setShowOptions(true)}
      />
      <Button
        type="outline"
        buttonStyle={styled.circlebutton}
        containerStyle={{
          position: 'absolute',
          top: 790,
          left: 350,
        }}
        icon={<Icon name="location-arrow" size={30} color="black" />}
        onPress={() => showMyLocation()}
      />
    </View>
  );
};

const styled = StyleSheet.create({
  circlebutton: {
    borderColor: '#6c757d',
    borderRadius: 50,
    width: 45,
    height: 45,
    backgroundColor: 'rgba(0,191,255, 0.3)',
  },
});
export default BaseMap;
