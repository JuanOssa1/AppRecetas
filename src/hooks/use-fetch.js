import React from 'react';
import { useCallback, useState } from 'react';
//Porque todo lo tengo que mandar por un callback y no o puedo mandar como por un parametro en el ()
const useFetch = (applyData) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (config) => {
    let request = {};
    setLoading(true);
    setError(null);
    try {
      if (config.method === 'POST') {
        request = {
          method: config.method,
          body: JSON.stringify(config.body),
          headers: config.headers ? config.headers : {},
        };
      }
      if (config.method === 'GET') {
        request = { method: config.method };
      }
      const response = await fetch(config.url, request);
      if (!response.ok) {
        throw new Error('TRISTES NOTICIAS');
      }
      const data = await response.json();
      applyData(data);
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};
export default useFetch;
