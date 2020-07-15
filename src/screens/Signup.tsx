import *  as React from 'react'
import { View, StyleSheet, Text, useWindowDimensions} from 'react-native'
import { Formik } from 'formik'
import { Button, Icon, Input, Tooltip } from 'react-native-elements'
import { Colors } from './../Components/Colors'
import { useRoute } from '@react-navigation/native'
import  { validationSchemaSignUp } from './../Core/validationSchema'
import { RegionSelect } from './../Components/RegionSelect'
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { graphql } from 'react-apollo'
import  {compose} from 'recompose'
import  { GET_REGIONS_DEFAULT, SET_SIGN_UP, GET_REGIONS } from './../Core/graphql'
import { ISignUpInputValues, IRegion } from './../types';
 

interface ISignUp {
  defaultRegion: IRegion
  navigation: any
}



const SignUp:React.FC<ISignUp> = ({defaultRegion, navigation}) => {
  const { width } = useWindowDimensions()
  const [signup] = useMutation(SET_SIGN_UP)
  const [modalVisible, setModalVisible] = React.useState(false)
  const [regionValue, setRegionValue] = React.useState(defaultRegion)
  const [regions, setRegions] = React.useState([])
  const { loading, error, data } = useQuery(GET_REGIONS)
  const [inputValues, setInputValues] = React.useState<ISignUpInputValues>({
    email: '' ,
    login: '',
    region:regionValue ,
    //phonenumber: 7,
    password: '',
    repeatpassword: '',
  })
  React.useEffect(() => {
    if(data && data.getRegions) {
      setRegions(data.getRegions);
    }
  }, [data])
  
return(
 <View  style ={styled.container}>
  <View style ={{flex: 1}}/>
  <View style = {{flex: 7, paddingTop: 50}}>
  <Formik
    initialValues={inputValues}
    validateOnChange={true}
    validationSchema={validationSchemaSignUp}
    onSubmit={ 
      async (values: ISignUpInputValues, actions) => {
        try {
        actions.setSubmitting(true)
         await signup({ variables: {
           userInput:{
            email: values.email,
            login: values.login,
            password: values.password,
            region: regionValue.id
           }
          }})
          .then(()=> actions.setSubmitting(false))
        } catch (error) {
          actions.setSubmitting(false)
          console.error(error.networkError.result.errors)
        }
 
      } 
    }
  >
  {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid,isSubmitting, setFieldValue }) => (
    <View>
      {console.log(values.region)}
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
            <Icon name = 'error-outline' size={28} color = 'red' /> 
          </Tooltip>: false
        }
      />
      <Input
        placeholder='Логин (имя)'
        keyboardType= 'default'
        returnKeyType= 'done'
        inputContainerStyle={styled.input}
        onChangeText={handleChange('login')}
        onBlur={handleBlur('login')}
        value={values.login}
        inputStyle={styled.inputText}
        rightIcon = {
          errors.login && touched.login? 
          <Tooltip popover ={
           <Text style = {{ color: '#fff' , fontSize: 16}}>{errors.login}</Text> 
          }>
            <Icon name = 'error-outline' size={28} color = 'red' /> 
          </Tooltip>: false
        }
      />
      {/* <TextInput
        placeholder='Контактный телефон'
        keyboardType= 'number-pad'
        borderRadius = {15}
        returnKeyType= 'done'
        style={styled.input}
        onChangeText={handleChange('phonenumber')}
        onBlur={handleBlur('phonenumber')}
        value={values.phonenumber}
      /> */}
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
            <Icon name = 'error-outline' size={28} color = 'red' /> 
          </Tooltip>: false
        }
      />
      <Input
        placeholder = 'Повторить пароль'
        secureTextEntry = {true}
        returnKeyType= 'done'
        inputContainerStyle={styled.input}
        inputStyle={styled.inputText}
        onChangeText={handleChange('repeatpassword')}
        onBlur={handleBlur('repeatpassword')}
        value={values.repeatpassword}
        rightIcon = {
          errors.repeatpassword && touched.repeatpassword ? 
          <Tooltip popover ={<Text style = {{ color: '#fff' , fontSize: 16}}>{errors.repeatpassword}</Text> } >
            <Icon name = 'error-outline' size={28} color = 'red' /> 
          </Tooltip>: false
        }
      />

      <TouchableHighlight
      
        style={{display:'flex',flexDirection: 'row'}}
        onPress={ () => setModalVisible(!modalVisible) }
      >
        <Input
            onChangeText={handleChange('region')}
            onBlur={handleBlur('region')}
            inputContainerStyle={styled.input}
            inputStyle={styled.inputText}
            value={regionValue.name}
            editable={false}
            rightIcon = {
              <Icon 
                name = 'menu' 
                color = { errors.region && touched.region ? 'red': 'black' }
              />}
          />
    </TouchableHighlight>

    <RegionSelect 
      modalVisible={modalVisible} 
      setModalVisible ={setModalVisible}
      regions={regions}
      setRegionValue={setRegionValue}
      regionValue={regionValue}
      setFieldValue = { setFieldValue }
      
    />

      <Button 
        onPress={handleSubmit} 
        loading = { isSubmitting }
        disabled ={!isValid}
        disabledStyle={ { backgroundColor: 'rgba(146,146,146, .6)'}}
        title="Регистрация"  
        buttonStyle= {{backgroundColor: 'black', marginBottom:20}}
        style ={{ 
          marginTop: 10,
          marginLeft:width/3.1,
          width: 150,
          zIndex: 100   
      }}
      />
    </View>
  )}
</Formik>
</View>
  <View style = {{padding:10, flex:1, justifyContent: 'flex-end'}}>
    <Text style ={{textAlign:'center'}}>
      Зарегистрировавшись в мобильном приложении Вы соглашаетесь с условиями 
      <Text style={{color:Colors.themeblue}}
      onPress={()=>navigation.navigate('Policy')}> Пользовательского соглашения
      </Text> и 
    <Text style={{color:Colors.themeblue}}
    onPress={()=>navigation.navigate('EULA')}> Политики конфиденциальности</Text>
    </Text>
  </View> 
</View>
  )
}
const styled = StyleSheet.create({
  container:{ 
    flex:1,
    flexDirection: 'column'
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
  }
})

export default compose(
  graphql(GET_REGIONS_DEFAULT, { 
    props: (  { data: { defaultRegion } }) => ({
      defaultRegion,
    })
   }
  ),
  )(SignUp)



