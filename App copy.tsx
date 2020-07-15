import 'react-native-gesture-handler';

import { ApolloProvider } from '@apollo/react-hooks';
import { makeApolloClient } from './src/Core/makeApolloClient'; 

import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DrawerProfile from './src/Components/DrawerProfile';
import {BaseMap} from './src/screens/BaseMap_copy';
//import BaseMap from './src/screens/BaseMap';
import LogIn from './src/screens/Login'
import SignUp from './src/screens/Signup'
import UserProfile from './src/screens/UserProfile';
import Contact from './src/screens/Contacts';
import WriteUs from './src/screens/WriteUs';
import Policy from './src/screens/Policy';
import { Washcard } from './src/screens/Washcard';
import Loading from './src/Components/Loading';


const Stack = createStackNavigator();
const ContactStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const AuthTab = createBottomTabNavigator();

///screens
export function Settings(props:any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
    </View>
  );
}

function Faq(props:any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Вопрос ответ</Text>
    </View>
  );
}
function Sales(props:any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Акции</Text>
    </View>
  );
}
function LastCommets(props:any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Последние комментарии</Text>
    </View>
  );
}
function EULA(){
  return(
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <Text>EULA Screen</Text>
</View>
  )
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}
//screens

function CustomDrawerContent(props:any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerProfile login = {false} {...props} />
      <DrawerItemList {...props} />
      {/* <DrawerItem label="Ссылка" onPress={() => Alert.alert('Link to help')} /> */}
    </DrawerContentScrollView>
  );
}

export default class App extends React.Component {
  state = {
    client: null
  }
  async componentDidMount(){
    // const session = await AsyncStorage.getItem('todo')
    // const sessionObj = JSON.parse(session!)
    // const { token, id } = sessionObj
    const client = makeApolloClient()
    this.setState({
      client
    })

  }
  createHomeStack = () =>
    <Stack.Navigator>
      <Stack.Screen
        name="Map"
        options={{
          headerShown: false, title: "Карта"}}
        children={this.createDrawer}
      />
      <Stack.Screen
        name="Settings"
        component={UserProfile}
        options={{
          title: "Профиль",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white"
        }}
      />
      <Stack.Screen
        
        name="Auth"
        children={this.createBottomTabs}
        options={{
          title: "Вход",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white"
        }}
      />
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{
          headerShown: true, 
          title: "Контакты",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white"
        }}
      />
      <Stack.Screen
        name="Washcard"
        component={Washcard}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>

  createDrawer = () =>
    <Drawer.Navigator
      drawerContent={(props:any) => 
      <CustomDrawerContent 
        {...props} />
    }>
      <Drawer.Screen 
        name="Map" 
        component={BaseMap} />
      <Drawer.Screen 
        name="LastCommets" 
        component={LastCommets}
        options={{ drawerLabel: 'Последние оценки'}} />
      <Drawer.Screen 
        name="Sale" 
        component={Sales}
        options={{ drawerLabel: 'Скидки'}} />
      <Drawer.Screen 
        name="Faq" 
        component={Faq} 
        options={{ drawerLabel: 'Вопрос-ответ'}}/>
      <Drawer.Screen 
        name="Contact" 
        children={this.createContactStack} 
        options={{ drawerLabel: 'Контакты'}}/>
    </Drawer.Navigator>

createBottomTabs = () => {
  return(
    <AuthTab.Navigator
    >
      <AuthTab.Screen
        name="LogIn"
        component={LogIn}
        options={{
          tabBarLabel: 'Вход',
        }}
      />
      <AuthTab.Screen name="SignUp" component={SignUp}
      
        options={{
          tabBarLabel: 'Регистрация',
        }}
      />
    </AuthTab.Navigator>
  )
}
 createContactStack = () =>
 <ContactStack.Navigator>
  <ContactStack.Screen name = "Contact" component ={Contact} options ={{ title: 'Помощь'}}/>
  <ContactStack.Screen name = "WriteUs" component ={WriteUs} options ={{ title: 'Написать нам'}}/>
  <ContactStack.Screen name = "Policy" component ={Policy} options ={{ title: 'Конфиденциальность'}}/>
  <ContactStack.Screen name = "EULA" component ={EULA} options ={{ title: 'Пользовательское соглашение'}}/>
</ContactStack.Navigator> 
  render() {
    if(!this.state.client) return <Text>loading...</Text>
    return (
      //@ts-ignore
      <ApolloProvider client={this.state.client}>
        <NavigationContainer>
          { this.createHomeStack() }
        </NavigationContainer>
      </ApolloProvider>
    );
  }
}