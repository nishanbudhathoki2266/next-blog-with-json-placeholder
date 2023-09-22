import Link from "next/link";
import React from "react";

const PostCard = ({ post: { id, title, body } }) => {
  return (
    <Link href={`/post/${id}`}>
      <article className="px-2 py-6 bg-slate-200 cursor-pointer hover:scale-105 transition-transform ease-out duration-300">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p>{body}</p>
      </article>
    </Link>
  );
};

export default PostCard;
