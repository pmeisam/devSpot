import React, { Component } from "react";

function HomeView() {
  return (
    <div style={{ margin: "0 auto", textAlign: 'center' }}>
      <h2>
        Are you looking for an idea to build your project?<br></br> you are at the right
        devSpot.
      </h2>
      <img
        style={{ width: "80%", margin: "0 10%" }}
        src="./images/devspot.png"
        alt=""
      />
      <footer
        style={{
          backgroundColor: "rgb(216, 77, 66)",
          color: "white",
          bottom: 0,
          position: "absolute",
          width: "100%",
          textAlign: "center"
        }}
      >
        <p>Ⓒ2019 devSpot. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomeView;
