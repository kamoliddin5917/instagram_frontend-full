import "./Signup.css";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/UseAuth";

// Images
import Insta from "../../assets/imgs/instagram.png";
import AppStore from "../../assets/imgs/app-store.png";
import GooglePlay from "../../assets/imgs/google-play.png";
import port from "../../config/config";

const Signup = () => {
  const [setToken] = useAuth(true);
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const json = await fetch(`${port.heroku}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      const data = await json.json();
      if (data.token) {
        setToken(data.token);
        history.push("/");
      } else {
        setToken(false);
      }

      setContact({ firstName: "", lastName: "", email: "", password: "" });
    } catch (e) {
      console.log(e.message, "ok");
    }
  };

  return (
    <section className="login">
      <div className="login__body">
        <div className="login__body-top">
          <img className="login__logo" src={Insta} alt="logo" />
          <h3 className="signup__h3">
            Register to watch photos and videos of your friends.
          </h3>
          <Link className="login__facebook signup__facebook" to="/signup">
            <span className="login__facebook-link signup__facebook-text">
              Login with Facebook
            </span>
          </Link>
          <div className="login__or">OR</div>
          <form
            className="login__form signup__form"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input
              onChange={handleChange}
              className="login__input"
              type="text"
              name="firstName"
              value={contact.firstName}
              placeholder="First Name"
            />
            <input
              onChange={handleChange}
              className="login__input"
              type="text"
              name="lastName"
              value={contact.lastName}
              placeholder="Last Name"
            />
            <input
              onChange={handleChange}
              className="login__input"
              type="email"
              name="email"
              value={contact.email}
              placeholder="Email"
            />
            <input
              onChange={handleChange}
              className="login__input"
              type="password"
              name="password"
              value={contact.password}
              placeholder="Password"
            />
            <button className="login__btn" type="submit">
              Submit
            </button>
          </form>
          <Link className="login__forget-link" to="/signup">
            By registering, you agree to our Terms, Data Policy and Cookie
            Policy.
          </Link>
        </div>
        <p className="login__body-bottom">
          Have an account?
          <Link className="login__signup-link" to="/signup">
            Entry
          </Link>
        </p>

        <p className="login__app-text">Install the app</p>
        <div className="login__app-links">
          <Link className="login__app-link" to="/login">
            <img
              className="login__app-image login__app-image-appstore"
              src={AppStore}
              alt="ok"
            />
          </Link>
          <Link className="login__app-link" to="/login">
            <img
              className="login__app-image login__app-image-googleplay"
              src={GooglePlay}
              alt="ok"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Signup;
