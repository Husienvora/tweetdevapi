import React, { useState, useContext } from "react";
import axios from "axios";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const BaseUrl = "http://localhost:5000/api/v1";
  const [Streamcache, setStreamcache] = useState(null);
  const [Username, setUsername] = useState(null);
  const [Followers, setFollowers] = useState(null);
  const [Following, setFollowing] = useState(null);
  const [Useravatar, setUseravatar] = useState({});
  const authenticate = async () => {
    await axios.get(BaseUrl + "/twitter/authentication").then((res) => {
      return res.data;
    });
  };
  const Enterpin = async (pin) => {
    await axios.post(BaseUrl + "/twitter/authentication", {
      pin: pin,
    });
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
  const User_avatar = async (twitterUsername) => {
    await axios
      .post(BaseUrl + "/twitter/user-photo", {
        twitterUsername: twitterUsername,
      })
      .then((res) => {
        setUseravatar(...User_avatar, { Username: res.data });
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
        Streamcache,
        Username,
        Followers,
        Following,
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
