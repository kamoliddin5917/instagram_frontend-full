import "./Media.css";

const Media = ({ media }) => {
  return (
    <li>
      {media.split("__")[1] === "image" ? (
        <img
          className="content__img"
          src={media}
          alt={"ok"}
          width="200"
          height="200"
        />
      ) : (
        <video
          className="content__video"
          width="200"
          height="200"
          controls
          autoPlay
          muted="muted"
        >
          <source src={media} type="video/mp4" />
        </video>
      )}
    </li>
  );
};

export default Media;
