import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Avatar, Button } from 'react-native-elements';

export interface IDrawerProfileProps {
  name?: string
  login?: boolean
  navigation?: any
}

const DrawerProfile: React.FC<IDrawerProfileProps>  =(props) =>{
  return (
    <View style={styled.container}>
      <Avatar
        size = 'large'
        source= {{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}
        containerStyle={{flex: 1, margin: 20}}
      />
      <View style ={styled.options} >
        <Text style = {{color: "#333"}}>
          {
          props.name ? 
          props.name
          :
          'Нет авторизации'
          }
        </Text>

        {
         props.login ? 
            <Button
              type = 'clear'
              containerStyle={{
                marginTop: 33 , padding: 0, 
              width:90, justifyContent:'flex-start'}}
              buttonStyle={styled.options_link_btn}
              title= 'Профиль'
              onPress={()=>props.navigation.navigate('Settings')}
            />
         :
          <Button
            type = 'clear'
            containerStyle={{
              marginTop: 33 , padding: 0, 
              width:70, justifyContent:'flex-start'}}
            buttonStyle={styled.options_link_btn}
            title= 'Вход'
            onPress={()=>props.navigation.navigate('Auth')}
          />
        }
      </View>
    </View>
  );
}

const styled = StyleSheet.create({
  container:{
    marginTop:30,
    flex:1,
    flexDirection: 'row',
    height:120,
    backgroundColor: '#ffffff'
  },
  options:{
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: "flex-start",
    marginTop:20
  },
  options_link_btn:{
    margin:0, 
    padding:0,
    alignContent:'flex-start'
  }
})


export default DrawerProfile

