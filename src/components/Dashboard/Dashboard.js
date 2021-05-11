import axios from "axios";
import React, { useEffect, useState } from "react";

import TinderCard from "react-tinder-card";
import history from "../../history";
import Profile from "../Profile";

const matchHandler = (user, isLikeBoolean) => {
  if (
    (user.name === "Pia" && isLikeBoolean) ||
    (isLikeBoolean && Math.random() * 1 > 0.8)
  ) {
    const _name = user.gender === "M" ? "katrine" : user.name;
    alert("New match!! " + _name);
  }
};

export default function Dashboard(props) {
  //**
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:7071/api/createUser")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("den fejlede");
        console.log(error);
      });
  }, [props.location]);

  const swiped = (direction) => {
    console.log(direction);
  };

  const like = () => {
    console.log("bruger liked");
    setCurrentIndex(currentIndex + 1);
  };

  const dislike = () => {
    console.log("bruger disliked");
    setCurrentIndex(currentIndex + 1);
  };

  if (loading) {
    return <div>loading...</div>;
  }

  const likeSwipeHandler = (isLike) => {
    const isLikeBoolean = isLike ? 1 : 0;
    const user = users[currentIndex];

    const isMatch = matchHandler(user, isLikeBoolean);
    axios
      .post("http://localhost:7071/api/swipes", {
        userId: 1,
        ratedUserId: user.id,
        isLike: isLikeBoolean,
      })
      .then((res) => {
        console.log(res.data);
        const msg = isLike
          ? "you like a person good job"
          : "Ugly people need love to ";
        alert(msg);
        if (isMatch) {
          alert("You matched with " + isMatch.name);
        }
      });
    const updatedCurrentIndex = currentIndex + 1;
    setCurrentIndex(updatedCurrentIndex);
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("isAuth");
    history.push("/");
  };

  console.log(loading);
  console.log(users);
  return (
    <div className="App">
      <button onClick={(e) => logoutHandler(e)}>Logout</button>
      <div>
        {users.length > 0 && (
          <TinderCard onSwipe={(direction) => swiped(direction)}>
            <Profile
              user={users[currentIndex]}
              swipeHandler={likeSwipeHandler}
            />
          </TinderCard>
        )}
      </div>
      <button onClick={() => likeSwipeHandler(0)}>Dislike</button>
      <button onClick={() => likeSwipeHandler(1)}>Like</button>
    </div>
  );
}
