"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
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
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const Title = e.target[0].value;
    console.log(Title);
    const Description = e.target[1].value;
    console.log(Description);
    const ImageUrl = imageUrl;
    console.log(ImageUrl);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Title,
          Description,
          ImageUrl,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://513a-27-34-49-238.ngrok-free.app/forum/list",
          {
            headers: {
              "ngrok-skip-browser-warning": "1",
            },
          }
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-10">
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
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Title" />
            </label>
            <br />
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Description"
            ></textarea>
            <br />
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={handleFileChange}
              />
              <button className="btn btn-primary" onClick={handleUpload}>
                Upload
              </button>
            </div>
            <br />
            <button className="btn btn-primary" onClick={handleSubmit}>
              Upload
            </button>
            {error && <div className="text-red-700">{error}</div>}
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
          <div className="bg-red-200 rounded-xl p-10" key={post.id}>
            <h2>{post.name}</h2>
            <p>{post.description}</p>
            <p>Created At: {new Date(post.createdAt).toLocaleDateString()}</p>
            <p>Total Comments: {post.totalComments}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
