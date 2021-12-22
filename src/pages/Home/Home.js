import "./Home.css";
import { Link } from "react-router-dom";
// import {useState}from "react"

// Components
import Header from "../../components/Header/Header";
import Friend from "../../components/Friend/Friend";
import PostHome from "../../components/PostHome/PostHome";
import port from "../../config/config";

const Home = ({ user, users, allPosts, comments, setComments }) => {
  return (
    <section className="home">
      <Header userImage={user.user_image} />

      <div className="nav-profile container">
        <Link className="nav-profile-link" to="/profile">
          {user.user_image.split("_")[0] !== "video" ? (
            <img
              className="nav-profile-image"
              src={
                user.user_image.split("_")[0] === "image"
                  ? `${port.heroku}/media/` + user.user_image
                  : user.user_image
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
                src={`${port.heroku}/media/` + user.user_image}
                type="video/mp4"
              />
            </video>
          )}
          <span>Your story</span>
        </Link>

        <ul className="friends">
          {users.map((userF, i) => (
            <Friend key={i} userF={userF} />
          ))}
        </ul>
      </div>

      <div className="container">
        {allPosts.length && (
          <ul className="box">
            {allPosts.map((post, i) =>
              users.map(
                (user) =>
                  user.user_id === post.post_author && (
                    <PostHome
                      key={i}
                      comments={comments}
                      setComments={setComments}
                      userP={user}
                      post={post}
                    />
                  )
              )
            )}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Home;
