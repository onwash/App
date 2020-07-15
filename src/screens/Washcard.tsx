import React from 'react';
import {Tile, Text, Rating, Divider, Icon} from 'react-native-elements';
import {Button as Buttoni} from 'react-native-elements';
import {
  View,
  StyleSheet,
  Modal,
  Alert,
  TouchableHighlight,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import {Comment} from './../Components/Comment';
import {CommentsData, CommentDataType} from './../Core/data';
import {Formik} from 'formik';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from './../Components/Colors';
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo';

const GETALL = gql`
  query getAllWashDescriptions($coordinatesId: String) {
    getAllWashDescriptions(coordinatesId: $coordinatesId) {
      washname
      postCount
      coordinatesId
      uptime
      adress
      options {
        title
      }
      social {
        raiting
        likesCount {
          count
        }
        views {
          count
        }
      }
    }
  }
`;

export function Washcard(props: any) {
  console.log(`Строка 20: ${JSON.stringify(props.route.params)}`);
  const {loading, error, data} = useQuery(GETALL, {
    variables: {
      coordinatesId: props.route.params.coordinatesId,
    },
  });
  console.log(data);
  const {width, height} = useWindowDimensions();
  const [aboutModal, setAboutModal] = React.useState(false);
  const [feedBackModal, setFeedModal] = React.useState(false);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const {
    washname,
    social,
    adress,
    uptime,
    options,
  } = data.getAllWashDescriptions[0];

  return (
    <>
      <ScrollView style={{backgroundColor: '#ffffff'}}>
        <View>
          <Tile
            titleStyle={{...styled.titleStyle, width: width}}
            captionStyle={{
              position: 'absolute',
              top: 300,
              left: 10,
              color: '#333',
            }}
            imageSrc={require('./../assets/pugs1.jpeg')}
            title={washname}
            featured
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text h4 style={styled.h4style}>
            О мойке
          </Text>
          <Text style={{marginRight: 10}}>
            Просмотров: {social.views.count || 0}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon color="red" name="favorite" />
            <Text style={{marginRight: 10}}>
              {social.likesCount.count || 0}
            </Text>
          </View>
        </View>
        <Text style={styled.adres}>
          Адрес:
          <Text style={styled.adres2}> {adress}</Text>
        </Text>
        <Text style={styled.adres}>
          Режим работы:
          <Text style={styled.adres2}>
            {' '}
            {uptime === 'alltime' ? '24/7' : null}{' '}
          </Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            margin: 10,
          }}>
          <View style={{flex: 1}}></View>
          <View style={{flex: 1}}>
            <Text>ico</Text>
          </View>
          <View style={{flex: 4}}>
            {options.map((i: any) => (
              <Text style={{paddingBottom: 5}} key={i.id}>
                {i.title}
              </Text>
            ))}
          </View>
        </View>
        <Divider />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            margin: 10,
          }}>
          <Buttoni
            title="Рейтинг"
            titleStyle={{fontSize: 25, color: Colors.themeblue}}
            buttonStyle={{backgroundColor: 'transparent'}}
            onPress={() => setAboutModal(true)}
          />
          <AboutModal aboutModal={aboutModal} setAboutModal={setAboutModal} />
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Rating
                imageSize={20}
                readonly
                startingValue={social.raiting}
                ratingBackgroundColor="#333"
                type="custom"
                ratingColor="red"
              />
              <Text>{social.raiting}/5</Text>
            </View>
          </View>
        </View>

        <View>
          <Divider />

          {CommentsData.map((i: CommentDataType) => (
            <Comment
              key={i.id}
              fullname={i.fullname}
              date={i.date}
              text={i.text}
              raiting={i.raiting}
              attachments={i.attachments}
              avatarURI={i.avatarURI}
            />
          ))}
          <GiveFeedbackModal
            feedBackModal={feedBackModal}
            setFeedModal={setFeedModal}
          />
        </View>
      </ScrollView>
      <Buttoni
        containerStyle={{position: 'absolute', top: height / 1.1, width: width}}
        title="Оставить отзыв"
        buttonStyle={{backgroundColor: 'black'}}
        onPress={() => setFeedModal(true)}
      />
    </>
  );
}

const AboutModal = ({aboutModal, setAboutModal}: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={aboutModal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styled.centeredView}>
        <View style={styled.modalView}>
          <Text style={styled.modalText}>
            Информация о том из чего складывается рейтинг
          </Text>

          <TouchableHighlight
            style={{...styled.openButton, backgroundColor: '#2196F3'}}
            onPress={() => {
              setAboutModal(!aboutModal);
            }}>
            <Text style={styled.textStyle}>Закрыть</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const GiveFeedbackModal = ({feedBackModal, setFeedModal}: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={feedBackModal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styled.centeredView}>
        <View style={styled.modalView}>
          <Formik
            initialValues={{email: ''}}
            onSubmit={(values) => console.log(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View>
                <TextInput
                  style={{backgroundColor: '#f3f3f3', margin: 5}}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                <TextInput
                  style={{backgroundColor: '#f3f3f3', margin: 5}}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                <TouchableHighlight
                  style={{...styled.openButton, backgroundColor: '#2196F3'}}
                  onPress={() => {
                    handleSubmit();
                    setFeedModal(!feedBackModal);
                  }}>
                  <Text style={styled.textStyle}>Отправить</Text>
                </TouchableHighlight>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

const styled = StyleSheet.create({
  h4style: {
    margin: 10,
  },
  adres: {
    color: '#333',
    marginLeft: 20,
    marginBottom: 6,
  },
  adres2: {
    color: '#3333',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
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
  titleStyle: {
    position: 'absolute',
    top: 285,
    left: 0,
    color: 'black',
    backgroundColor: 'rgba(255,255,255, 0.3)',
    margin: 0,
    paddingLeft: 15,
    paddingBottom: 10,
    paddingRight: 15,
  },
});
