import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import DrawerProfile from './../Components/DrawerProfile';
//import {BaseMap} from './../screens/BaseMap_copy';
import BaseMap from './../screens/BaseMap';
import LogIn from './../screens/Login';
import SignUp from './../screens/Signup';
import UserProfile from './../screens/UserProfile';
import Contact from './../screens/Contacts';
import WriteUs from './../screens/WriteUs';
import Policy from './../screens/Policy';
import {Washcard} from './../screens/Washcard';

///screens
export function Settings(props: any) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings</Text>
    </View>
  );
}

function Faq(props: any) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Вопрос ответ</Text>
    </View>
  );
}
function Sales(props: any) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Акции</Text>
    </View>
  );
}
function LastCommets(props: any) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Последние комментарии</Text>
    </View>
  );
}
function EULA() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>EULA Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Article Screen</Text>
    </View>
  );
}
//screens

const Stack = createStackNavigator();
const ContactStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const AuthTab = createBottomTabNavigator();

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerProfile {...props} />
      <DrawerItemList {...props} />
      {/* <DrawerItem label="Ссылка" onPress={() => Alert.alert('Link to help')} /> */}
    </DrawerContentScrollView>
  );
};

export const createHomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Map"
      options={{
        headerShown: false,
        title: 'Карта',
      }}
      children={createDrawer}
    />
    <Stack.Screen
      name="UserProfile"
      component={UserProfile}
      options={{
        title: 'Профиль',
        headerStyle: {backgroundColor: 'black'},
        headerTintColor: 'white',
      }}
    />
    <Stack.Screen
      name="Auth"
      children={createBottomTabs}
      options={{
        title: 'Вход',
        headerStyle: {backgroundColor: 'black'},
        headerTintColor: 'white',
      }}
    />
    <Stack.Screen
      name="Contact"
      component={Contact}
      options={{
        headerShown: true,
        title: 'Контакты',
        headerStyle: {backgroundColor: 'black'},
        headerTintColor: 'white',
      }}
    />
    <Stack.Screen
      name="Washcard"
      component={Washcard}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const createDrawer = () => (
  <Drawer.Navigator
    drawerContent={(props: any) => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Map" component={BaseMap} />
    <Drawer.Screen
      name="LastCommets"
      component={LastCommets}
      options={{drawerLabel: 'Последние оценки'}}
    />
    <Drawer.Screen
      name="Sale"
      component={Sales}
      options={{drawerLabel: 'Скидки'}}
    />
    <Drawer.Screen
      name="Faq"
      component={Faq}
      options={{drawerLabel: 'Вопрос-ответ'}}
    />
    <Drawer.Screen
      name="Contact"
      children={createContactStack}
      options={{drawerLabel: 'Контакты'}}
    />
  </Drawer.Navigator>
);

const createBottomTabs = () => {
  return (
    <AuthTab.Navigator>
      <AuthTab.Screen
        name="LogIn"
        component={LogIn}
        options={{
          tabBarLabel: 'Вход',
        }}
      />
      <AuthTab.Screen
        name="SignUp"
        component={SignUp}
        options={{
          tabBarLabel: 'Регистрация',
        }}
      />
    </AuthTab.Navigator>
  );
};
const createContactStack = () => (
  <ContactStack.Navigator>
    <ContactStack.Screen
      name="Contact"
      component={Contact}
      options={{title: 'Помощь'}}
    />
    <ContactStack.Screen
      name="WriteUs"
      component={WriteUs}
      options={{title: 'Написать нам'}}
    />
    <ContactStack.Screen
      name="Policy"
      component={Policy}
      options={{title: 'Конфиденциальность'}}
    />
    <ContactStack.Screen
      name="EULA"
      component={EULA}
      options={{title: 'Пользовательское соглашение'}}
    />
  </ContactStack.Navigator>
);
