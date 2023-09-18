import { useState, useEffect } from "react";
import axios from "axios";

export function useAxios(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const source = axios.CancelToken.source();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });

        setData(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Cancelled request");
        } else {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      source.cancel("Request canceled by user");
    };
  }, [url]);

  const handleCancelRequest = () => {
    source.cancel("Request canceled by user");
    setError("Cancelled Request");
  };

  return { data, loading, error, handleCancelRequest };
}
