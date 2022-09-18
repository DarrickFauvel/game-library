import { Link } from "react-router-dom"
import NavTop from "./NavTop"

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">Game Library</h1>
      <NavTop />
    </header>
  )
}

export default Header
