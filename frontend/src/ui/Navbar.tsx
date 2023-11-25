import React from "react"
import {Link} from "react-router-dom";
import '../styles/navbar.css'
import {navBarRoutesConfigs} from "../routing/config"

export const Navbar = () => {

  return (
      <nav className={"navbar"}>
        {navBarRoutesConfigs.map(
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