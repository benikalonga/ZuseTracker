import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useStorage(initState, key) {
  const [value, setValue] = useState({});

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then(s => {
        setValue(s ? JSON.parse(s) : initState);
      })
      .catch(() => setValue(initState));
  }, [key]);

  useEffect(() => {
    AsyncStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
