/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { BiUpvote, BiDownvote } from "react-icons/bi";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file && file.size > 3 * 1024 * 1024) {
        // size in bytes
        toast.error("File size should be less than 3MB");
        event.target.value = ""; // clear the selected file
      }
    }
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        alert("Please select an image to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "ml_default");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfugeey12/image/upload",
        formData
      );

      setImageUrl(response.data.secure_url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const Title = title;
    console.log(Title);
    const Description = description;
    console.log(Description);
    const ImageUrl = imageUrl;
    console.log(ImageUrl);
    const userId = "6b4813d4-2965-4220-ac50-06ebcc251751";

    try {
      const res = await fetch(process.env.BASE_URL + "/forum/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Title,
          Description,
          ImageUrl,
          userId,
        }),
      });
      if (res.status === 400) {
        setError("Error, try again");
      }
      if (res.status === 200) {
        setError("");
        toast.success("Post created successfully");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

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
      <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn"
          onClick={() =>
            (
              document.getElementById("createpost") as HTMLDialogElement
            ).showModal()
          }
        >
          Create Post
        </button>
        <dialog id="createpost" className="modal">
          <div className="modal-box">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Description"
                className="input input-bordered w-full"
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
              <button className="btn btn-primary">Create</button>
              {error && <div className="text-red-700">{error}</div>}
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
      <br />
      <div className="grid gap-10">
        {posts.map((post: any) => (
          <div className="mx-auto flex gap-5 rounded-xl " key={post.id}>
            <div className="">
              <img
                className="object-cover border min-w-96 max-w-96 min-h-96 max-h-96 rounded-lg"
                src={post.imageUrl}
                alt="img"
              />
              <br />
              <div className="flex gap-2">
                <button className="btn btn-primary">
                  <BiUpvote />
                </button>
                <button className="btn btn-primary">
                  <BiDownvote />
                </button>
              </div>
            </div>
            <div>
              <h2>{post.name}</h2>
              <p>{post.description}</p>
              <p>Created At: {new Date(post.createdAt).toLocaleDateString()}</p>
              <p>Total Comments: {post.totalComments}</p>
              <button className="btn btn-primary">View Comments</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
