import React, { useEffect, useState } from "react";
import axios from "axios";


// funktion til at få et billede på profilen
const randomImageGenerator = (gender) => {
  const randInt = Math.floor(Math.random() * 100);
  console.log(randInt);
  const baseUrl = `https://randomuser.me/api/portraits/${gender}/${randInt}.jpg`;
  return baseUrl;
};

// function til at genere en profil
export default function Profile(props) {
  console.log(props);
  const { user, swipeHandler } = props; // user henter vi som array
  const [imageUrl, setImageUrl] = useState("");
  console.log(props.user);

  // uskiller køn fra hinanden
  useEffect(() => {
    const gender = user && user.gender === "M" ? "men" : "women";
    const randImageUrl = randomImageGenerator(gender); // sætter køn på billedet
    setImageUrl(randImageUrl);
  }, [user]);

  // hvis der ikke er flere brugere
  if (!user) {
    return <div>No more Users left buddy!</div>;
  }

  console.log(imageUrl);

  // dette er hvad der bliver vist på siden
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
