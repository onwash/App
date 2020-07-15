import * as React from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';

export interface IMyLocationProps {
  myLocation:{
    latitude:number
    longitude:number
  }
}

 const MyLocation:React.FC<IMyLocationProps> =  (props) => {
  const [curLoca, setCurLoc] = React.useState()

  React.useEffect(()=>{
    if(props !== curLoca){
      console.log(`MChange mylocal ${props.myLocation.latitude}`)
      setCurLoc(props)
    }
    else return
  }, [props] )

  return(
    <View>
      <Marker
      image = {require('../assets/105392.png')}
      coordinate={{
        latitude: props.myLocation.latitude,
        longitude: props.myLocation.longitude,
      }}
      title={'gum'}
      description={'holla!'}
    />
    </View>
  )
}
export default MyLocation
