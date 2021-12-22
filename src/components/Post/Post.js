import "./Post.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import useAuth from "../../hooks/UseAuth";

import Media from "../../components/Media/Media";
import Comment from "../../components/Comment/Comment";
import port from "../../config/config";

const Post = ({ post, comments, user, setComments, deleteMedia }) => {
  const [token] = useAuth();

  const commentInput = useRef();
  const inputPostUpdate = useRef();
  const modalPostUpdate = useRef();
  const modalPostUpdateExit = useRef();

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

  const postDelete = async () => {
    const json = await fetch(
      `${port.heroku}/api/profile/post/${post.post_id}`,
      {
        method: "DELETE",
        headers: { token },
      }
    );
    const data = await json.json();
    console.log(data);
    if (data.deletedPost) {
      deleteMedia(data.deletedPost.post_media[0]);
    }
  };

  const postUpdate = async (e) => {
    e.preventDefault();

    const d = {
      name: inputPostUpdate.current.value,
      postId: post.post_id,
    };
    const json = await fetch(`${port.heroku}/api/profile/post`, {
      method: "PUT",
      headers: { "Content-Type": "Application/json", token },
      body: JSON.stringify(d),
    });

    const data = await json.json();

    if (data.updatePost) {
      console.log(data.updatePost);
    }

    inputPostUpdate.current.value = "";
    modalPostUpdate.current.classList.remove("modal-post_update-active");
  };

  const modalPostUpdateClose = () => {
    modalPostUpdate.current.classList.add("modal-post_update-active");
  };

  const modalPost = (e) => {
    if (
      e.target === modalPostUpdate.current ||
      e.target === modalPostUpdateExit.current
    ) {
      modalPostUpdate.current.classList.remove("modal-post_update-active");
    }
  };

  return (
    <li className="content">
      <Link className="content__link" to="/profile">
        <img
          className="profile__image"
          src={user.user_image}
          alt={user.user_firstname}
        />

        <h3>{user.user_firstname}</h3>
      </Link>
      <div>
        <ul className="post_media">
          {post.post_media.map((media, i) => (
            <Media key={i} media={media} />
          ))}
        </ul>

        <div className="post_name-update">
          <h4>{post.post_name}</h4>

          <button className="post_update" onClick={modalPostUpdateClose}>
            UPDATE
          </button>
        </div>

        <button className="post_delete" onClick={postDelete}>
          X
        </button>

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
                  postId={post.post_id}
                  setComments={setComments}
                  comments={comments}
                />
              )
          )}
        </ul>
      </div>

      <div
        onClick={modalPost}
        className="modal-post_update"
        ref={modalPostUpdate}
      >
        <form className="form-post_update" onSubmit={postUpdate}>
          <button
            ref={modalPostUpdateExit}
            className="modal-post_update-exit"
            type="button"
          >
            X
          </button>
          <h1 className="post_name">{post.post_name}</h1>
          <input
            ref={inputPostUpdate}
            type="text"
            placeholder="Name"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </li>
  );
};

export default Post;
