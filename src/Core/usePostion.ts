import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';


// TODO: написать 'watch на дельте измененй геопозиции а не буле"
const defaultSettings = {
  enableHighAccuracy: false,
  timeout: 900000,
  maximumAge: 0,
};
type usePositionOut = {
  latitude: number
  longitude: number 
  timestamp?: number
  accuracy?: number
  error?: string | null | any
}
export const usePosition = (watch = true, options = defaultSettings):usePositionOut => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState<null | string>(null);

  const onChange =  ({coords, timestamp}:any) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      timestamp,
    });
  };

  const onError = (error:any) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = Geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }

    let watcher:any = null;
    if (watch) {
      watcher = geo.watchPosition(onChange, onError, options);
    } else {
      geo.getCurrentPosition(onChange, onError, options);
    }

    return  () => watcher && geo.clearWatch(watcher);
  }, [options]);

  return { ...position, error};
};
