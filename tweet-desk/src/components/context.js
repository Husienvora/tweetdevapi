import React, { useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const BaseUrl = "http://localhost:5000/api/v1";
  const [Streamcache, setStreamcache] = useState(null);
  const [Username, setUsername] = useState(null);
  const [Followers, setFollowers] = useState(null);
  const [Following, setFollowing] = useState(null);
  const [UserAvatar, setUserAvatar] = useState({});
  const [aLogin, setaLogin] = useState(true);
  const [AenterPin, setAenterPin] = useState(false);
  const [cookies, setCookie] = useCookies();
  const [aLoading, setaLoading] = useState(false);
  let Avataar = "";
  const LoggedIn = [];
  const [Users, setUsers] = useState([]);
  const cancelTokenSource = axios.CancelToken.source();
  let Temp = null;

  useEffect(() => {
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

  const User_avatar = async (twitterUsername) => {
    try {
      let user = twitterUsername;
      let avatarUrl = await axios
        .post(
          BaseUrl + "/twitter/user-photo",
          {
            twitterUsername: twitterUsername,
          },
          {
            cancelToken: cancelTokenSource.token,
          }
        )
        .then((res) => {
          return res.data;
        });
      console.log({ [user]: avatarUrl });
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

  const Stream = async () => {
    await axios
      .post(BaseUrl + "/twitter/stream", {
        amount: 10,
      })
      .then((res) => {
        setStreamcache(res.data);
      });
  };

  const Filtered_Stream = async (rules) => {
    await axios
      .post(BaseUrl + "/twitter/filteredstream", {
        amount: 10,
        rules: rules,
      })
      .then((res) => {
        setStreamcache(res.data);
      });
  };

  const Retweet = async (tweet_id) => {
    await axios.post(BaseUrl + "/twitter/retweet", {
      username: Username,
      tweet_id: tweet_id,
    });
  };

  const Undo_Retweet = async (source_tweet_id) => {
    await axios.delete(BaseUrl + "/twitter/retweet", {
      username: Username,
      source_tweet_id: source_tweet_id,
    });
  };

  const Create_tweet = async (msg) => {
    await axios.post(BaseUrl + "/twitter/tweet", {
      username: Username,
      msg: msg,
    });
  };

  const Delete_tweet = async (tweet_id) => {
    await axios.delete(BaseUrl + "/twitter/tweet", {
      username: Username,
      tweet_id: tweet_id,
    });
  };
  const User_is_following = async (User_id) => {
    await axios
      .post(BaseUrl + "/twitter/follow/following", {
        userId: User_id,
      })
      .then((res) => {
        setFollowing(res.data);
      });
  };
  const Users_followers = async (User_id) => {
    await axios
      .post(BaseUrl + "/twitter/follow/followers", {
        userId: User_id,
      })
      .then((res) => {
        setFollowers(res.data);
      });
  };
  const Follow_UserId = async (target_user_id) => {
    await axios.post(BaseUrl + "/twitter/follow", {
      username: Username,
      target_user_id: target_user_id,
    });
  };

  const Unfollow_UserId = async (target_user_id) => {
    await axios.delete(BaseUrl + "/twitter/follow", {
      username: Username,
      target_user_id: target_user_id,
    });
  };
  const Like_a_Tweet = async (tweet_id) => {
    await axios.post(BaseUrl + "/twitter/like", {
      username: Username,
      tweet_id: tweet_id,
    });
  };
  const Undo_a_like = async (tweet_id) => {
    await axios.delete(BaseUrl + "/twitter/like", {
      username: Username,
      tweet_id: tweet_id,
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
    await axios
      .post(BaseUrl + "/twitter/finduser", {
        username: username,
      })
      .then((res) => {
        return res.data;
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
        setaLogin,
        setCookie,
        setUserAvatar,
        cookies,
        AenterPin,
        LoggedIn,
        UserAvatar,
        cancelTokenSource,
        setAenterPin,
        setaLoading,
        authenticate,
        Enterpin,
        Stream,
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
