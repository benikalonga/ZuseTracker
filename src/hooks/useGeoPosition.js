import {useState, useEffect} from 'react';
import axios from 'axios';
import {googleApiKey} from '../constants/config';

export const useGeoCoding = (initialText = 'Your position') => {
  const [address, setAddress] = useState(initialText);

  useEffect(() => {}, []);

  return [address, setAddress];
};
