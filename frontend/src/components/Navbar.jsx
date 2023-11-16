import {Link} from "react-router-dom";
import './navbar.css'

export const Navbar = ({props : routes}) => {
  return (
      <nav className={"navbar"}>
        {routes.map(
            route =>
                <Link className={"links"} to={`/${route.resource}`}>{route.name}</Link>
        )}
      </nav>
  )
}