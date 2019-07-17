import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="hero">
      <div className="container">
        <div className="hero-wrapper">
          <div>
            <p>Discover new movies and see what others recommend</p>
            <Link to="/movies" className="btn btn--mobile btn--desktop">
              Discover
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
