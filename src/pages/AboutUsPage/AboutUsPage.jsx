import React from "react";

function AboutUsPage() {
  return (
    <>
      <h4 style={{ color: "rgb(216, 77, 66)", textAlign: 'center', width: '50%', margin: '50px auto' }}>
        devSpot is a social media app for developers. It is a web app where
        developers can share their projects as well as like and comment on
        posted procjets. Developers can create a profile and add relevant links
        (such a portfolio website, github link, etc.). In addition, users can
        chat with each other through the app. The posted projects are live,
        meaning users can interact with them as they would if they were to visit
        the project. Lastly, users receive notifications with any activity on
        their posts.
      </h4>
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
    </>
  );
}

export default AboutUsPage;
