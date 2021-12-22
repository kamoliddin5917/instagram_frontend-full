import "./Header.css";
import { Link, NavLink } from "react-router-dom";

// Images
import Instagram from "../../assets/imgs/instagram-icon.svg";
import InstagramText from "../../assets/imgs/instagram.png";
import port from "../../config/config";

// Components
import { HomeSvg, Search, Like } from "../SVG/SVG";

const Header = ({ userImage }) => {
  return (
    <header className="header">
      <div className="container">
        <Link className="header__logo" to="/">
          <img className="logo__img" src={Instagram} alt="ok" />
          <img className="logo__img-text" src={InstagramText} alt="ok" />
        </Link>

        <nav className="navbar">
          <NavLink
            className="nav__link"
            activeClassName="nav__link-active"
            to="/"
          >
            <HomeSvg />
          </NavLink>
          <NavLink
            className="nav__link"
            activeClassName="nav__link-active"
            to="/"
          >
            <input type="text" placeholder="Search post" />
            <Search />
          </NavLink>
          <NavLink
            className="nav__link"
            activeClassName="nav__link-active"
            to="/"
          >
            <Like />
          </NavLink>
        </nav>

        <Link to="/profile">
          {userImage.split("_")[0] !== "video" ? (
            <img
              className="home__profile-image"
              src={
                userImage.split("_")[0] === "image"
                  ? `${port.heroku}/media/` + userImage
                  : userImage
              }
              alt={"ok"}
            />
          ) : (
            <video
              className="content__video"
              width="40"
              height="40"
              controls
              autoPlay
              muted="muted"
            >
              <source
                src={`${port.heroku}/media/` + userImage}
                type="video/mp4"
              />
            </video>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
