/* eslint-disable prettier/prettier */
import {useState, useEffect} from 'react';
import axios from 'axios';
import {rootUrl} from '../constants/config';

const useFetch = (endpoint, method = 'GET') => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState(null);

  const options = {
    method: method,
    url: `${rootUrl}${endpoint}`,
  };
  const fetchData = async () => {
    setIsLoading(true);
    setErrorText(null);
    setData([]);
    try {
      const response = await axios.request(options);
      setData(response.data);
    } catch (error) {
      setErrorText(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log(`${rootUrl}${endpoint}`);
    fetchData();
  }, []);

  const reFetch = () => {
    fetchData();
  };
  return {data, setData, isLoading, errorText, reFetch};
};

export default useFetch;
