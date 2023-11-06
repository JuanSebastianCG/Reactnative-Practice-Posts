import { useState, useCallback } from "react";
import axios from "axios";

//export const basicEndpoint = "http://192.168.20.27:3001/api/v1"
//export const basicEndpoint = "https://apis-backend-dm.up.railway.app/api/v1";
//export const basicEndpoint = "http://192.168.120.52:3000/api/v1"

export const basicEndpoint = "http://mantenimientoandino.co:3000";
export const version = "/api/v1";

/* ============= POST ========= */
export function usePostData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = useCallback(async (url, formData, headers, onComplete = () => {}) => {
    try {
      setLoading(true);
      const response = await axios.post(url, formData, { headers });
      setData(response.data);
      onComplete(response.data);
    } catch (error) {
      setError(error);
      onComplete(null);
    } finally {
      setLoading(false);
    }
  });

  return { postData, loading, error, data };
}

/*  ============= GET ========= */
export function useGetData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getData = useCallback(
    async (especificUrl, onComplete = () => {}, headers = {}, body = null) => {
      const url = `${basicEndpoint}${version}${especificUrl}`;
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
      const url = `${basicEndpoint}${version}${especificUrl}`;

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
