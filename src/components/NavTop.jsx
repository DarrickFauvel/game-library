import { Link } from 'react-router-dom'

const NavTop = () => {
  return (
    <div className='navbar container border-bottom'>
      <nav className='nav'>
        <div className='nav-item'>
          <Link to='/' className='nav-link active' aria-current='page'>
            Home
          </Link>
        </div>
        <div className='nav-item'>
          <Link to='/add' className='nav-link'>
            Add game
          </Link>
        </div>
        <div className='nav-item'>
          <Link to='/search-bgg' className='nav-link'>
            Search BGG
          </Link>
        </div>
        <div className='nav-item'>
          <Link to='/about' className='nav-link'>
            About
          </Link>
        </div>
      </nav>

      <nav className='nav'>
        <div className='nav-item'>
          <Link to='/login' className='nav-link active' aria-current='page'>
            <button>Login</button>
          </Link>
        </div>
        <div className='nav-item'>
          <Link to='/register' className='nav-link'>
            <button>Register</button>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default NavTop
