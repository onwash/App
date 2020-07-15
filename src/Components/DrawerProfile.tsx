import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ME } from './../Core/graphql';
import { useQuery } from 'react-apollo';

import { Avatar, Button } from 'react-native-elements'
import { YodaAvatar } from './../screens/UserProfile';


export interface IDrawerProfileProps {
  name?: string
  login?: boolean
  navigation?: any
}


function TextName({navigation}:any){
  const { loading, error, data, refetch } = useQuery(ME, { errorPolicy: 'all' })
    React.useEffect(()=>{
      if( error?.message === 'not auth') refetch()
    }, [error])
  console.log(error)
  if (loading) return <Text style = {{color: "#333"}}>loading</Text>;
  if (error) {
    return (
      <>
      <Text style = {{color: "#333"}}>Нет авторизации</Text>
      <Button
        type = 'clear'
        containerStyle={styled.options_link_container}
        buttonStyle={styled.options_link_btn}
        title= 'Вход'
        onPress={()=>navigation.navigate('Auth')}
      />
      </>
      )
  }

  if(data)return (
    <>
    <Text style = {{color: "#333"}}  > {data.me.login}</Text>
    <Button
      type = 'clear'
      containerStyle={styled.options_link_container}
      buttonStyle={styled.options_link_btn}
      title= 'Профиль'
      onPress={()=>navigation.navigate('UserProfile')}
    />
    </>
  )
  return (
    <>
    <Text style = {{color: "#333"}}>Нет авторизации</Text>
    <Button
      type = 'clear'
      containerStyle={styled.options_link_container}
      buttonStyle={styled.options_link_btn}
      title= 'Вход'
      onPress={()=>navigation.navigate('Auth')}
    />
    </>
    )


  
}
const DrawerProfile: React.FC<IDrawerProfileProps>  = ({ navigation }) =>{
  return (
    <View style={styled.container}>
      <Avatar
        size = 'large'
        source= {{uri: YodaAvatar}}
        containerStyle={{flex: 1, margin: 20}}
      />
      <View style ={styled.options} >
        <TextName  navigation = { navigation }/>
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
  },
  options_link_container: {
    marginTop: 33, 
    padding: 0, 
    width:80, 
    justifyContent:'flex-start'}
})


export default DrawerProfile

