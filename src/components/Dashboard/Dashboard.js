import axios from "axios";
import React, { useEffect, useState } from "react";

import TinderCard from "react-tinder-card";
import history from "../../history";
import Profile from "../Profile";


// funktion til at håndtere eventuelle matches
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
  const [loading, setLoading] = useState(true); // dette er til når der ikke er flere brugere i arrayet, så vil den sige loading
  const [currentIndex, setCurrentIndex] = useState(0); // dette styrer det array af profiler som brugeren bliver foreslået.

  // fetcher vores get funktion til at hente profiler fra databasen
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

  // holder styr på hvilken retning man swiper til de forskellige profiler
  const swiped = (direction) => {
    console.log(direction);
  };

  // funktion til at inkrementere index i arrayet med 1 når der bliver valgt like
  const like = () => {
    console.log("bruger liked");
    setCurrentIndex(currentIndex + 1);
  };

  // funktion til at inkrementere index i arrayet med 1 når der bliver valgt dislike
  const dislike = () => {
    console.log("bruger disliked");
    setCurrentIndex(currentIndex + 1);
  };

  if (loading) {
    return <div>loading...</div>;
  }

  // function til at håndtere matches med databasen
  const likeSwipeHandler = (isLike) => {
    const isLikeBoolean = isLike ? 1 : 0;
    const user = users[currentIndex];

    const isMatch = matchHandler(user, isLikeBoolean);
    axios
      .post("http://localhost:7071/api/swipes", { // fetcher vores post endpont til swipes for at kunne indsætte swipes i databasen
        userId: 1,
        ratedUserId: user.id,
        isLike: isLikeBoolean,
      })
      .then((res) => {
        console.log(res.data);
        const msg = isLike
          ? "you like a person good job" // besked ved like
          : "You didn't like this person"; // besked ved dislike
        alert(msg);
        if (isMatch) {
          alert("You matched with " + isMatch.name); // besked ved match
        }
      });
    const updatedCurrentIndex = currentIndex + 1; // incrementerer currentIndex med 1 efter et match er håndteret
    setCurrentIndex(updatedCurrentIndex);
  };

  // funktion til at håndtere logout
  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("isAuth"); // fjerner "usAuth" fra localStorage så brugeren ikke er logget ind længere
    history.push("/"); // sender brugeren til forsiden
  };

  console.log(loading);
  console.log(users);

  // her er hvad der visuelt bliver vist på siden
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
