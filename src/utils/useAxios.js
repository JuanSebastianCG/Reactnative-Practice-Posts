import { useState, useCallback } from "react";
import axios from "axios";

//export const basicEndpoint = "https://apis-backend-dm.up.railway.app/api/v1";
//export const basicEndpoint = "http://192.168.20.27:3001/api/v1"
export const basicEndpoint = "https://apis-backend-dm.up.railway.app/api/v1"

/* ============= POST ========= */
export function usePostData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = useCallback(
    async (especificUrl, headers = {}, body = null, onComplete = () => {}) => {
      const url = `${basicEndpoint}${especificUrl}`;
      try {
        setLoading(true);
        setError(null);
        const response = await axios.post(url, body, { headers });
        /* console.log("respuesta", response.data) */
        setData(response); 
        onComplete(response); 
      } catch (err) {
        console.log("error desde axios:",err)
        setError(err);
        onComplete(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { postData, loading, error, data };
}

/*  ============= GET ========= */
export function useGetData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getData = useCallback(
    async (especificUrl, onComplete = () => {}, headers = {}, body = null) => {
      const url = `${basicEndpoint}${especificUrl}`;
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
    },
    []
  );

  return { getData, loading, error, data };
}

/*  ============= DELETE ========= */
export function useDeleteData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const deleteData = useCallback(
    async (especificUrl, onComplete = () => {}, headers = {}, body = null) => {
      const url = `${basicEndpoint}${especificUrl}`;

      try {
        setLoading(true);
        setError(null);

        const config = {
          headers,
          data: body,
        };
        const response = await axios.delete(url, config);
        setData(response.data);

        onComplete(response.data);
      } catch (err) {
        console.error("Error making GET request:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { deleteData, loading, error, data };
}
