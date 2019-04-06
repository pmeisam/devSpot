import React, { Component } from 'react';
import CreatePost from "../../components/CreatePost/CreatePost";

class CreatePostPage extends Component {
  
  render(){
  return (
    <>
      <CreatePost {...this.props} user={this.props.user}/>
    </>
  );
  }
}

export default CreatePostPage;
