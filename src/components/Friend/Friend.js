import "./Friend.css";
import { Link } from "react-router-dom";
import port from "../../config/config";

const Friend = ({ userF }) => {
  return (
    <li className="friend">
      <Link className="nav-profile-link" to="/profile">
        {userF.user_image.split("_")[0] !== "video" ? (
          <img
            className="nav-profile-image"
            src={
              userF.user_image.split("_")[0] === "image"
                ? `${port.heroku}/media/` + userF.user_image
                : userF.user_image
            }
            alt={userF.user_firstname}
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
              src={`${port.heroku}/media/` + userF.user_image}
              type="video/mp4"
            />
          </video>
        )}
        <span>{`${userF.user_firstname} ${userF.user_lastname}`}</span>
      </Link>
    </li>
  );
};

export default Friend;
