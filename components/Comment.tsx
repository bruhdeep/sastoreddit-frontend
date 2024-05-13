"use client";

import React, { useEffect, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import Cookies from "js-cookie";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";

interface Comment {
  commentId: string;
  content: string;
  totalReactions: number;
  totalUpvotes: number;
  totalDownvotes: number;
  createdAt: string;
}

const Comment = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const url = process.env.BASE_URL + `/comment/${postId}`;
        const response = await fetch(url, {
          headers: {
            "ngrok-skip-browser-warning": "1",
          },
        });
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleComment = async () => {
    try {
      const response = await fetch(
        process.env.BASE_URL +
          `/add?forumId=${postId}&userId=${Cookies.get(
            "userId"
          )}&content=${comment}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      toast.success("Comment added successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto rounded-xl w-[40rem]">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleComment}>
          Comment
        </button>
      </div>
      <br />
      {comments.map((comment) => (
        <div className="" key={comment.commentId}>
          <p>{comment.content}</p>
          <p>{formatDistanceToNow(new Date(comment.createdAt))}</p>
          <div className="flex gap-2 items-center">
            <button className="btn btn-primary rounded-full">
              {comment.totalUpvotes}
              <BiUpvote size={18} />
            </button>
            <button className="btn btn-primary rounded-full">
              <BiDownvote size={18} />
              {comment.totalDownvotes}
            </button>
          </div>
          <div className="divider"></div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
