import { Link } from "react-router-dom"

function Header() {
  return (
    <div className = 'navbar'>
      <h5 id = 'nav'>
      <Link to='/'>Home</Link>
      <Link to='/menu'>Menu</Link>
      <Link to='/about'>Info</Link>
      </h5>
    </div>
  )
}

export default Header