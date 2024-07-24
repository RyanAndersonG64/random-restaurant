import { Link } from "react-router-dom"

function Header() {
  return (
    <div className = 'navbar'>
      <h5 id = 'nav'>        
      <Link to='/app'>Home</Link>
      <Link to='/about'>About</Link>
      <Link to='/menu'>Menu</Link>
      <Link to='/allergeninfo'>Allergen-free Menu</Link>
      <Link to='/orderscreen'>Order</Link>
      </h5>
    </div>
  )
}

export default Header