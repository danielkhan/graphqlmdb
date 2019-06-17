import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const GenreContext = createContext();

const GenreContextProvider = props => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("/.netlify/functions/genres").then(res => {
      setGenres(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return false;
  }

  return (
    <GenreContext.Provider value={genres}>
      {props.children}
    </GenreContext.Provider>
  );
};

export default GenreContextProvider;
