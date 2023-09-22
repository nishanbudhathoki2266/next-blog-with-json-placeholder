import { getAllPosts, getPostById } from "@/utils/api";
import Link from "next/link";
import React from "react";

const PostDescriptionPage = ({ post }) => {
  return (
    <main className="flex flex-col items-center mt-4">
      <Link
        href="/"
        className="text-lg font-semibold underline underline-offset-1"
      >
        Go back
      </Link>
      <h3 className="text-2xl tracking-tight font-semibold uppercase">
        Posts description
      </h3>
      <section className="bg-slate-200 text-center mt-6">
        <h3 className="text-2xl font-semibold tracking-tight">{post.title}</h3>
        <p className="text-lg tracking-wider">{post.body}</p>
      </section>
    </main>
  );
};

export async function getStaticPaths() {
  const posts = await getAllPosts();

  const postIds = posts.map((post) => ({ params: { id: post.id + "" } }));

  return {
    paths: postIds,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const post = await getPostById(id);

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
}

export default PostDescriptionPage;
