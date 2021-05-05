import "./App.css";
import React, { useEffect, useState, useMemo } from "react";
import TinderCard from "react-tinder-card";
import Profile from "./components/Profile";

function App() {
  //**
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:7071/api/createUser")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setUsers(data);
      })
      .catch((error) => {
        console.log("den fejlede");
        console.log(error);
      });
  }, []);

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

  console.log(users[1]);
  return (
    <div className="App">
      <p>Hello world</p>
      <div>
        <TinderCard onSwipe={(direction) => swiped(direction)}>
          <Profile user={users[currentIndex]} />
        </TinderCard>
      </div>
      <button onClick={dislike}>Dislike</button>
      <button onClick={like}>Like</button>
    </div>
  );
}

export default App;
