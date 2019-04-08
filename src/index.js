import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./modal.css";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      users: [],
      posts: [],
      post: "",
      username: "",
      other: ""
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getUserPosts = this.getUserPosts.bind(this);
  }

  showModal() {
    if (this.state.users.length === 0) {
      axios
        .get("https://jsonplaceholder.typicode.com/users/")
        .then(response => {
          this.setState({ users: response.data, showModal: true });
        });
    } else {
      this.setState({ showModal: true });
    }
  }

  getUserPosts(e) {
    console.log(`userid:${e.target.value}`);
    const user = this.state.users.find(
      user => user.id === parseInt(e.target.value)
    );

    this.setState({
      username: user.name
    });
    axios
      .get(
        "https://jsonplaceholder.typicode.com/posts?userId=" + e.target.value
      )
      .then(response => {
        console.log(response.data);
        this.setState({ posts: response.data });
      });
  }

  closeModal() {
    this.setState({ showModal: false });
    document.getElementById("data").innerHTML = this.state.username;
  }

  render() {
    return (
      <div className={`modal${this.state.showModal ? " show" : ""}`}>
        <div className="modal__content">
          <div className="close-button" onClick={this.closeModal}>
            X
          </div>
          <h1>I'm a React modal!</h1>
          <div>
            <div className="form_group">
              <label htmlFor="reason">User</label>
              <select name="" id="reason" onChange={this.getUserPosts}>
                <option value="" label="" placeholder="Select a user" />
                {this.state.users.map(user => (
                  <option
                    key={user.id}
                    value={user.id}
                    label={user.name}
                    selected={
                      this.state.username === user.name ? "selected" : ""
                    }
                  />
                ))}
              </select>
            </div>
            {this.state.posts.length > 0 && (
              <div className="form_group">
                <label htmlFor="posts">Posts</label>
                <select
                  name=""
                  id="posts"
                  onChange={e => this.setState({ post: e.target.value })}
                >
                  <option value="" label="" placeholder="Select a post" />
                  {this.state.posts.map(post => (
                    <option
                      key={post.id}
                      id={post.id}
                      value={post.id}
                      label={post.title}
                      selected={this.state.post === post.id ? "selected" : ""}
                    />
                  ))}
                </select>
              </div>
            )}

            <div className="form_group">
              <label htmlFor="name">Other: </label>
              <input
                type="text"
                id="name"
                value={this.state.other}
                onChange={e => this.setState({ other: e.target.value })}
              />
            </div>

            <button onClick={this.closeModal}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

let domContainer = document.querySelector("#modal_root");
ReactDOM.render(
  <Modal ref={my_modal => (window.my_modal = my_modal)} />,
  domContainer
);
