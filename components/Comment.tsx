"use client";

import React, { useEffect, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import Cookies from "js-cookie";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import { TiThMenu } from "react-icons/ti";

import { edit } from "@/utils/comment";
import { upvote, downvote } from "@/utils/comment";

interface Comment {
  commentId: string;
  content: string;
  totalReactions: number;
  totalUpvotes: number;
  totalDownvotes: number;
  createdAt: string;
  userId: string;
}

const Comment = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [newContent, setNewContent] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

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
  }, [postId, reloadKey]);

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
    setTimeout(() => {
      setReloadKey((prevKey) => prevKey + 1);
    }, 2000);
  };

  const handleUpvote = (commentId: string) => {
    upvote(commentId);
    setTimeout(() => {
      setReloadKey((prevKey) => prevKey + 1);
    }, 2000);
  };

  const handleDownvote = (commentId: string) => {
    downvote(commentId);
    setTimeout(() => {
      setReloadKey((prevKey) => prevKey + 1);
    }, 2000);
  };

  const handleEdit = async (commentId: string) => {
    try {
      await edit(commentId, newContent);
      toast.success("Comment edited successfully");
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setReloadKey((prevKey) => prevKey + 1);
    }, 2000);
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
          <p>{comment.commentId}</p>
          <p>{formatDistanceToNow(new Date(comment.createdAt))}</p>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <button
                onClick={() => handleUpvote(comment.commentId)}
                className="btn btn-primary rounded-full"
              >
                {comment.totalUpvotes}
                <BiUpvote size={18} />
              </button>
              <button
                onClick={() => handleDownvote(comment.commentId)}
                className="btn btn-primary rounded-full"
              >
                <BiDownvote size={18} />
                {comment.totalDownvotes}
              </button>
            </div>
            {Cookies.get("userId") === comment.userId && (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost m-1">
                  <TiThMenu />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <button
                      className="btn"
                      onClick={() =>
                        (
                          document.getElementById(
                            `editcomment-${comment.commentId}`
                          ) as HTMLDialogElement
                        ).showModal()
                      }
                    >
                      Edit
                    </button>
                    <div>
                      <dialog
                        id={`editcomment-${comment.commentId}`}
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <form className="flex flex-col gap-3">
                            <input
                              type="text"
                              placeholder="Title"
                              className="input input-bordered w-full"
                              onChange={(e) => setNewContent(e.target.value)}
                              required
                            />
                            {comment.commentId}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleEdit(comment.commentId);
                                console.log(comment.commentId);
                              }}
                              className="btn btn-primary"
                            >
                              Edit
                            </button>
                          </form>
                          <div className="modal-action">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  </li>
                  <li>
                    <a>Delete</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="divider"></div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
