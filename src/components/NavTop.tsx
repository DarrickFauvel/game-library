import { Link } from "react-router-dom"
import "./NavTop.css"

const NavTop = () => {
  return (
    <nav className="nav-top">
      <Link to="/" className="nav-top__link">
        Home
      </Link>
      <Link to="/add" className="nav-top__link">
        Add game
      </Link>
    </nav>
  )
}

export default NavTop
