import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "../css/slider-animations.css";

const NOW_PLAYING_SLIDER = gql`
  {
    nowPlaying {
      id
      title
      backdrop_path
    }
  }
`;

const Header = () => {
  const { loading, error, data } = useQuery(NOW_PLAYING_SLIDER);

  if (loading) {
    return false;
  }
  if (error) {
    return <p>Error</p>;
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
        {data.nowPlaying.slice(0, 4).map(m => (
          <div
            key={m.id}
            className="slider-item"
            style={{
              background: `linear-gradient(0deg, rgba(0,0,0,.9), rgba(0,0,0,.5)), url(${m.backdrop_path}) no-repeat center top / cover`
            }}
          >
            <header>
              <span>Now Playing</span>
              <h2>{m.title}</h2>
            </header>
          </div>
        ))}
      </Slider>
    </header>
  );
};

export default Header;
