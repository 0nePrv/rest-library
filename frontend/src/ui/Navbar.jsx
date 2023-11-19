import React from "react"
import {Link} from "react-router-dom";
import '../styles/navbar.css'

export const Navbar = () => {

  const routes = [
    {
      resource: 'book',
      name: 'Books'
    },
    {
      resource: 'author',
      name: 'Authors'
    },
    {
      resource: 'genre',
      name: 'Genres'
    }
  ];

  return (
      <nav className={"navbar"}>
        {routes.map(
            route =>
                <Link key={`${route.resource} route`}
                      className={"links"}
                      to={`/${route.resource}`}>
                  {route.name}
                </Link>
        )}
      </nav>
  )
}