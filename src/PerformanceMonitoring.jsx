import * as Sentry from '@sentry/react';

import { useEffect, useState } from 'react';
function PerformanceMonitoring() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   Sentry.startSpan(
  //     {
  //       name: 'Fetch Todo Data on Mount',
  //       op: 'http.client',
  //       attributes: {
  //         'http.method': 'GET',
  //         'http.url': 'https://jsonplaceholder.typicode.com/todos/1'
  //       }
  //     },
  //     async () => {
  //       console.log('Inside startSpan');
  //       setLoading(true);
  //       try {
  //         const response = await fetch(
  //           'https://jsonplaceholder.typicode.com/todos/1',
  //           { signal: controller.signal }
  //         );
  //         if (!response.ok) throw new Error('Network response was not ok');
  //         Sentry.setTag('http.status_code', response.status); // Add status code
  //         const result = await response.json();
  //         setData(result);
  //       } catch (err) {
  //         if (err.name === 'AbortError') return;
  //         Sentry.captureException(err);
  //         setError(`Failed to fetch data: ${err.message}`);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   );
  //   return () => {
  //     controller.abort();
  //   };
  // }, []);
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      console.log('Inside startSpan');
      setLoading(true);
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos/1'
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(`Failed to fetch data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'No data'}</div>
  );
}

export default PerformanceMonitoring;
