import { useState, useCallback } from "react";
import axios from "axios";

export function usePostData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = useCallback(async (url, headers = {}, body = null, onComplete = () => {}) => {

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(url, body, { headers });
      setData(response.data);
      onComplete(response.data); 
    } catch (err) {
      setError(err);
      onComplete(null);

    } finally {
      setLoading(false);
    }
  }, []);

  return { postData, loading, error,data};
}


export function useGetData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null); 

  const getData = useCallback(async (url,  onComplete = () => {}, headers = {}, body = null) => {
    try {
      setLoading(true);
      setError(null);

      const config = {
        headers,
        data: body, 
      };

      const response = await axios.get(url, config);
      setData(response.data);

      onComplete(response.data); 
    } catch (err) {
      console.error("Error making GET request:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { getData, loading, error,data};
}
