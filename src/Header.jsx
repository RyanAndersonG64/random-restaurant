import { Link } from "react-router-dom"

function Header() {
  return (
    <div className = 'navbar'>
      <Link to='/'>Home</Link>
      <Link to='/menu'>Menu</Link>
      <Link to='/about'>Info</Link>
    </div>
  )
}

export default Header