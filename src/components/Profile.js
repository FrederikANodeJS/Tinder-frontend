import React from "react";

export default function Profile(props) {
  console.log(props);
  const { user } = props;
  console.log(props.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px", border: "1px solid black" }}>
      <div
        style={{
          textAlign: "center",
          margin: "10px",
        }}
      >
        <img src={user.photos[0]}></img>
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
