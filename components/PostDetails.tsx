/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { upvote, downvote } from "@/utils/vote";

interface Post {
  name: string;
  imageUrl: string;
  description: string;
  totalUpvotes: number;
  totalDownvotes: number;
  totalComments: number;
}

const PostDetails = ({ postId }: { postId: string }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);

  const handleUpvote = () => {
    upvote(postId);
    setTimeout(() => {
      setReloadKey((prevKey) => prevKey + 1); // This will trigger the component to re-render after 2 seconds
    }, 2000);
  };

  const handleDownvote = () => {
    downvote(postId);
    setTimeout(() => {
      setReloadKey((prevKey) => prevKey + 1); // This will trigger the component to re-render after 2 seconds
    }, 2000);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const url = process.env.BASE_URL + `/forum/${postId}`;
        const response = await fetch(url, {
          headers: {
            "ngrok-skip-browser-warning": "1",
          },
        });
        const data = await response.json();
        setPost(data);
        setUpvotes(data.totalUpvotes);
        setDownvotes(data.totalDownvotes);
        console.log(post);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPost();
  }, [postId, reloadKey]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div key={reloadKey} className="mx-auto rounded-xl w-[40rem]">
      <p className="text-3xl font-bold">{post.name}</p>
      {post.imageUrl ? (
        <img
          className="object-cover border min-w-full max-w-full min-h-96 max-h-96 rounded-lg"
          src={post.imageUrl}
          alt="img"
        />
      ) : null}
      <p>{post.description}</p>
      <div className="flex gap-2">
        <button onClick={handleUpvote} className="btn btn-primary rounded-full">
          {upvotes}
          <BiUpvote size={18} />
        </button>
        <button
          onClick={handleDownvote}
          className="btn btn-primary rounded-full"
        >
          <BiDownvote size={18} />
          {downvotes}
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default PostDetails;
