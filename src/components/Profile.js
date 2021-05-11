import React, { useEffect, useState } from "react";
import axios from "axios";

const randomImageGenerator = (gender) => {
  const randInt = Math.floor(Math.random() * 100);
  console.log(randInt);
  const baseUrl = `https://randomuser.me/api/portraits/${gender}/${randInt}.jpg`;
  return baseUrl;
};

export default function Profile(props) {
  console.log(props);
  const { user, swipeHandler } = props;
  const [imageUrl, setImageUrl] = useState("");
  console.log(props.user);

  useEffect(() => {
    const gender = user && user.gender === "M" ? "men" : "women";
    const randImageUrl = randomImageGenerator(gender);
    setImageUrl(randImageUrl);
  }, [user]);

  if (!user) {
    return <div>No more Users left buddy!</div>;
  }

  console.log(imageUrl);

  return (
    <div style={{ padding: "20px", border: "1px solid black" }}>
      <div
        style={{
          textAlign: "center",
          margin: "10px",
        }}
      >
        <img src={imageUrl}></img>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p>
            Navn: {user.firstName} {user.lastName}
          </p>
          <p>Køn: {user.gender}</p>
        </div>
      </div>
    </div>
  );
}
