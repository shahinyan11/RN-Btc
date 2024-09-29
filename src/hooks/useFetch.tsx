import React, {useEffect, useState} from 'react';

import Api from '@api';

export default function useFetch<T>(config: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null as T);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const {data: fetchedData} = await Api(JSON.parse(config));

        setData(fetchedData);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [config]);

  return {loading, data, error};
}
