import *  as React from 'react';
import { View,  StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import { Button, SocialIcon, Tooltip, Input, Icon as Ico } from 'react-native-elements';


import Icon  from 'react-native-vector-icons/FontAwesome';
import { validationSchemaLogin } from './../Core/validationSchema';
import { useLazyQuery } from 'react-apollo';
import { SET_LOG_IN, ME } from './../Core/graphql';
import { storeData, getData } from './../Core/asyncStore';
Icon.loadFont();

type ILognUpInputValues = {
  email: string
  password: string
}
const LogIn =({navigation}:any) =>{

  const [inputValues, setInputValues] = React.useState<ILognUpInputValues>({ email: '', password:'' })  
  const [getUser, { loading, error, data,  }] = useLazyQuery(SET_LOG_IN,{ fetchPolicy: "network-only" })
  const [getMe, opt] = useLazyQuery(ME,{ fetchPolicy: "network-only" })

  
  React.useEffect( ()=>{
    if(data){
        const token =  data.signin.token
         storeData('token', token).then(()=>{
           console.log('\n afer save token in async store')
           console.log(token)
           getMe()
           navigation.navigate('Map')
         })
        }
  },[data])


 const id="divs"
  return(
    
 <View style ={styled.container} key= {id}>
  <Formik
    initialValues={inputValues}
    validateOnChange={true}
    validationSchema = {validationSchemaLogin}
    onSubmit={ 
      async (values) => {
        async function af(){
          getUser({
            variables: { 
              id,
              email: values.email, 
              password: values.password 
            }
          })
        }
        await af().then( ()=>{
          console.log('get user ушел')
        })
      }
    }
  >
  {({ handleChange, handleBlur, handleSubmit, values,isSubmitting,isValid,touched,errors }) => (
    <View>
      <Input
        placeholder='@email'
        keyboardType= 'email-address'
        returnKeyType= 'done'
        inputContainerStyle={styled.input}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        value={values.email}
        inputStyle={styled.inputText}
        rightIcon = {
          errors.email && touched.email ? 
          <Tooltip popover ={<Text style = {{ color: '#fff' , fontSize: 16}}>{errors.email}</Text> } >
            <Ico name = 'error-outline' size={28} color = 'red' /> 
          </Tooltip>: false
        }
      />
      <Input
        placeholder = 'Пароль'
        secureTextEntry = {true}
        returnKeyType= 'done'
        inputContainerStyle={styled.input}
        inputStyle={styled.inputText}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        value={values.password}
        rightIcon = {
          errors.password && touched.password ? 
          <Tooltip popover ={<Text style = {{ color: '#fff' , fontSize: 16}}>{errors.password}</Text> } >
            <Ico name = 'error-outline' size={28} color = 'red' /> 
          </Tooltip>: false
        }
      />

      <Button 
        onPress={handleSubmit} 
        loading = { isSubmitting }
        disabled ={!isValid}
        disabledStyle={ { backgroundColor: 'rgba(146,146,146, .6)'}}
        title="Вход"  
        buttonStyle= {{backgroundColor: 'black', marginBottom:20}}
        style ={{ 
          marginTop: 40,
          alignSelf:"center",
          width: 150,
          zIndex: 100   
      }}
      />
      <Text style ={styled.orlogin}>Или войти с помощью</Text>
      <View style={{flexDirection: 'row'}}>
      <SocialIcon
        onPress = {
          () =>{ console.log(getData('token')) }
        }
        title='Вконтакте'
        button
        type='vk'
        style={{width:140}}
      />
      <SocialIcon
        title='Google'
        button
        type='google'
        style={{width:140}}
      />
      </View>
    </View>
  )}
</Formik>
</View>
  )
}
const styled = StyleSheet.create({
  container:{ 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: "center"
  },
  image:{
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  input:{
    justifyContent:'center',
    alignSelf:'center',
    margin: 13, 
    height: 50, 
    borderColor: 'gray', 
    borderWidth: 1, 
    padding:10, 
    width: 280,
    borderRadius: 15
  },
  inputText:{
    fontSize: 17,
  },
  orlogin:{ 
    fontSize: 18, 
    margin: 20, 
    alignSelf:"center", 
    width: 200
  },

})
export default LogIn



