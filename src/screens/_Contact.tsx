import React from 'react';
import { View, Text, SafeAreaView, Image, FlatList, StyleSheet} from 'react-native';
import { CONTACT_MENU} from './../Core/data';
import { ListItem, Icon } from 'react-native-elements';
import Icone from 'react-native-vector-icons/MaterialIcons';
import Ionic from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import AboutAppModal from './AboutAppModal';
Icone.loadFont();
Ionic.loadFont();


const Contact = (props:any)=>{
  const { navigation } = props
  const [modal, setModal] = React.useState(false)

  return (
    <SafeAreaView style ={styled.container}>
      <ScrollView>
      <View style={styled.logo}>
        <Image
          style = {styled.logo_image}
          source={require('./../assets/onwashrus.png')}/>
      </View>
      <View style={styled.logo_text}>
        <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf:'center'}}>На мойке</Text>
        <Text style={{fontSize: 12, fontWeight: '200', alignSelf:'center', marginTop:5, marginBottom: 20}}>версия 0.0.1</Text> 
      </View>
      <View style = {{flex:1}}>
      <FlatList
        style ={{ flex:1}}
        data={CONTACT_MENU}
        renderItem={({item, index}) => (
          <ListItem
            onPress= {item.action}
            chevron
            key={index}
            leftIcon={
              <Icon   
                type = "FontAwesome"
                name = {item.icon}
              />
            }
            bottomDivider
            title={item.title}
          />
        )}
      />
      </View>
      <AboutAppModal modal = {modal} setModal = {setModal}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styled = StyleSheet.create({
  container:{
    flex:1, 
    backgroundColor: 'aliceblue'
  },
  logo:{ 
    flexDirection:'column',
    marginTop: 30, 
    justifyContent:"center", 
    alignSelf:"center"
  },
  logo_image:{
    width: 80, 
    resizeMode: 'stretch', 
    height: 110
},
  logo_text:{
    marginTop:10,
    flexDirection:'column',
    width: 110,
    justifyContent:"center", 
    alignSelf:"center"
  }

})
export default Contact