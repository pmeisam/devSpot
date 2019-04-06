import React, { Component } from "react";
import "./ProfilePage.css"

class ProfilePage extends Component {
  render() {
    return (
      <>
        <div>
          <h3>Hello {this.props.user.first_name}</h3>
          <div>
            {this.props.userIndex ? (
              this.props.userIndex.map((p, i) => (
                <div key={`p${i}`} className="card-panel blue-grey darken-1 white-text">
                  <iframe key={`frame${i}`} title={`title${i}`} src={p.url} />
                  <div key={p.caption}>{p.caption}</div>
                  <div key={`{comments${i}`}>{p.comments}</div>
                  <div key={`likes${i}`}>{p.likes}</div>
                  <button key={`p.btn${i}`} className="btn">
                    Like
                  </button>
                  <input
                    key={`commentInput${i}`}
                    type="text"
                    placeholder="comments..."
                  />
                  <input key={`submit${i}`} className="btn" type="submit" />
                </div>
              ))
            ) : (
              <img src="./images/loading3.gif" alt="" />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default ProfilePage;
