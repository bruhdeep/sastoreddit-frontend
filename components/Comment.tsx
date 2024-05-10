"use client";

import React, { useEffect, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";

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

  return (
    <div className="mx-auto rounded-xl w-[40rem]">
      {comments.map((comment) => (
        <div className=" items-center" key={comment.commentId}>
          <p>{comment.content}</p>
          <p>Created at: {comment.createdAt}</p>
          <div className="">
            <button className="btn btn-primary rounded-full">
              {comment.totalUpvotes}
              <BiUpvote size={18} />
            </button>
            <button className="btn btn-primary rounded-full">
              <BiDownvote size={18} />
              {comment.totalDownvotes}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
