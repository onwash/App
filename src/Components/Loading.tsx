import * as React from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native'


export interface ILoadingProps {
}

export default function Loading (props: ILoadingProps) {
  return (
    <View style = {styles.loadingview}>
      <ActivityIndicator size='large' color='#512DA8' />
      <Text style={styles.loadingtext}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingview:{
    alignContent:"center",
    alignItems:'center',
    justifyContent: "center",
    flex:1,
  },
  loadingtext:{
    color:'#512DA8',
    fontSize: 14,
    fontWeight: 'bold'
  }
})