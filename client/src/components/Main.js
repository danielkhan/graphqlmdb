import React from "react";
import { NavLink, Route } from "react-router-dom";
import Movie from "./Movie";

const Main = () => {
  return (
    <main className="home-main">
      <ul className="nav">
        <li className="nav__item">
          <NavLink activeClassName="active-link" to={`/movies/in-theaters`}>
            In Theaters
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink activeClassName="active-link" to={`/movies/coming-soon`}>
            Coming Soon
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink activeClassName="active-link" to={`/movies/popular`}>
            Popular
          </NavLink>
        </li>
      </ul>
      <section className="flex">
        <Route path="/movies/:topic" component={Movie} />
      </section>
    </main>
  );
};

export default Main;
