import React, { useState, useEffect, useContext } from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "../css/slider-animations.css";

import { GenreContext } from "../contexts/GenreContext";
import { ConfigContext } from "../contexts/ConfigContext";

import Axios from "axios";

const Header = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading] = useState(true);

  const { images } = useContext(ConfigContext);
  const { genres } = useContext(GenreContext);

  useEffect(() => {
    Axios.get("/.netlify/functions/now_playing").then(res => {
      // fetch the first five movies
      setNowPlaying(res.data.results.slice(0, 5));
      setLoading(false);
    });
  }, []);

  const path = images.secure_base_url;
  const imgSize = images.backdrop_sizes[2];

  if (loading) {
    return false;
  }
  return (
    <header>
      <Slider
        // direction="vertical"
        // duration={2000}
        autoplay={3500}
        previousButton=""
        nextButton=""
      >
        {nowPlaying.map(m => (
          <div
            key={m.id}
            className="slider-item"
            style={{
              background: `linear-gradient(0deg, rgba(0,0,0,.9), rgba(0,0,0,.5)), url(${path}${imgSize}${
                m.backdrop_path
              }) no-repeat center top / cover`
            }}
          >
            <header>
              <span>Now Playing</span>
              <h2>{m.title}</h2>
              <ul className="genre-list">
                {m.genre_ids
                  .map(mg => genres.filter(g => g.id === mg).map(g => g.name))
                  .reduce((prev, next) => prev.concat(next))
                  .slice(0, 3)
                  .map((genre, i) => (
                    <li key={i}>{genre}</li>
                  ))}
              </ul>
            </header>
          </div>
        ))}
      </Slider>
    </header>
  );
};

export default Header;
