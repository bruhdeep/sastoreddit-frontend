/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { formatDistanceToNow } from "date-fns";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = process.env.BASE_URL + "/forum/list";
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

    fetchPosts();
  }, []);

  return (
    <div className="">
      <br />
      <div className="grid gap-10">
        {posts.map((post: any) => (
          <div className="mx-auto rounded-xl w-[40rem]" key={post.id}>
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
              <button className="btn btn-primary rounded-full">
                {post.totalUpvotes}
                <BiUpvote size={18} />
              </button>
              <button className="btn btn-primary rounded-full">
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
            <p>{formatDistanceToNow(new Date(post.createdAt))} ago</p>
            <p>Total Comments: {post.totalComments}</p>
            <div className="divider"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
