/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { upvote, downvote } from "@/utils/vote";

import { formatDistanceToNow } from "date-fns";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [reloadKey, setReloadKey] = useState(0);

  const handleUpvote = (postId: string) => {
    upvote(postId);
    setTimeout(() => {
      setReloadKey((prevKey) => prevKey + 1); // This will trigger the component to re-render after 2 seconds
    }, 2000);
  };

  const handleDownvote = (postId: string) => {
    downvote(postId);
    setTimeout(() => {
      setReloadKey((prevKey) => prevKey + 1); // This will trigger the component to re-render after 2 seconds
    }, 2000);
  };

  const fetchPosts = async (url: string) => {
    try {
      const response = await fetch(url, {
        headers: {
          "ngrok-skip-browser-warning": "1",
        },
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchPosts(process.env.BASE_URL + "/forum/list");
  }, [reloadKey]);

  const handleRecentPosts = () => {
    fetchPosts(process.env.BASE_URL + "/forum/list");
  };

  const handleRandomPosts = () => {
    fetchPosts(process.env.BASE_URL + "/forum/Randi");
  };

  const handlePopularPosts = () => {
    fetchPosts(process.env.BASE_URL + "/forum/popular");
  };

  return (
    <div key={reloadKey} className="">
      <br />
      <button onClick={handleRecentPosts} className="btn btn-primary">
        Load Recent Posts
      </button>
      <button onClick={handleRandomPosts} className="btn btn-primary">
        Load Random Posts
      </button>
      <button onClick={handlePopularPosts} className="btn btn-primary">
        Load Popular Posts
      </button>
      <div className="grid gap-10">
        {posts.map((post: any) => (
          <div className="mx-auto rounded-xl w-[40rem]" key={post.id}>
            <div className="flex gap-2 items-baseline">
              <p className="text-2xl font-bold">{post.name}</p>
              <p className="text-sm">
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </p>
            </div>
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
                onClick={() => handleUpvote(post.id)}
                className="btn btn-primary rounded-full"
              >
                {post.totalUpvotes}
                <BiUpvote size={18} />
              </button>
              <button
                onClick={() => handleDownvote(post.id)}
                className="btn btn-primary rounded-full"
              >
                <BiDownvote size={18} />
                {post.totalDownvotes}
              </button>
              <Link href={`/post/${post.id}`}>
                <button className="btn btn-primary rounded-full">
                  {post.totalComments}
                  <BiComment size={18} />
                </button>
              </Link>
            </div>
            <div className="divider"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
