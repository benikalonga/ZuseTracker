import {useState, useEffect} from 'react';
import axios from 'axios';
import {googleApiKey} from '../constants/config';

export const useGeoCoding = (
  location,
  initialText = 'Getting your position...',
) => {
  const {latitude, longitude} = location;
  const [address, setAddress] = useState(initialText);
  const [rawData, setRawData] = useState(null);

  useEffect(() => {
    const reverseGeocode = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}`,
        );
        const results = response.data.results;
        if (results.length > 0) {
          setRawData(results[0].address_components);
          setAddress(results[0].formatted_address);
        }
      } catch (error) {
        setAddress('no address found');
      }
    };

    reverseGeocode();
  }, [latitude, longitude]);

  return [address, setAddress, rawData];
};
