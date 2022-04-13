// @flow

import {useState, useEffect} from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

interface Props {
  method: string;
  url: string;
  headers?: Object;
  params?: Object;
  data?: Object;
}

const useAxios = ({
  method,
  url,
  headers,
  params,
  data,
}: Props): {
  response: any,
  error: string,
  loading: boolean,
} => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);
  const fetchData = () => {
    axios({
      method,
      url,
      headers,
      params,
      data,
    })
      .then(res => {
        setResponse(res.data);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // custom hook returns value
  return {response, error, loading};
};

export default useAxios;
