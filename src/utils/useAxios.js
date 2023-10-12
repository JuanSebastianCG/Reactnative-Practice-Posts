import { useState, useCallback } from "react";
import axios from "axios";

export function usePostData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = useCallback(async (url, headers = {}, body = null, onComplete = () => {}) => {

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(url, body, { headers });
      onComplete(response.data); // Llama a la funFción onComplete con los datos de respuesta.
    } catch (err) {
      setError(err);
      onComplete(null);

    } finally {
      setLoading(false);
    }
  }, []);

  return { postData, loading, error };
}


export function useGetData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = useCallback(async (url, headers = {}, body = null, onComplete = () => {}) => {
    try {
      setLoading(true);
      setError(null);
      console.log("GET Request:", url);

      const config = {
        headers,
        data: body, // Incluye el cuerpo de la solicitud si se proporciona
      };

      const response = await axios.get(url, config);
      console.log("GET Response:", response.data);

      onComplete(response.data); // Llama a la función onComplete con los datos de respuesta.
    } catch (err) {
      console.error("Error making GET request:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { getData, loading, error };
}
