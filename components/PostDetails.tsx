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
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleUpvote = () => {

    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 5000);
    upvote(postId);
    if (hasUpvoted) {
      setUpvotes((prevUpvotes) => prevUpvotes - 1);
      setHasUpvoted(false);
    } else {
      setUpvotes((prevUpvotes) => prevUpvotes + 1);
      setHasUpvoted(true);
    }
  };

  const handleDownvote = () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 5000);
    downvote(postId);
    if (hasDownvoted) {
      setDownvotes((prevDownvotes) => prevDownvotes - 1);
      setHasDownvoted(false);
    } else {
      setDownvotes((prevDownvotes) => prevDownvotes + 1);
      setHasDownvoted(true);
    }
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
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto rounded-xl w-[40rem]">
      <p className="text-xl font-bold">{post.name}</p>
      {post.imageUrl ? (
        <img
          className="object-cover border min-w-full max-w-full min-h-96 max-h-96 rounded-lg"
          src={post.imageUrl}
          alt="img"
        />
      ) : null}
      <p>{post.description}</p>
      <div className="flex gap-2">
        <button
          onClick={handleUpvote}
          className="btn btn-primary rounded-full"
          disabled={isDisabled}
        >
          {upvotes}
          <BiUpvote size={18} />
        </button>
        <button
          onClick={handleDownvote}
          className="btn btn-primary rounded-full"
          disabled={isDisabled}
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
