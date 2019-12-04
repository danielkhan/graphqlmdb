import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const ConfigContext = createContext();

const ConfigContextProvider = props => {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("/.netlify/functions/configuration").then(res => {
      setImages(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return false;
  }

  return (
    <ConfigContext.Provider value={images}>
      {props.children}
    </ConfigContext.Provider>
  );
};

export default ConfigContextProvider;
