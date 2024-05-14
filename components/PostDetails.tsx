/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { upvote, downvote } from "@/utils/post";
import { TiThMenu } from "react-icons/ti";
import Cookies from "js-cookie";
import { edit, remove } from "@/utils/post";
import { useRouter } from "next/navigation";

interface Post {
  name: string;
  imageUrl: string;
  description: string;
  totalUpvotes: number;
  totalDownvotes: number;
  totalComments: number;
  userId: string;
}

const PostDetails = ({ postId }: { postId: string }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const router = useRouter();

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

  const handleEdit = () => {
    edit(postId, newTitle, newDescription);
  };

  const handleRemove = () => {
    remove(postId);
    router.push("/post");
  };

  const confirmAndRemove = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (isConfirmed) {
      handleRemove();
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
      <div className="flex justify-between items-center">
        <p className="text-3xl font-bold">{post.name}</p>
        <div>
          <div className="dropdown dropdown-end">
            {post.userId === Cookies.get("userId") && (
              <div tabIndex={0} role="button" className="btn btn-ghost m-1">
                <TiThMenu />
              </div>
            )}
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button
                  className="btn btn-ghost"
                  onClick={() =>
                    (
                      document.getElementById("editpost") as HTMLDialogElement
                    ).showModal()
                  }
                >
                  Edit
                </button>
                <div>
                  <dialog
                    id="editpost"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <form className="flex flex-col gap-3">
                        <input
                          type="text"
                          placeholder="Title"
                          className="input input-bordered w-full"
                          onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="Title"
                          className="input input-bordered w-full"
                          onChange={(e) => setNewDescription(e.target.value)}
                        />
                        <button
                          onClick={handleEdit}
                          className="btn btn-primary"
                        >
                          Edit
                        </button>
                      </form>
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              </li>
              <li>
                <button onClick={confirmAndRemove} className="btn btn-ghost">
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
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
