import React from "react";
import logo from "../assets/logo1.png";
import cart_icon from "../assets/cart_icon.png";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import SearchInput from "../Form/SearchInput.js";
import { Badge } from "antd";
import { TbWorldHeart } from "react-icons/tb";
import { useState } from "react";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [menu, setMenu] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  return (
    <div className="navbar">
      <Link to="/">
        <div className="nav-logo">
          <img src={logo} alt="shop logo" className="logo" />
          <p>SnekHead</p>
        </div>
      </Link>

      <SearchInput />

      <ul className="nav-menu">
        <li>
          <Link to="/">Home</Link> <hr />{" "}
        </li>
        <li>
          <Link to="/regular">Regular</Link> <hr />{" "}
        </li>
        <li>
          <Link to="/exclusive">Exclusive</Link> <hr />{" "}
        </li>
        <li>
          <Link to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>
            Dashboard
          </Link>{" "}
          <hr />{" "}
        </li>
      </ul>

      <div className="nav-login-cart">
        {!auth.user ? (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        ) : (
          <>
            <Link onClick={handleLogout} to="/login">
              <button>Logout</button>
            </Link>
          </>
        )}
        <Badge count={cart?.length} showZero>
          <Link to="/cart" className="nav-link">
            <img src={cart_icon} alt="cart icon" />
          </Link>
        </Badge>

        <Link to="/wish">
          <TbWorldHeart
            size={"35px"}
            style={{ color: "orangered", cursor: "pointer" }}
          />
        </Link>
      </div>
      <div
        className="nav-hamburger"
        onClick={() => {
          setMenu(!menu);
        }}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={menu ? "nav-menu-mobile" : "nav-menu-mobile-hidden"}>
        <ul>
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/regular">Regular</Link>
          </li>
          <li className="link">
            <Link to="/exclusive">Exclusive</Link>
          </li>
          <li className="link">
            <Link
              to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
