import React from 'react';
import { useCallback, useState } from 'react';
//Porque todo lo tengo que mandar por un callback y no o puedo mandar como por un parametro en el ()
const useFetch = (applyData) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (config) => {
    const { method } = config;
    let request = {};
    setLoading(true);
    setError(null);
    try {
      if (method === 'POST') {
        request = {
          method,
          body: JSON.stringify(config.body),
          headers: config.headers ? config.headers : {},
        };
      }
      if (method === 'GET') {
        request = { method };
      }
      const response = await fetch(config.url, request);
      if (!response.ok) {
        throw new Error('TRISTES NOTICIAS');
      }
      const data = await response.json();
      //console.log(data);
      let dataArray = [];
      //let dataArray = Object.values(data);
      for (const iterator in data) {
        dataArray.push(data[iterator]);
      }
      //console.log(dataArray);
      console.log(config);
      const theFilter = (filter) => {
        if (filter.byCategory !== 'all') {
          dataArray = dataArray.filter((recipe) => {
            return recipe.category === filter.byCategory;
          });
        }
        if (filter.byTime !== 'any') {
          dataArray = dataArray.filter((recipe) => {
            return recipe.time === filter.byTime;
          });
        }
      };
      if (config.filter) {
        theFilter(config.filter);
      }
      //console.log(dataArray);
      applyData(dataArray);
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
