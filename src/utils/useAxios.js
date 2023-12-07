import { useState, useCallback } from "react";
import axios from "axios";

//export const basicEndpointApi = "http://192.168.20.27:3001/api/v1"
//export const basicEndpointApi = "http://192.168.120.52:3000/api/v1"

//export const basicEndpointApi = ["https://apis-backend-dm.up.railway.app",""];
//export const basicEndpointApi = ["http://192.168.20.27:3001",""];
export const basicEndpointApi = ["http://192.168.0.3:3001"]
export const versionApi = ["/api/v1",""];
export const imageEndpointApi = [basicEndpointApi[0]+versionApi[0]];
//export const basicEndpointApi = "https://apis-backend-dm.up.railway.app";

/* ============= POST ========= */
export function usePostData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = useCallback(
    async (relativeUrl, formData, headers, onComplete = () => {},basiEndpointIndex = 0) => {
      const url = `${basicEndpointApi[basiEndpointIndex]}${versionApi[basiEndpointIndex]}${relativeUrl}`;
      /*  console.log("url", url);
    console.log("formData", formData);
    console.log("headers", headers); */
      try {
        setLoading(true);
        setError(null);
        console.log(formData)
        console.log(url);
        const response = await axios.post(url, formData, { headers });
        console.log("despues de axios")
        setData(response);
        onComplete(response);
      } catch (error) {
        console.error(error.response.data.errorBody, error);
        setError([error, error.response.data.errorBody]);
        onComplete(null);
      } finally {
        setLoading(false);
      }
    }
  );

  return { postData, loading, error, data };
}

/*  ============= GET ========= */
export function useGetData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getData = useCallback(
    async (relativeUrl, onComplete = () => {}, headers = {}, body = null,basiEndpointIndex = 0) => {


      const url = `${basicEndpointApi[basiEndpointIndex]}${versionApi[basiEndpointIndex]}${relativeUrl}`;
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
      } catch (error){

        console.error(error.response.data.errorBody, error);
        setError([error, error.response.data.errorBody]);

        onComplete(null);
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
    async (relativeUrl, onComplete = () => {}, headers = {}, body = null,basiEndpointIndex = 0) => {
      const url = `${basicEndpointApi[basiEndpointIndex]}${versionApi[basiEndpointIndex]}${relativeUrl}`;
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
        console.error(err.response.data.errorBody, err);
        setError([err, err.response.data.errorBody]);
        onComplete(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { deleteData, loading, error, data };

}

//========UPDATE================
export function useUpdateData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const updateData = useCallback(
    async (relativeUrl, formData, headers, onComplete = () => {},basiEndpointIndex = 0) => {
      const url = `${basicEndpointApi[basiEndpointIndex]}${versionApi[basiEndpointIndex]}${relativeUrl}`;

      try {
        setLoading(true);
        setError(null);
        const config = {
          headers,
        };
        console.log(formData)
        const response = await axios.put(url, formData, config);
        console.log("este es el response",response)
        setData(response.data);
        onComplete(response.data);
      } catch (error) {
        console.log("este es el error ",error.response.data)
        console.error(error.response.data.errorBody, error);
        setError([error, error.response.data.errorBody]);
        onComplete(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { updateData, loading, error, data };
}