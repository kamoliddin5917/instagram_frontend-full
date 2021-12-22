import "./Comment.css";
import { useRef } from "react";
import useAuth from "../../hooks/UseAuth";
import port from "../../config/config";

const Comment = ({ comment, postId, setComments, comments }) => {
  const [token] = useAuth();
  const inputComment = useRef();

  const commentAdd = async (e) => {
    e.preventDefault();

    const d = {
      comment: inputComment.current.value,
      postId,
    };

    const json = await fetch(
      `${port.heroku}/api/comment/${comment.comment_id}`,
      {
        method: "POST",
        headers: { "Content-Type": "Application/json", token },
        body: JSON.stringify(d),
      }
    );
    const data = await json.json();

    if (data.createCommentComment) {
      setComments((prev) => [...prev, data.createCommentComment]);
    }

    inputComment.current.value = "";
  };

  return (
    <li>
      <div className="comment_box">
        <p>{comment.comment_name}</p>

        <button
          onClick={async () => {
            const json = await fetch(
              `${port.heroku}/api/comment/${comment.comment_id}`,
              {
                method: "DELETE",
                headers: { token },
              }
            );

            const data = await json.json();

            console.log(data);
          }}
        >
          X
        </button>
      </div>

      <form onSubmit={commentAdd}>
        <input ref={inputComment} type="text" placeholder="Write Comment" />
        <button type="submit">Submit</button>
      </form>

      <ul>
        {comments.map(
          (c, i) =>
            comment.comment_id === c.comment_ref_id && (
              <li key={i} className="subcomment">
                <p>{c.comment_name}</p>
                <button
                  onClick={async () => {
                    const json = await fetch(
                      `${port.heroku}/api/comment/${c.comment_id}`,
                      {
                        method: "DELETE",
                        headers: { token },
                      }
                    );

                    const data = await json.json();

                    console.log(data);
                  }}
                >
                  X
                </button>
              </li>
            )
        )}
      </ul>
    </li>
  );
};

export default Comment;
