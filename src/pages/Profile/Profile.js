import "./Profile.css";
import { useRef } from "react";
import useAuth from "../../hooks/UseAuth";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { storage } from "../../firebase/index";

// Components
import Header from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import port from "../../config/config";
// import { useEffect, useState } from "react/cjs/react.development";

const Profile = ({
  user,
  setUser,
  userPosts,
  comments,
  setComments,
  setAllPosts,
}) => {
  const [token, setToken] = useAuth();
  // const [urls, setUrls] = useState([]);

  const firstName = useRef();
  const lastName = useRef();
  const file = useRef();
  const content = useRef();
  const imgVideo = useRef();

  const deleteMedia = (media) => {
    const storagee = getStorage();

    const m = media.split("--")[1];

    const desertRef = ref(storagee, `media/--${m}--`);

    deleteObject(desertRef)
      .then(() => {
        console.log("ok ochdi olg'a");
      })
      .catch((error) => {
        console.log(error, "o'chmadi baribur olg'a");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file.current.files[0]) {
      if (file.current.files[0].type.split("/")[0] === "image") {
        const imgName = `--__${
          file.current.files[0].type.split("/")[0]
        }__${Date.now()}.${file.current.files[0].type.split("/")[1]}--`;

        const uploadTask = storage
          .ref(`media/${imgName}`)
          .put(file.current.files[0]);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("media")
              .child(imgName)
              .getDownloadURL()
              .then((url) => {
                console.log(url);

                const d = {
                  firstName: firstName.current.value,
                  lastName: lastName.current.value,
                  image: url,
                };
                console.log(firstName.current.value);
                fetch(`${port.heroku}/api/profile`, {
                  method: "PUT",
                  headers: { "Content-Type": "Application/json", token },
                  body: JSON.stringify(d),
                })
                  .then((json) => json.json())
                  .then((data) => {
                    console.log(data);
                    if (data.updateUser) {
                      setUser((prev) => ({
                        ...prev,
                        user_firstname: data.updateUser.user_firstname,
                        user_lastname: data.updateUser.user_lastname,
                        user_image: data.updateUser.user_image,
                      }));

                      deleteMedia(data.img);
                    }
                    firstName.current.value = "";
                    lastName.current.value = "";
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
              });
          }
        );
      }
    } else {
      const d = {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
      };

      fetch(`${port.heroku}/api/profile`, {
        method: "PUT",
        headers: { "Content-Type": "Application/json", token },
        body: JSON.stringify(d),
      })
        .then((json) => json.json())
        .then((data) => {
          console.log(data);
          if (data.updateUser) {
            setUser((prev) => ({
              ...prev,
              user_firstname: data.updateUser.user_firstname,
              user_lastname: data.updateUser.user_lastname,
              user_image: data.updateUser.user_image,
            }));
          }

          firstName.current.value = "";
          lastName.current.value = "";
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    /*
    //      --------- SAVOL -----------
    for (const image in imgVideo.current.files) {
      if (imgVideo.current.files[image].name) {
        if (imgVideo.current.files[image].type) {
          if (
            imgVideo.current.files[image].type.split("/")[0] === "image" ||
            imgVideo.current.files[image].type.split("/")[0] === "video"
          ) {
            const imgName = `__${
              imgVideo.current.files[image].type.split("/")[0]
            }__${Date.now()}.${
              imgVideo.current.files[image].type.split("/")[1]
            }`;

            const uploadTask = storage
              .ref(`media/${imgName}`)
              .put(file.current.files[0]);

            uploadTask.on(
              "state_changed",
              (snapshot) => {},
              (error) => {
                console.log(error);
              },
              () => {
                storage
                  .ref("media")
                  .child(imgName)
                  .getDownloadURL()
                  .then((url) => {
                    console.log(url);
                    console.log(urls);
                    // window.localStorage.getItem("rasm");
                    window.localStorage.setItem("rasm", JSON.stringify([url]));
                    setUrls([...urls, url]);
                  });
              }
            );
          }
        }
      }
    }
    */
    if (imgVideo.current.files[0]) {
      if (
        imgVideo.current.files[0].type.split("/")[0] === "image" ||
        imgVideo.current.files[0].type.split("/")[0] === "video"
      ) {
        const imgName = `--__${
          imgVideo.current.files[0].type.split("/")[0]
        }__${Date.now()}.${imgVideo.current.files[0].type.split("/")[1]}--`;

        const uploadTask = storage
          .ref(`media/${imgName}`)
          .put(imgVideo.current.files[0]);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("media")
              .child(imgName)
              .getDownloadURL()
              .then((url) => {
                console.log(url);

                const d = {
                  name: content.current.value,
                  media: url,
                };
                console.log(content.current.value);
                fetch(`${port.heroku}/api/profile/post`, {
                  method: "POST",
                  headers: { "Content-Type": "Application/json", token },
                  body: JSON.stringify(d),
                })
                  .then((json) => json.json())
                  .then((data) => {
                    console.log(data);
                    if (data.createPost) {
                      console.log(data.createPost);
                      setAllPosts((prev) => [...prev, data.createPost]);
                    }

                    content.current.value = "";
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
              });
          }
        );
      }
    }
  };

  const handleExit = async () => {
    const json = await fetch(`${port.heroku}/api/profile`, {
      method: "DELETE",
      headers: { token },
    });
    console.log(json);
    const data = await json.json();
    if (data.deletedUser) {
      deleteMedia(data.deletedUser.user_image);
      setToken(false);
    }
  };

  return (
    <section className="profile">
      <Header userImage={user.user_image} />
      <div className="profile__body container">
        <div className="profile__left">
          <form method="POST" onSubmit={handleSubmit}>
            <label htmlFor="img">
              <img
                className="profile__image"
                src={user.user_image}
                alt={user.user_firstname}
              />

              <input
                className="profile__image-input"
                type="file"
                id="img"
                ref={file}
              />
            </label>
            <h2>
              {user.user_firstname} {user.user_lastname}
            </h2>
            <p>{user.user_email}</p>
            <input type="text" placeholder="First name" ref={firstName} />
            <input type="text" placeholder="Last name" ref={lastName} />
            <button type="submit">Change</button>
          </form>
          <button onClick={handleExit} className="profile__exit-btn">
            Exit
          </button>
        </div>
        <div className="profile__right">
          <form onSubmit={handleSubmitPost}>
            <input
              type="text"
              name="content"
              placeholder="Content"
              ref={content}
            />
            <input type="file" name="file" ref={imgVideo} multiple />
            <button type="submit">Submit</button>
          </form>

          {userPosts.length && (
            <ul className="box">
              {userPosts.map((post, i) => (
                <Post
                  key={i}
                  post={post}
                  comments={comments}
                  user={user}
                  setComments={setComments}
                  deleteMedia={deleteMedia}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
