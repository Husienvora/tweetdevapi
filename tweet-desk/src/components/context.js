import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const BaseUrl = "http://localhost:5000/api/v1";
  const [Streamcache, setStreamcache] = useState([]);
  const [Username, setUsername] = useState(null);
  const [Followers, setFollowers] = useState(null);
  const [Following, setFollowing] = useState(null);
  const [UserAvatar, setUserAvatar] = useState({});
  const [aLogin, setaLogin] = useState(true);
  const [AenterPin, setAenterPin] = useState(false);
  const [cookies, setCookie] = useCookies();
  const [aLoading, setaLoading] = useState(false);
  const Loading = useRef(null);
  let Avataar = "";
  const LoggedIn = [];
  const [Users, setUsers] = useState([]);
  const cancelTokenSource = axios.CancelToken.source();

  let Temp = null;

  useEffect(() => {
    if (!cookies.streamval || cookies.streamval) {
      setCookie(
        "streamval",
        `{"value": "meme has:media", "tag": "funny things"}`,
        {
          path: "/",
        }
      );
    }
    if (!cookies.ChangedCurr) {
      setCookie("ChangedCurr", "false", { path: "/" });
    }
    if (!cookies.accountCount) {
      setCookie("accountCount", "0", { path: "/" });
    }
    if (cookies.accountCount > "0") {
      setaLogin(false);
    }
  }, []);

  useEffect(() => {
    for (let i = 1; i <= parseInt(cookies.accountCount); i++) {
      if (!LoggedIn.includes(eval(`cookies.User${i}.User`))) {
        LoggedIn.push(eval(`cookies.User${i}.User`));
      }
    }
    setUsers(LoggedIn);
  }, []);

  const ChangeCurruser = (user) => {
    const fromIndex = Users.indexOf(user);
    const toIndex = 0;

    const element = Users.splice(fromIndex, 1)[0];

    Users.splice(toIndex, 0, element);

    setCookie("ChangedCurr", "true", { path: "/" });
  };

  const User_avatar = async (twitterUsername) => {
    try {
      let user = twitterUsername;
      let avatarUrl = await axios
        .post(BaseUrl + "/twitter/user-photo", {
          twitterUsername: twitterUsername,
        })
        .then((res) => {
          return res.data;
        });

      if (!eval(`cookies.${user}`)) {
        setCookie(`${user}`, avatarUrl, { path: "/" });
      }

      setUserAvatar((old) => ({ ...old, [user]: avatarUrl }));
    } catch (error) {
      console.log("Done");
    }
  };
  const authenticate = async () => {
    let url = await axios
      .get(BaseUrl + "/twitter/authentication")
      .then((res) => {
        return res.data;
      });
    setAenterPin(true);
    //url = url.replace("api.", ""); //until api.twitter gets fixed

    window.open(url, "_blank", "noopener,noreferrer");
  };
  const Enterpin = async (pin) => {
    let user = await axios
      .post(BaseUrl + "/twitter/authentication", {
        pin: pin,
      })

      .then((res) => {
        return res.data;
      });
    setCookie("accountCount", String(parseInt(cookies.accountCount) + 1), {
      path: "/",
    });

    setCookie(`User${parseInt(cookies.accountCount) + 1}`, user, { path: "/" });
    User_avatar(user.User);
    setaLogin(false);
    setaLoading(false);

    setAenterPin(false);
  };

  // const Stream = async () => {
  //   try {
  //     let data = await axios
  //       .post(
  //         BaseUrl + "/twitter/stream",
  //         {
  //           amount: 3,
  //         },
  //         {
  //           cancelToken: cancelTokenSource.token,
  //         }
  //       )
  //       .then((res) => {
  //         return res.data;
  //       });
  //     setStreamcache(data);
  //     cancelTokenSource.cancel();
  //   } catch (error) {
  //     //console.log("done");
  //   }
  // };
  //"/twitter/filteredstream"
  const Filtered_Stream = async (rules) => {
    try {
      let data = await axios
        .post(
          BaseUrl + "/twitter/filteredstream",
          {
            amount: 3,
            rules: rules,
          },
          {
            cancelToken: cancelTokenSource.token,
          }
        )
        .then((res) => {
          Loading.current.complete();
          cancelTokenSource.cancel();
          return res.data;
        });

      setStreamcache(data);
    } catch (error) {
      console.log("done");
    }
  };

  const Retweet = async (tweet_id) => {
    await axios
      .post(BaseUrl + "/twitter/retweet", {
        username: Users[0],
        tweet_id: tweet_id,
      })
      .then((res) => {
        if (res.data) {
          toast.success("Retweet Succesful", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("There was a problem", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  const Undo_Retweet = async (source_tweet_id) => {
    console.log(Users[0]);
    await axios
      .delete(BaseUrl + "/twitter/retweet", {
        data: { username: Users[0], source_tweet_id: source_tweet_id },
      })
      .then((res) => {
        if (res.data) {
          toast.success("UndoRetweet Succesful", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("There was a problem", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  const Create_tweet = async (msg) => {
    await axios
      .post(BaseUrl + "/twitter/tweet", {
        username: Users[0],
        msg: msg,
      })
      .then((res) => {
        if (res.data) {
          toast.success("Tweet Succesful", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("There was a problem", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  const Delete_tweet = async (tweet_id) => {
    await axios
      .delete(BaseUrl + "/twitter/tweet", {
        data: { username: Users[0], tweet_id: tweet_id },
      })
      .then((res) => {
        if (res) {
          toast.success("Tweet Deleted", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("There was a problem", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };
  const User_is_following = async (User_id) => {
    let data = await axios
      .post(BaseUrl + "/twitter/follow/following", {
        userId: User_id,
      })
      .then((res) => {
        return res.data;
      });
    setFollowing(data);
  };
  const Users_followers = async (User_id) => {
    let data = await axios
      .post(BaseUrl + "/twitter/follow/followers", {
        userId: User_id,
      })
      .then((res) => {
        return res.data;
      });
    setFollowers(data);
  };
  const Follow_UserId = async (target_user_id) => {
    console.log(target_user_id);
    await axios
      .post(BaseUrl + "/twitter/follow", {
        username: Users[0],
        target_user_id: target_user_id,
      })
      .then((res) => {
        if (res.data) {
          toast.success("User followed", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("There was a problem", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  const Unfollow_UserId = async (target_user_id) => {
    await axios
      .delete(BaseUrl + "/twitter/follow", {
        data: { username: Users[0], target_user_id: target_user_id },
      })
      .then((res) => {
        if (res.data) {
          toast.success("User unfollowed", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("There was a problem", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };
  const Like_a_Tweet = async (tweet_id) => {
    await axios
      .post(BaseUrl + "/twitter/like", {
        username: Users[0],
        tweet_id: tweet_id,
      })
      .then((res) => {
        if (res.data) {
          toast.success("Tweet Liked", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("There was a problem", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };
  const Undo_a_like = async (tweet_id) => {
    await axios
      .delete(BaseUrl + "/twitter/like", {
        data: { username: Users[0], tweet_id: tweet_id },
      })
      .then((res) => {
        if (res.data) {
          toast.success("Tweet Unliked", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("There was a problem", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };
  const Retweet_lookup = async (tweet_id) => {
    await axios
      .post(BaseUrl + "/twitter/retweetedby", {
        tweet_id: tweet_id,
      })
      .then((res) => {
        return res.data;
      });
  };

  const User_lookup = async (username) => {
    let data = await axios
      .post(BaseUrl + "/twitter/finduser", {
        username: username,
      })
      .then((res) => {
        return res.data;
      });
    return data;
  };

  const Block_a_user = async (user_id) => {
    await axios
      .post(BaseUrl + "/twitter/Block", {
        username: Users[0],
        target_user_id: user_id,
      })
      .then((res) => {
        if (res.data) {
          toast.success("User blocked", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("There was a problem", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  const unBlock_a_user = async (user_id) => {
    await axios
      .delete(BaseUrl + "/twitter/unBlock", {
        data: { username: Users[0], target_user_id: user_id },
      })
      .then((res) => {
        if (res.data) {
          toast.success("User unblocked", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("There was a problem", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };
  return (
    <AppContext.Provider
      value={{
        Avataar,
        Users,
        aLoading,
        Streamcache,
        Username,
        Followers,
        Following,
        aLogin,
        Loading,
        setaLogin,
        setCookie,
        setFollowers,
        Block_a_user,
        unBlock_a_user,
        setFollowing,
        setUserAvatar,
        setStreamcache,
        ChangeCurruser,

        cookies,
        AenterPin,
        LoggedIn,
        UserAvatar,
        cancelTokenSource,
        setAenterPin,
        setaLoading,
        authenticate,
        Enterpin,
        //Stream,
        Undo_Retweet,
        Retweet,
        Create_tweet,
        Delete_tweet,
        Filtered_Stream,
        User_is_following,
        Users_followers,
        Follow_UserId,
        Unfollow_UserId,
        Like_a_Tweet,
        Undo_a_like,
        Retweet_lookup,
        User_avatar,
        User_lookup,
        BaseUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
