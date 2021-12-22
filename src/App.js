import "./App.css";
import { Switch } from "react-router";
import { useEffect, useState } from "react";
import useAuth from "./hooks/UseAuth";
import port from "./config/config";

// Socket
import io from "socket.io-client";

// Pages
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
// Routes
import Public from "./routes/Public";
import Private from "./routes/Private";

let socket;

function App() {
  const [user, setUser] = useState({
    user_id: "",
    user_firstname: "",
    user_lastname: "",
    user_email: "",
    user_image: "",
    user_date: "",
  });
  const [userPosts, setUserPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const [token] = useAuth();

  // const ENDPOINT = port.heroku;
  const ENDPOINT = "localhost:777";
  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on("CREATE_COMMENT", (comment) => {
      if (comment) {
        console.log(comment);
      }
    });
    socket.on("CREATE_POST", (post) => {
      if (post) {
        console.log(post);
      }
    });
    socket.on("CREATE_USER", (user) => {
      if (user) {
        console.log(user);
      }
    });
  }, []);

  useEffect(() => {
    (async () => {
      const json = await fetch(`${port.heroku}/api/profile`, {
        headers: { token },
      });
      const data = await json.json();
      if (data.profile) {
        setUser(data.profile.user);
        setUserPosts(data.profile.posts);
        setComments(data.profile.comments);
      } else {
        setUser({
          user_id: "",
          user_firstname: "",
          user_lastname: "",
          user_email: "",
          user_image: "",
          user_date: "",
        });
      }
    })();

    (async () => {
      const jsonHome = await fetch(`${port.heroku}/api/home`, {
        headers: { token },
      });
      const data = await jsonHome.json();
      if (data.data) {
        setAllPosts(data.data.posts);
        setUsers(data.data.users);
      }
    })();
  }, [token]);

  return (
    <div className="App">
      <Switch>
        <Private path="/" exact>
          <Home
            user={user}
            users={users}
            allPosts={allPosts}
            comments={comments}
            setComments={setComments}
          />
        </Private>
        <Private path="/profile">
          <Profile
            user={user}
            setUser={setUser}
            userPosts={userPosts}
            setUserPosts={setUserPosts}
            comments={comments}
            setComments={setComments}
            setAllPosts={setAllPosts}
          />
        </Private>
        <Public path="/login" component={Login} />
        <Public path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
