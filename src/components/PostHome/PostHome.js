import "./PostHome.css";
import { Link } from "react-router-dom";

import Media from "../../components/Media/Media";
import Comment from "../../components/Comment/Comment";
import port from "../../config/config";
import { useRef } from "react";
import useAuth from "../../hooks/UseAuth";

const PostHome = ({ post, comments, setComments, userP }) => {
  const [token] = useAuth();

  const commentInput = useRef();

  const commentWrite = async (e) => {
    e.preventDefault();

    const d = {
      comment: commentInput.current.value,
      postId: post.post_id,
    };

    const json = await fetch(`${port.heroku}/api/comment`, {
      method: "POST",
      headers: { "Content-Type": "Application/json", token },
      body: JSON.stringify(d),
    });

    const data = await json.json();

    if (data.createComment) {
      setComments((prev) => [...prev, data.createComment]);
      console.log(data);
    }

    commentInput.current.value = "";
  };

  return (
    <li className="content">
      <Link className="content__link" to="/profile">
        <img
          className="profile__image"
          src={userP.user_image}
          alt={userP.user_firstname}
        />

        <div>
          <h3>{userP.user_firstname}</h3>
          <p>{userP.user_email}</p>
        </div>
      </Link>
      <div>
        <ul className="post_media">
          {post.post_media.map((media, i) => (
            <Media key={i} media={media} />
          ))}
        </ul>
        <h4>{post.post_name}</h4>

        <form onSubmit={commentWrite} className="comment_write">
          <input ref={commentInput} type="text" placeholder="Write Comment" />
          <button type="submit">Submit</button>
        </form>

        <ul>
          {comments.map(
            (comment, i) =>
              post.post_id === comment.comment_post &&
              !comment.comment_ref_id && (
                <Comment
                  key={i}
                  comment={comment}
                  comments={comments}
                  setComments={setComments}
                  postId={post.post_id}
                />
              )
          )}
        </ul>
      </div>
    </li>
  );
};

export default PostHome;
