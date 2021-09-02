import { useEffect, useRef, useState } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useFetch = (url) => {
  const isMounted = useRef(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    isMounted.current = true;

    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        if (response.ok) {
          const json = await response.json();
          if (isMounted.current) setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        if (isMounted.current) setError(e);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }
    init();
    return () => {
      isMounted.current = false;
    };
  }, [url]);

  return { data, error, loading };
};
export default useFetch;

export function Fetch({ url, render }) {
  const { data, loading, error } = useFetch(url);
  return render(data, loading, error);
}
