import React from "react";
import app from "../firebase";

function Home() {
  const signOut = () => {
    localStorage.removeItem("firebase_idToken");
    app.auth().signOut();
  };
  return (
    <>
      <h1>Home</h1>
      <button onClick={signOut}>Sign Out</button>
    </>
  );
}

export default Home;
