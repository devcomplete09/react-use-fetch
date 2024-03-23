import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        setIsFetching(true);
        const resultJSON = await fetch(url);
        if (!resultJSON.ok) {
          throw new Error(`Error while searching. Url that's failing: ${resultJSON.url}`);
        }

        const result = await resultJSON.json();
        setData(result);
        setIsFetching(false);
      } catch (error) {
        setError(error.message);
        setIsFetching(false);
      }
    };

    run();
  }, [url]);

  return {
    data,
    error,
    isFetching
  };
};

export default useFetch;