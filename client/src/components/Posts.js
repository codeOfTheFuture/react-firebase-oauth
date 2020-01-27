import React, { useState, useEffect } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const idToken = localStorage.getItem("firebase_idToken");

    axios
      .get("http://localhost:8000/posts", {
        headers: {
          Authorization: idToken
        }
      })
      .then(res => {
        console.log(res);
        setPosts(res.data);
      })
      .catch(err => {
        console.log(err);
        setError("Unauthorized");
      });
  }, []);

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Posts</h2>
        <ul>
          {posts.map(post => {
            return (
              <li>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default Posts;
