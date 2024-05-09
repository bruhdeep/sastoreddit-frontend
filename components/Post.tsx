"use client";
import React, { useEffect } from "react";

const PostList = () => {
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://513a-27-34-49-238.ngrok-free.app/forum/list"
        );
        console.log(response);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPosts();
  }, []);

  return <div>Loading posts...</div>;
};

export default PostList;
