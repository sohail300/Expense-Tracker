import { useEffect, useState } from "react";
import baseURL from './config.js'
import axios from "axios";

const useFetchReq = () => {
  const [signedUp, setSignedUp] = useState(null);

  const api = axios.create({
    baseURL
  });

  async function getData() {
    const result = await api.get("/auth/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setSignedUp(result.data.id);
  }

  useEffect(() => {
    getData();
  }, []);

  return signedUp;
};

export default useFetchReq;
