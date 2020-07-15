import React from 'react';
import { View, Text, SafeAreaView, Image, FlatList, StyleSheet} from 'react-native';
import { CONTACT_MENU, CONTACT_MENU_TYPE} from './../Core/data';
import { ListItem, Icon } from 'react-native-elements';
import Icone from 'react-native-vector-icons/MaterialIcons';
import Ionic from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import { ShareApp } from './../Core/shareFunc';
//import AboutAppModal from './AboutAppModal';
Icone.loadFont();
Ionic.loadFont();

type ContactProps = {
  navigation:any
}

class Contact extends React.Component<ContactProps> {
  constructor(props:ContactProps) {
    super(props);
    this.onPressmethod = this.onPressmethod.bind(this)
    this.state={
      showMailUsModal:false
    }
}

 onPressmethod = ( item:CONTACT_MENU_TYPE ) =>{
   if(item.screen !==null ){
    return ( this.props.navigation.navigate(item.screen))
   }
   else if(item.action !== null){
     switch(item.action){
       case "share" : 
       ShareApp('On Wash App','Посмотри какое приложение в appleStore', 'https//localhost' )
       default: return null
     }
   }
 }


  render(){
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
          <Text style={{fontSize: 12, fontWeight: '200', alignSelf:'center', marginTop:5, marginBottom: 60}}>версия 0.0.1</Text> 
        </View>
        <ListItem
          title = 'Написать о проблеме'
          onPress = {()=>this.setState({showMailUsModal: true})}
          chevron 
          style = {{marginBottom: 20}}  
          leftIcon={
            <Icon   
              type = "FontAwesome"
              name = 'send'
          />
          }
        />
        <Text style={{margin:15}}>Полезная информация</Text>
        <View style = {{flex:1}}>
        <FlatList
          style ={{ flex:1}}
          data={CONTACT_MENU}
          renderItem={({item, index}) => (
            <ListItem
              onPress = { () => this.onPressmethod(item) }
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
        {/* <AboutAppModal modal = {modal} setModal = {setModal}/> */}
        </ScrollView>
      </SafeAreaView>
    );
  }
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