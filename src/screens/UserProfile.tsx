import React from 'react';
import { View, Text, Alert, ScrollView, StyleSheet, ActivityIndicator, useWindowDimensions, Button as Buttoni} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ME } from './../Core/graphql';
import { useQuery } from 'react-apollo';
import { storeData } from './../Core/asyncStore'
import { Button, Icon, Image, Divider, Tooltip } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Colors } from './../Components/Colors';
import  Comp  from '../Components/Tabs';
import { TouchableHighlight } from 'react-native-gesture-handler';


export const YodaAvatar  = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSevx682hBgangRQO2ipSMlozzNk_lDixDDBVHVpbkhMeKWsLXb&usqp=CAU'
const yzbek = 'https://avt-30.foto.mail.ru/mail/adilzhan.99/_avatar180?'

const UserProfile =(props:any) =>{
  const navi = useNavigation()
  const { width, height } = useWindowDimensions()
  const { client, loading, error, data } = useQuery(ME, { errorPolicy: 'all' })
  const callAlert = () =>
    Alert.alert(
      "Покинуть аккаунт?",
      "Нажмите Отмена что-бы отменить действие",
      [
        {
          text: "Отмена",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "OK", onPress: () => 
          async function() {storeData('token', '')
           .then( () =>{
            console.log('stor очищен')
            client.resetStore()
           })
           .then(()=>
              navi.navigate('Map')
              ) }()
        }
      ],
      { cancelable: false }
    );

  React.useLayoutEffect( () => {
    navi.setOptions({
      headerTintColor: 'black',
      headerTransparent : true,
      headerRight:()=>(
      <Tooltip 
        width = {200}
        backgroundColor = '#fafafa'
        popover= { 
          <Button 
            buttonStyle={{backgroundColor: 'transparent'}}
            onPress={callAlert}
            title='Выйти из аккаунта'
            titleStyle={{position: 'absolute',color: 'black'}}
          />
        } 
      >
        <Icon
          name = 'edit'
          type = 'font-awesome'
          size={25}
          color='black' 
          containerStyle = {{ marginRight: 15}}
        />
      </Tooltip>
      ),
     })
  }, [data])

  if (loading) return <Text>Loading...</Text>
  if (error){
    navi.navigate('Map')
  return <View /> }
  if(data) return (
      <View style= { styled.container}>
      <View style ={ styled.avatarContainer}>
        <Image 
          style= {{width: width, height: height -300}}
          source = {{ uri: YodaAvatar}}
        PlaceholderContent ={ <ActivityIndicator />}
        />
      </View>
      <LinearGradient
        style = {styled.gradient}
        colors={["transparent",Colors.themeblue]} 
      >
        <View />
      </LinearGradient>
      <View style ={ styled.infoContainer}>
        <View style ={{flexDirection: 'column', padding: 10}}>
          <Text style = {styled.info_name}>Имя пользователя
          </Text>
        <Text style = {styled.info_region}>Казань</Text>
        <Text style = {styled.info_registration}>
          Ищет мойки с 11.09.1992
          </Text>
        </View>
      </View>
      <View style ={ styled.raitingContainer}>
        <View>
          <Text style={styled.raitingDigit} >2,555</Text>
          <Text style={styled.raitingText}>комментариев</Text>
        </View>
        <View>
          <Text style={styled.raitingDigit}>600</Text>
          <Text style={styled.raitingText}>лайков</Text>
        </View>
        <View />
        <View>
          <Button 
            title='Подписатся' 
            type='outline'
            buttonStyle={styled.raitingButton}
            titleStyle= {styled.raitingButtonTitle}
            />
        </View>
      </View>
      <View style ={ styled.statusContainer}>
        <Text>Тут можно какой то статус высоко-ахуенный сделать</Text>
      </View>
      <Divider  style= {{ backgroundColor: 'rgba(0,0,0, .4)',
       height: 0.2}}/>
      <View style ={ styled.tabContainer}>
        <Comp />
      </View>
      </View>
  );
}
const styled = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
  },
  avatarContainer:{
    flex: 7
  },
  gradient:{
    flex: 1
  },
  infoContainer:{
    flex: 1.3,
    backgroundColor: Colors.themeblue
  },
  info_name:{ 
    color: '#454545', 
    fontWeight: '400', 
    fontSize: 30
  },
  info_region:{ 
    color: '#454545', 
    fontWeight: '300', 
    fontSize: 18,
    paddingLeft: 5
  },
  info_registration:{ 
    color: '#454545', 
    fontWeight: '300', 
    fontSize: 14,
    paddingLeft: 5
  },
  raitingContainer:{
    flex: 1.4,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor: Colors.themeblue
  },
  raitingDigit:{
    color: '#454545', 
    fontWeight: '700', 
    fontSize: 30
  },
  raitingText:{
    color: '#454545', 
    fontWeight: '300', 
    fontSize: 14,
  },
  raitingButton:{
    borderRadius: 25,
    padding: 10,
    paddingHorizontal:20,
    borderColor: '#454545'
  },
  raitingButtonTitle:{
    color: '#454545',

  },
  statusContainer:{
    flex:1,
    backgroundColor: Colors.themeblue
  },
  tabContainer:{
    flex:1,
    backgroundColor: Colors.themeblue
  },
})
export default UserProfile


{/* <Button title = 'Выйти' 
onPress = { 
 async () => storeData('token', '')
  .then( () =>{
   console.log('stor очищен')
   client.resetStore()
  })
  .then(()=>
     navi.navigate('Map')
     ) 
 }
/>
<Text style = {{color: "#333"}}> {data.me.login}</Text> */}