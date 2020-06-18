import React, { useContext, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import LogoWhite from '../../assets/images/LogoWhite.png';
import cart from '../../assets/images/cart.png';
import CartDropDown from "./CartDropdown"

const Navbar = () => {
  const { shoppingCart } = useContext(AppContext);

  const [toggleCart, setToggleCart] = useState(false)

  const cartCount = Object.values(shoppingCart).reduce(
    (acc, item) => acc + item.count,
    0
  );
  return (
    <div>
      <header className="navbar">
        <div className="navbar-left">
          <div className="nav-items">
            <Link to="/">
              <div className="logo-white">
                <img src={LogoWhite} alt="logo"></img>
              </div>
            </Link>
            <Link to="/produce">
              <div className="navbar__item_left">Produce</div>
            </Link>
            <Link to="/farms">
              <div className="navbar__item_left">Farms</div>
            </Link>
            <Link to="/community">
              <div className="navbar__item_left">Community</div>
            </Link>
          </div>
        </div>
        <div className="navbar-right">
          <div className="nav-items">
            <Link to="/help">
              <div className="navbar__item">Help</div>
            </Link>
            <Link to="/account">
              <div className="navbar__item">Account</div>
            </Link>
            <Link to="#">
              <div onClick={()=> setToggleCart(!toggleCart)} className="navbar__item">
                <img src={cart}></img>
                <span>{cartCount || ''}</span>
              </div>
            </Link>
          </div>
        </div>
      </header>
      {
        toggleCart ? 
        <div className="cart-dropdown">
          <CartDropDown/>
        </div>
         : null
      }
    </div>
  );
};
export default Navbar;
