import React from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  useWindowDimensions,
  PanResponder,
  Animated,
} from 'react-native';
import {Icon, Divider, Button} from 'react-native-elements';
import {Colors} from './Colors';
import {useNavigation} from '@react-navigation/native';

interface WashMiniDescriptionPropsType {
  modalVisible: boolean;
  setModalVisible: any;
  wash: any;
}
const WashMiniDescription: React.FC<WashMiniDescriptionPropsType> = ({
  modalVisible,
  setModalVisible,
  wash,
}) => {
  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();
  console.log(wash);

  const recognizeDrag = ({moveX, moveY, dx, dy}: any) => {
    if (dy > 120) {
      return true;
    } else false;
  };
  const recognizeOpenFullDescription = ({moveX, moveY, dx, dy}: any) => {
    if (dy < -100) {
      return true;
    } else false;
  };
  const panResponder: any = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e, getstureState) => {
        return true;
      },
      onPanResponderEnd: (e, getstureState) => {
        if (recognizeDrag(getstureState)) {
          setModalVisible(false);
        } else if (recognizeOpenFullDescription(getstureState)) {
          navigation.navigate('Washcard', wash);
          setModalVisible(false);
        }
        return true;
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{...styles.bluestripe, width: width, top: height - 200}} />
        <View
          style={{
            ...styles.blackstripe,
            width: width / 8,
            top: height - 296,
            zIndex: 10,
            marginLeft: width / 2.3,
          }}
        />
        <View style={{top: height / 1.5}} {...panResponder.panHandlers}>
          <Animated.View
            style={{
              ...styles.modalView,
              height: height / 3.9,
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
            }}>
            <View style={styles.header}>
              <Text style={styles.header_text}>{wash.washname}</Text>
              <TouchableHighlight
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Icon name="close" />
              </TouchableHighlight>
            </View>
            <Divider style={{height: 1, width: width - 60}} />
            <View>
              <Text>{wash.adress}</Text>
              <Text>Режим работы {wash.uptime}</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text>рейтинг</Text>
                {/* { 
                  wash.social.raiting === undefined ? null :
                  <Rating 
                  startingValue={wash.social.raiting}
                  imageSize={20}
                  readonly/> 
                  } */}
              </View>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text>Посты</Text>
                <Text>{wash.postCount}</Text>
              </View>
            </View>
          </Animated.View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            <Button
              titleStyle={{color: 'black'}}
              buttonStyle={{
                backgroundColor: '#ffffff',
                marginTop: 15,
                borderRadius: 15,
              }}
              icon={<Icon name="favorite" color="pink" />}
            />
            <Button
              titleStyle={{color: 'black'}}
              buttonStyle={{
                backgroundColor: '#ffffff',
                marginTop: 15,
                borderRadius: 15,
              }}
              title="Открыть"
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Washcard', wash);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
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
  blackstripe: {
    backgroundColor: 'black',
    position: 'absolute',
    height: 2.2,
    borderRadius: 50,
  },
});

export default WashMiniDescription;
