import * as Yup from 'yup';

export const validationSchemaSignUp = Yup.object().shape({
  email: Yup.string()
    .email('Не верный формат почты')
    .required('Обязательно'),
  login: Yup.string()
    .min(5, 'От 5 до 27 символов')
    .max(27, 'Очень длинный')
    .required('Обязательно'),
  password: Yup.string()
    .min(6, 'Короткий пароль')
    .max(27, 'Очень длинный')
    .required('Обязательно'),
  repeatpassword: Yup.string()
  .min(6, 'Too short password')
  .max(27, 'TОчень длинный')
  .required('Обязательно')
  .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
  region: Yup.object()
  .test('match', 'Нужно указать регион', function(value){
    console.log(`TEST :!!!!!!!!! ${value.id === 666}`)
      return value.id === 666 ?  false : true 
    })
});

export const validationSchemaLogin = Yup.object().shape({
  email: Yup.string()
    .email('Не верный формат почты')
    .required('Обязательно'),
  password: Yup.string()
    .min(6, 'Короткий пароль')
    .max(27, 'Очень длинный')
    .required('Обязательно'),
});
