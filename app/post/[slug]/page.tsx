import React from "react";
import PostDetails from "@/components/PostDetails";
import Comment from "@/components/Comment";

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="p-10">
      <PostDetails postId={params.slug} />
      <Comment postId={params.slug} />
    </div>
  );
};

export default page;
