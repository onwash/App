import 'react-native-gesture-handler' //не удалять

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { setContext } from "apollo-link-context";
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { GRAPHQL_URL,apolloClientOptions } from './src/Core/makeApolloClient';

import { getData } from './src/Core/asyncStore';

import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();

import { createHomeStack } from './src/Navigator/Home';




export default function App(){
  const [client, setClient] = React.useState<any>(null);
  const [isLoadingComplete, setLoadingComplete] = React.useState<boolean>(false);

  const makeApolloClient = async () => {
    try {
      const cache = new InMemoryCache();
      cache.reset()
      cache.writeData({
        data: {
          defaultRegion: {
            __typename: 'defaultRegion',
            id: 666,
            name: 'Выбрать Регион',
            latitude: 0, 
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0,
          }
        },
      })
      let httpLink = createUploadLink({
        uri: GRAPHQL_URL as string,
      });
      let authLink = setContext(async (_: any, { headers }: any) => {
        console.log('tetetetetet')
        const token = await getData("token");
        return {
          headers: {
            ...headers,
            app: `onwaShapp`,
            authorization: token ? `JWT ${token}` : "",
          },
        };
      });
      const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache,
        ...apolloClientOptions,
      });
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };

// const loadResourcesAsync = async () => {
//   await Asset.loadAsync([]);
// };
const handleLoadingError = (error:any) => {
  console.warn(error);
};
const handleFinishLoading = () => {
  setLoadingComplete(true);
};

React.useEffect(() => {
  makeApolloClient();
}, []);

//переделать в компонент загрузки
(function(){
  setTimeout(() => {
    handleFinishLoading()
  }, 5000);
})()
//переделать в компонент загрузки 
if (isLoadingComplete && client !== null) {
  return (
    <ApolloProvider client={client}>
        <NavigationContainer>
          { createHomeStack() }
        </NavigationContainer>
    </ApolloProvider>
  );
} else {
    return (
      // <AppLoading
      //   startAsync={loadResourcesAsync}
      //   onError={handleLoadingError}
      //   onFinish={() => handleFinishLoading()}
      // />
      <View style = {{ flex:1, justifyContent:'center', alignItems:'center'}}><Text>Loading ...</Text></View>
    )
  }
}